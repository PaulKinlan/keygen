import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Heading3 } from "./general/Headings.tsx";
import { CryptoKey } from "./key/index.ts";

export default function AlgorithmOutput({ configState }): JSX.Element {
  const [keyState, setKeyState] = useState();

  console.log(configState.config.name);

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
              <CryptoKey keyState={keyState.publicKey} />
            </div>
          )
          : <div>PublicKey Not Extractable</div>}
        <Heading3>Private Key</Heading3>
        {keyState.privateKey.extractable
          ? (
            <div>
              <CryptoKey keyState={keyState.privateKey} />
            </div>
          )
          : <div>PrivateKey Not Extractable</div>}
      </div>
    );
  } else if (keyState != null) {
    console.log(keyState);
    return (
      <div>
        <CryptoKey keyState={keyState} />
      </div>
    );
  } else {
    return <div>Not a key</div>;
  }
}
