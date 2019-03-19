import createHmacSha256 from 'crypto-js/hmac-sha256';
import toBase64 from 'crypto-js/enc-base64';
import { base64UrlEncode, base64ToBase64Url } from './base64url';
import { JwtHeader } from './jwt-types';

export default function(algorithm: string, claims: object, secret: string): string {
  const header: JwtHeader = {
    alg: algorithm,
    typ: 'JWT'
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaims = base64UrlEncode(JSON.stringify(claims));

  const token = `${encodedHeader}.${encodedClaims}`;

  const signature = createHmacSha256(token, secret);
  const encodedSignature = base64ToBase64Url(toBase64.stringify(signature));

  const signedToken = `${token}.${encodedSignature}`;

  return signedToken;
}