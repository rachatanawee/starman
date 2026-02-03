# Quick Start: GitLab Setup

คู่มือฉบับย่อสำหรับตั้งค่า GitLab และ publish packages

## ขั้นตอนที่ 1: สร้าง GitLab Project (ทำใน GitLab UI)

1. ไปที่ GitLab instance ของคุณ
2. คลิก "New project" > "Create blank project"
3. ตั้งค่า:
   - Project name: `spark-framework`
   - Visibility: Private/Internal
4. คลิก "Create project"
5. **บันทึก Project ID** (ดูได้จาก Settings > General)

## ขั้นตอนที่ 2: สร้าง Access Token (ทำใน GitLab UI)

1. คลิกรูป profile > "Edit profile" > "Access Tokens"
2. สร้าง token ใหม่:
   - Name: `npm-publish`
   - Scopes: เลือก `api`, `read_api`, `read_repository`, `write_repository`
3. คลิก "Create personal access token"
4. **คัดลอก token ที่ได้** (จะแสดงเพียงครั้งเดียว)

## ขั้นตอนที่ 3: ตั้งค่า Local (ทำใน Terminal)

```bash
# 1. คัดลอกไฟล์ config
cp .env.gitlab .env.gitlab.local

# 2. แก้ไขไฟล์ .env.gitlab.local ด้วย editor
# ใส่ค่าจริง:
#   - GITLAB_URL=https://your-gitlab.com
#   - GITLAB_PROJECT_ID=12345
#   - GITLAB_TOKEN=glpat-xxxxxxxxxxxxxxxxxxxx
#   - GITLAB_GROUP=your-group

# 3. รัน setup script
./scripts/setup-gitlab.sh
```

## ขั้นตอนที่ 4: Push Code ไปยัง GitLab

```bash
# Commit และ push
git add .
git commit -m "Configure GitLab registry"
git push -u origin main
```

## ขั้นตอนที่ 5: Build และ Publish Packages

```bash
# รัน publish script
./scripts/publish-packages.sh
```

## ขั้นตอนที่ 6: ตรวจสอบ Packages

1. ไปที่ GitLab project
2. เลือก "Packages & Registries" > "Package Registry"
3. จะเห็น `@spark/create` และ `@spark/core`

## การใช้งาน

### ตั้งค่า Registry (ครั้งแรกเท่านั้น)

สำหรับ GitLab ที่มี SSL certificate issue:

```bash
# เพิ่มใน ~/.npmrc
cat >> ~/.npmrc << 'EOF'
@spark:registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/
strict-ssl=false
//your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/:_authToken=YOUR_TOKEN
EOF

# เพิ่มใน ~/.bunfig.toml
cat >> ~/.bunfig.toml << 'EOF'
[install.scopes]
"@spark" = { url = "https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/", token = "YOUR_TOKEN" }

[install.tls]
rejectUnauthorized = false
EOF
```

### สร้าง Project ใหม่

```bash
# สำหรับ GitLab ที่มี SSL issue ต้องใช้:
NODE_TLS_REJECT_UNAUTHORIZED=0 bunx @spark/create my-erp-system

# หรือสร้าง alias ใน ~/.zshrc หรือ ~/.bashrc:
alias spark-create='NODE_TLS_REJECT_UNAUTHORIZED=0 bunx @spark/create'

# แล้วใช้:
spark-create my-erp-system
```

เลือก modules ที่ต้องการ:
- ☐ Manufacturing - BOM, Production Order, MRP, Manufacturing, Production Planning
- ☐ Sales & Purchasing - Quotation, Sales Order, Invoice, Purchasing
- ☐ Inventory - Inventory Management & Warehouse
- ☐ Accounting - Accounting & WIP Costing
- ☐ Factory Operations - Factory Capacity, Job History, Worker Allowance

```bash
# เข้าไปใน project
cd my-erp-system

# รัน development server
bun run dev
```

## Troubleshooting

### ❌ SSL Certificate Error

```bash
# ใช้ environment variable
NODE_TLS_REJECT_UNAUTHORIZED=0 bunx @spark/create my-project

# หรือสร้าง alias
echo 'alias spark-create="NODE_TLS_REJECT_UNAUTHORIZED=0 bunx @spark/create"' >> ~/.zshrc
source ~/.zshrc
```

### ❌ Connection failed

```bash
# ตรวจสอบ token
curl --header "PRIVATE-TOKEN: YOUR_TOKEN" \
  "https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID"
```

### ❌ Publish failed

```bash
# ตรวจสอบ .npmrc
cat ~/.npmrc

# ตรวจสอบว่า GITLAB_TOKEN ถูก export
echo $GITLAB_TOKEN
```

### ❌ Package not found

```bash
# ตรวจสอบว่า publish สำเร็จ
npm view @spark/create --registry=https://your-gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/
```

## สรุป

1. ✅ สร้าง GitLab project และ access token
2. ✅ ตั้งค่า `.env.gitlab.local`
3. ✅ รัน `./scripts/setup-gitlab.sh`
4. ✅ Push code: `git push -u origin main`
5. ✅ Publish: `./scripts/publish-packages.sh`
6. ✅ ใช้งาน: `NODE_TLS_REJECT_UNAUTHORIZED=0 bunx @spark/create my-project`

---

**หมายเหตุ:** ดูรายละเอียดเพิ่มเติมใน `GITLAB_REGISTRY_SETUP.md`
