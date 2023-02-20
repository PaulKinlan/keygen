import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { encode } from "https://deno.land/std@0.177.0/encoding/hex.ts";

import { Heading2 } from "../general/Headings.tsx";

function encodeToString(buffer: Uint8Array): string {
  return new TextDecoder().decode(buffer);
}

export function CryptoKey(props): JSX.Element {
  console.log(props);
  const [exportedKeyState, setExportedKeyState] = useState("");
  useEffect(() => {
    //https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
    crypto.subtle.exportKey("raw", props.keyState)
      .then((exportedKey) => {
        setExportedKeyState(exportedKey);
        return exportedKey;
      });
  }, [props.keyState]);

  return (
    <div>
      <Heading2>CryptoKey</Heading2>
      <pre>{(exportedKeyState) ? encodeToString(encode(new Uint8Array(exportedKeyState))) : ""}</pre>
    </div>
  );
}
