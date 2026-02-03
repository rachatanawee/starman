# GitLab Package Registry Setup

คู่มือการตั้งค่าและเผยแพร่ Spark packages ขึ้น GitLab Package Registry

## ขั้นตอนที่ 1: ตั้งค่า GitLab Project

### 1.1 สร้าง GitLab Project
```bash
# ใน GitLab UI
1. ไปที่ GitLab instance ของคุณ
2. คลิก "New project"
3. ตั้งชื่อ project เช่น "spark-framework"
4. เลือก visibility level (Private/Internal/Public)
5. คลิก "Create project"
```

### 1.2 เพิ่ม Remote Repository
```bash
# ใน local repository
git remote add origin https://your-gitlab.com/your-group/spark-framework.git
git branch -M main
git push -u origin main
```

## ขั้นตอนที่ 2: สร้าง Access Token

### 2.1 สร้าง Personal Access Token
```bash
# ใน GitLab UI
1. ไปที่ Settings > Access Tokens
2. ตั้งชื่อ token เช่น "npm-publish"
3. เลือก scopes:
   - api
   - read_api
   - read_repository
   - write_repository
4. คลิก "Create personal access token"
5. คัดลอก token ที่ได้ (จะแสดงเพียงครั้งเดียว)
```

### 2.2 บันทึก Token
```bash
# เก็บ token ไว้ใน environment variable
export GITLAB_TOKEN="your-token-here"

# หรือเก็บใน .npmrc (ไม่แนะนำให้ commit)
echo "//your-gitlab.com/api/v4/projects/:_authToken=${GITLAB_TOKEN}" >> ~/.npmrc
```

## ขั้นตอนที่ 3: ตั้งค่า Package Configuration

### 3.1 อัปเดต package.json

#### packages/spark-create/package.json
```json
{
  "name": "@spark/create",
  "version": "0.1.0",
  "description": "Create a new Spark project from template",
  "publishConfig": {
    "registry": "https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/"
  },
  "repository": {
    "type": "git",
    "url": "https://your-gitlab.com/your-group/spark-framework.git"
  }
}
```

#### packages/spark-core/package.json
```json
{
  "name": "@spark/core",
  "version": "0.1.0",
  "description": "Spark core components and utilities",
  "publishConfig": {
    "registry": "https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/"
  },
  "repository": {
    "type": "git",
    "url": "https://your-gitlab.com/your-group/spark-framework.git"
  }
}
```

### 3.2 หา Project ID
```bash
# วิธีที่ 1: ดูใน GitLab UI
# ไปที่ Project > Settings > General
# จะเห็น "Project ID" ด้านบน

# วิธีที่ 2: ใช้ API
curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  "https://your-gitlab.com/api/v4/projects?search=spark-framework"
```

## ขั้นตอนที่ 4: ตั้งค่า .npmrc

### 4.1 สร้าง .npmrc ใน project root
```bash
# .npmrc
@spark:registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/
//your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/:_authToken=${GITLAB_TOKEN}
```

### 4.2 เพิ่ม .npmrc ใน .gitignore
```bash
echo ".npmrc" >> .gitignore
```

## ขั้นตอนที่ 5: Build และ Publish

### 5.1 Build Packages
```bash
# Build spark-create
cd packages/spark-create
bun run build

# Build spark-core
cd ../spark-core
bun run build
```

### 5.2 Publish ไปยัง GitLab Registry

#### วิธีที่ 1: ใช้ npm publish
```bash
# Publish spark-create
cd packages/spark-create
npm publish

# Publish spark-core
cd ../spark-core
npm publish
```

#### วิธีที่ 2: ใช้ curl (manual)
```bash
# สำหรับ spark-create
cd packages/spark-create
npm pack
curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --upload-file spark-create-0.1.0.tgz \
  "https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/"
```

### 5.3 ตรวจสอบการ Publish
```bash
# ดูใน GitLab UI
# ไปที่ Project > Packages & Registries > Package Registry
# จะเห็น @spark/create และ @spark/core
```

## ขั้นตอนที่ 6: ใช้งาน Published Packages

### 6.1 ตั้งค่า .npmrc ใน project ใหม่
```bash
# ใน project ที่ต้องการใช้ Spark
echo "@spark:registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/" > .npmrc
```

