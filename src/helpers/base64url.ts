export function base64UrlEncode(toEncode: string): string {
  const base64Encoded = window.btoa(toEncode);

  const base64Url = base64ToBase64Url(base64Encoded);

  return base64Url;
}

export function base64UrlDecode(toDecode: string): string {
  const base64 = base64UrlToBase64(toDecode);

  const decodedString = window.atob(base64);

  return decodedString;
}

export function base64ToBase64Url(toConvert: string): string {
  return toConvert
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function base64UrlToBase64(toConvert: string): string {
  let base64String = toConvert
    .replace(/\-/g, '+')
    .replace(/\_/g, '/');

  const stringLengthRemainderDividedBy4 = base64String.length % 4;

  if(stringLengthRemainderDividedBy4 === 0) {
    return base64String;
  }

  const additionalEqualSigns = '='.repeat(4 - stringLengthRemainderDividedBy4);

  return base64String + additionalEqualSigns;
}
