import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import Button from "../general/Button.tsx";
import { Heading3 } from "../general/Headings.tsx";
import { exportKey, encode, encodeToString } from "../../../utils/exportKey.ts";

export function Sign({ configState, keyState, exportedKeyState }): JSX.Element {
  const [signature, setSignature] = useState("");
  const messageElement = useRef(null);

  const exportedKeyValue = exportKey(
    new Uint8Array(exportedKeyState),
    "secret",
  );

  const signMessage = () => {
    const messageValue = messageElement.current.value;
    const enocodedMessage = new TextEncoder().encode(messageValue);

    window.crypto.subtle.sign(
      configState.config,
      keyState,
      enocodedMessage,
    )
      .then((signature) => {
        setSignature(encodeToString(encode(new Uint8Array(signature))));
      });
  };

  return (
    <div class="flex flex-col">
      <Heading3>Sign</Heading3>
      <p>Signs a message with a HMAC secret key</p>
      <input
        type="text"
        id="signature"
        placeholder="Secret"
        value={exportedKeyValue}
      />
      <label for="message">Message to Sign:</label>
      <textarea name="message" ref={messageElement} placeholder="Message">
      </textarea>
      <Button onClick={signMessage} class="bg-purple-400">Sign</Button>
      <textarea placeholder="Output">{signature}</textarea>
    </div>
  );
}
