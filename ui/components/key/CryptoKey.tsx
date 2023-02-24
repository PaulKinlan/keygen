import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { encode } from "https://deno.land/std@0.177.0/encoding/hex.ts";

import { Heading4 } from "../general/Headings.tsx";

import {
  exportTypes
} from "../../defaults.ts";

function encodeToString(buffer: Uint8Array): string {
  return new TextDecoder().decode(buffer);
}

export function CryptoKey({keyState}): JSX.Element {
  const [exportedKeyState, setExportedKeyState] = useState("");
  let exportKeyType = "";
  useEffect(() => {
    //https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
    if (keyState.type == 'public' && 'public' in exportTypes[keyState.algorithm.name]) {
      exportKeyType = exportTypes[keyState.algorithm.name].public;
    }
    else if (keyState.type == 'private' && 'private' in exportTypes[keyState.algorithm.name]) {
      exportKeyType = exportTypes[keyState.algorithm.name].private;
    }
    else {
      // keyState.type == 'secret'
      exportKeyType = exportTypes[keyState.algorithm.name][0];
    }
    crypto.subtle.exportKey(exportKeyType, keyState)
      .then((exportedKey) => {
        setExportedKeyState(exportedKey);
        console.log(exportedKey)
        return exportedKey;
      }).catch((err) => {
        console.error(err);
        setExportedKeyState({});
      });
  }, [keyState]);

  return (
    <div>
      <Heading4>CryptoKey</Heading4>
      <pre class="overflow-x-auto max-w-md">{(exportedKeyState) ? encodeToString(encode(new Uint8Array(exportedKeyState))) : ""}</pre>
    </div>
  );
}