### 6.2 ติดตั้ง Package
```bash
# ติดตั้ง spark-create
bunx @spark/create my-new-project

# หรือติดตั้ง spark-core
bun add @spark/core
```

## ขั้นตอนที่ 7: Automation ด้วย GitLab CI/CD

### 7.1 สร้าง .gitlab-ci.yml
```yaml
# .gitlab-ci.yml
stages:
  - build
  - publish

variables:
  NPM_TOKEN: $CI_JOB_TOKEN

build:
  stage: build
  image: oven/bun:latest
  script:
    - bun install
    - cd packages/spark-create && bun run build
    - cd ../spark-core && bun run build
  artifacts:
    paths:
      - packages/*/dist
    expire_in: 1 hour

publish:
  stage: publish
  image: node:20
  only:
    - tags
  script:
    - echo "@spark:registry=${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/npm/" > .npmrc
    - echo "${CI_API_V4_URL#https:}/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}" >> .npmrc
    - cd packages/spark-create && npm publish
    - cd ../spark-core && npm publish
```

### 7.2 สร้าง Tag เพื่อ Trigger Publish
```bash
# สร้าง tag
git tag v0.1.0
git push origin v0.1.0

# GitLab CI/CD จะ build และ publish อัตโนมัติ
```

## ขั้นตอนที่ 8: Version Management

### 8.1 อัปเดต Version
```bash
# อัปเดต version ใน package.json
cd packages/spark-create
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.1 -> 0.2.0
npm version major  # 0.2.0 -> 1.0.0
```

### 8.2 Publish Version ใหม่
```bash
# Build และ publish
bun run build
npm publish

# สร้าง git tag
git add .
git commit -m "Release v0.2.0"
git tag v0.2.0
git push origin main --tags
```

## ตัวอย่างการใช้งาน

### สร้าง Project ใหม่
```bash
# ตั้งค่า registry
echo "@spark:registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/" > ~/.npmrc

# สร้าง project
bunx @spark/create my-erp-system --port 3200

# เข้าไปใน project
cd my-erp-system

# รัน development server
bun run dev
```

### ติดตั้ง spark-core
```bash
# ใน project ที่มีอยู่แล้ว
bun add @spark/core

# ใช้งาน
import { ProjectLayout, PageTitle } from '@spark/core'
```

## Troubleshooting

### ปัญหา: 401 Unauthorized
```bash
# ตรวจสอบ token
echo $GITLAB_TOKEN

# ตรวจสอบ .npmrc
cat ~/.npmrc

# ลอง login ใหม่
npm login --registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/
```

### ปัญหา: 404 Not Found
```bash
# ตรวจสอบ Project ID
curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  "https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID"

# ตรวจสอบ URL ใน publishConfig
cat packages/spark-create/package.json | grep registry
```

### ปัญหา: Package ไม่แสดงใน Registry
```bash
# ตรวจสอบว่า publish สำเร็จ
npm view @spark/create --registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/

# ดู logs ใน GitLab CI/CD
# ไปที่ CI/CD > Pipelines > เลือก pipeline > ดู logs
```

## Best Practices

### 1. Version Control
- ใช้ semantic versioning (MAJOR.MINOR.PATCH)
- สร้าง git tag สำหรับทุก release
- เขียน CHANGELOG.md

### 2. Security
- ไม่ commit .npmrc ที่มี token
- ใช้ CI/CD variables สำหรับ sensitive data
- ตั้งค่า token expiration

### 3. Documentation
- อัปเดต README.md ทุกครั้งที่มีการเปลี่ยนแปลง
- เขียน migration guide สำหรับ breaking changes
- ให้ตัวอย่างการใช้งาน

### 4. Testing
- ทดสอบ package ก่อน publish
- ใช้ `npm pack` เพื่อดู files ที่จะถูก publish
- ทดสอบใน project จริงก่อน release

## สรุป

1. ✅ สร้าง GitLab project และ access token
2. ✅ ตั้งค่า package.json และ .npmrc
3. ✅ Build packages
4. ✅ Publish ไปยัง GitLab Registry
5. ✅ ตั้งค่า CI/CD สำหรับ automation
6. ✅ ใช้งาน packages ใน project ใหม่

ตอนนี้คุณสามารถใช้:
```bash
bunx @spark/create my-project
```
เพื่อสร้าง project ใหม่จาก spark-base template ได้แล้ว!
