import { JSX } from "preact";
import { useState } from "preact/hooks";


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
      <h1>Sign</h1>
      <button onClick={sign} class="bg-purple-400">Sign</button>
      <textarea placeholder="signature">{signature}</textarea>
    </div>
  );
}
