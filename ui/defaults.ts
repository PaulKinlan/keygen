import { AlgorithmConfig } from "../types/AlgorithmConfig.ts";
import {
  Decrypt,
  DeriveBits,
  DeriveKey,
  Encrypt,
  Sign,
  UnwrapKey,
  Verify,
  WrapKey
} from "../ui/components/generator/index.tsx";
import {
  AESKeyGenParams,
  EcKeyGenParams,
  HmacKeyGenParams,
  RsaHashedKeyGenParams
} from "../ui/params/index.tsx";

/*
https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey

For RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP: pass an RsaHashedKeyGenParams object.
For ECDSA or ECDH: pass an EcKeyGenParams object.
For HMAC: pass an HmacKeyGenParams object.
For AES-CTR, AES-CBC, AES-GCM, or AES-KW: pass an AesKeyGenParams object.
*/
export const configControl: AlgorithmConfig = {
  "HMAC": HmacKeyGenParams,
  "ECDSA": EcKeyGenParams,
  "ECDH": EcKeyGenParams,
  "AES-CBC": AESKeyGenParams,
  "AES-CTR": AESKeyGenParams,
  "AES-GCM": AESKeyGenParams,
  "AES-KW": AESKeyGenParams,
  "RSASSA-PKCS1-v1_5": RsaHashedKeyGenParams,
  "RSA-PSS": RsaHashedKeyGenParams,
  "RSA-OAEP": RsaHashedKeyGenParams,
};
export const defaultConfig = {
  "HMAC": { name: "HMAC", hash: "SHA-256", length: 256 },
  "ECDSA": { name: "ECDSA", namedCurve: "P-256" },
  "ECDH": { name: "ECDH", namedCurve: "P-256" },
  "AES-CBC": { name: "AES-CBC", length: 256 },
  "AES-CTR": { name: "AES-CTR", length: 256 },
  "AES-GCM": { name: "AES-GCM", length: 256 },
  "AES-KW": { name: "AES-KW", length: 256 },
  "RSASSA-PKCS1-v1_5": {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
  "RSA-PSS": {
    name: "RSA-PSS",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
  "RSA-OAEP": {
    name: "RSA-OAEP",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
};
// Source: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#:~:text=The%20table%20below%20summarizes%20which%20algorithms%20are%20suitable%20for%20which%20cryptographic%20operations%3A
export const defaultConfigUsage = {
  "HMAC": ["sign", "verify"],
  "ECDSA": ["sign", "verify"],
  "ECDH": ["deriveBits", "deriveKey"],
  "AES-CBC": ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
  "AES-CTR": ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
  "AES-GCM": ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
  "AES-KW": ["wrapKey", "unwrapKey"],
  "RSASSA-PKCS1-v1_5": ["sign", "verify"],
  "RSA-PSS": ["sign", "verify"],
  "RSA-OAEP": ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
};
export const exportTypes = {
  "HMAC": ["raw"],
  "ECDSA": ["raw", "pkcs8", "spki"],
  "ECDH": ["raw", "pkcs8", "spki"],
  "AES-CBC": ["raw"],
  "AES-CTR": ["raw"],
  "AES-GCM": ["raw"],
  "AES-KW": ["raw"],
  "RSASSA-PKCS1-v1_5": { public: ["spki"], private: ["pkcs8"] },
  "RSA-PSS": { public: ["spki"], private: ["pkcs8"] },
  "RSA-OAEP": { public: ["spki"], private: ["pkcs8"] },
};
export const usageControls = {
  "sign": Sign,
  "verify": Verify,
  "deriveBits": DeriveBits,
  "deriveKey": DeriveKey,
  "encrypt": Encrypt,
  "decrypt": Decrypt,
  "wrapKey": WrapKey,
  "unwrapKey": UnwrapKey,
};
