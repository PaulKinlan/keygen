import { JSX } from "preact";
import { useEffect } from "preact/hooks";
import { Heading4 } from "../general/Headings.tsx";
import { exportTypes } from "../../defaults.ts";
import { exportKey } from "../../../utils/exportKey.ts";

export function CryptoKey({ keyState, exportedKeyState, setExportedKeyState }): JSX.Element {
  let exportKeyType = "";
  useEffect(() => {
    //https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
    if (
      keyState.type == "public" &&
      "public" in exportTypes[keyState.algorithm.name]
    ) {
      exportKeyType = exportTypes[keyState.algorithm.name].public;
    } else if (
      keyState.type == "private" &&
      "private" in exportTypes[keyState.algorithm.name]
    ) {
      exportKeyType = exportTypes[keyState.algorithm.name].private;
    } else {
      // keyState.type == 'secret'
      exportKeyType = exportTypes[keyState.algorithm.name][0];
    }

    crypto.subtle.exportKey(exportKeyType, keyState)
      .then((exportedKey) => {
        setExportedKeyState(exportedKey);
        return exportedKey;
      }).catch((err) => {
        console.error(err);
        setExportedKeyState({});
      });
  }, [keyState]);

  return (
    <div>
      <Heading4>CryptoKey</Heading4>
      <pre class="overflow-x-auto max-w-md">{(exportedKeyState) ? exportKey(new Uint8Array(exportedKeyState), keyState.type) : ""}</pre>
    </div>
  );
}
