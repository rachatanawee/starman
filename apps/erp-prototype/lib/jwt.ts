import jwt from 'jsonwebtoken'

export interface JwtPayload {
  sub: string
  email: string
  username: string
  ldap_dn: string
  iat: number
  exp: number
}

export function generateJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const jwtPayload: JwtPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  }

  return jwt.sign(jwtPayload, process.env.JWT_SECRET!)
}
