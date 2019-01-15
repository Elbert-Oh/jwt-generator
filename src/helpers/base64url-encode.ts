export function base64UrlEncode(toEncode: string): string {
  const base64Encoded = window.btoa(toEncode);

  const base64Url = base64ToBase64Url(base64Encoded);

  return base64Url;
}

export function base64ToBase64Url(toConvert: string): string {
  return toConvert
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
