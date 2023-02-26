import { JSX } from "preact";
import { useState } from "preact/hooks";
import Button from "../general/Button.tsx";
import { Heading3 } from "../general/Headings.tsx";
import { exportKey } from "../../../utils/exportKey.ts";

export function Sign({ configState, keyState, exportedKeyState }): JSX.Element {
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState("");

  const exportedKeyValue = exportKey(new Uint8Array(exportedKeyState), "secret");

  console.log(exportedKeyState)
  console.log()

  const sign = () => {
    window.crypto.subtle.sign(
      configState.config,
      keyState.secret,
      message
    )
      .then((signature) => {
        setSignature(signature);
      });
  };

  return (
    <div class="flex flex-col" >
      <Heading3>Sign</Heading3>
      <p>Signs a message with the secret key.</p>
      <input type="text" id="signature" placeholder="Secret" value={exportedKeyValue} />
      <textarea placeholder="Message to Sign">{message}</textarea>
      <Button onClick={sign} class="bg-purple-400">Sign</Button>
    </div>
  );
}
