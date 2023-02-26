import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import AlgorithmUsage from "./AlgorithmUsage.tsx";
import { Heading3 } from "./general/Headings.tsx";
import { CryptoKey } from "./key/index.ts";

export default function AlgorithmOutput({ configState, setConfigState }): JSX.Element {
  const [keyState, setKeyState] = useState();
  const [exportedKeyState, setExportedKeyState] = useState("");
 
  useEffect(() => {
    window.crypto.subtle.generateKey(
      configState.config,
      true,
      configState.usage,
    )
      .then((key) => {
        console.log("key", key);
        setKeyState(key);
        return key;
      })
  }, [configState]);

  if (keyState != null && "publicKey" in keyState && "privateKey" in keyState) {
    return (
      <div>
        <Heading3>Public Key</Heading3>
        {keyState.publicKey.extractable
          ? (
            <div>
              <CryptoKey keyState={keyState.publicKey} exportedKeyState={exportedKeyState} setExportedKeyState={setExportedKeyState} />
            </div>
          )
          : <div>PublicKey Not Extractable</div>}
        <Heading3>Private Key</Heading3>
        {keyState.privateKey.extractable
          ? (
            <div>
              <CryptoKey keyState={keyState.privateKey} exportedKeyState={exportedKeyState} setExportedKeyState={setExportedKeyState} />
            </div>
          )
          : <div>PrivateKey Not Extractable</div>}
      </div>
    );
  } else if (keyState != null) {
    return (
      <div>
        <CryptoKey keyState={keyState} exportedKeyState={exportedKeyState} setExportedKeyState={setExportedKeyState} />
        <AlgorithmUsage configState={configState} setConfigState={setConfigState} keyState={keyState} exportedKeyState={exportedKeyState}/>
      </div>
    );
  } else {
    return <div>Not a key</div>;
  }
}
