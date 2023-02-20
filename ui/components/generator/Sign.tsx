import { JSX } from "preact";
import { useState } from "preact/hooks";
import Button from "../general/Button.tsx";
import { Heading3 } from "../general/Headings.tsx";

export function Sign({ configState }): JSX.Element {
  const [signature, setSignature] = useState("");

  const sign = () => {
    window.crypto.subtle.sign(
      configState.config,
      configState.privateKey,
      "Hello World"
    )
      .then((signature) => {
        console.log("signature", signature);
        setSignature(signature);
      });
  };

  return (
    <div>
      <Heading3>Sign</Heading3>
      <Button onClick={sign} class="bg-purple-400">Sign</Button>
      <textarea placeholder="signature">{signature}</textarea>
    </div>
  );
}
