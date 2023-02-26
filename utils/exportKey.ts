import { encode, decode } from "https://deno.land/std@0.177.0/encoding/hex.ts";

export function encodeToString(buffer: Uint8Array): string {
  return new TextDecoder().decode(buffer);
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function convertBinaryToPem(binaryData: Uint8Array, label: string): string {
  let base64Cert = btoa(ab2str(binaryData));

  let newLabel = (label == "public") ? "PUBLIC KEY" : "PRIVATE KEY";
  let pemCert = "-----BEGIN " + newLabel + "-----\r\n";
  let nextIndex = 0;
  let lineLength;
  while (nextIndex < base64Cert.length) {
    if (nextIndex + 64 <= base64Cert.length) {
      pemCert += base64Cert.substr(nextIndex, 64) + "\r\n";
    } else {
      pemCert += base64Cert.substr(nextIndex) + "\r\n";
    }
    nextIndex += 64;
  }
  pemCert += "-----END " + newLabel + "-----\r\n";
  return pemCert;
}

export function exportKey(binaryData: Uint8Array, label: string): string {
  if (label == "secret") {
    return encodeToString(encode(binaryData));
  }

  return convertBinaryToPem(binaryData, label);
}

export { encode, decode };
