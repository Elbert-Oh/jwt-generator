export type JwtHeader = {
  alg: string,
  typ: string
}

export type JwtClaims = {
  iss?: string,
  aud?: string,
  exp?: string
}
