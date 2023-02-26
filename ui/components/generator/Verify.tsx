import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import Button from "../general/Button.tsx";
import { Heading3 } from "../general/Headings.tsx";
import {
  decode,
  encode,
  encodeToString,
  exportKey,
} from "../../../utils/exportKey.ts";

export function Verify(
  { configState, keyState, exportedKeyState },
): JSX.Element {
  const [verified, setVerified] = useState();
  const messageElement = useRef(null);
  const signatureElement = useRef(null);

  const exportedKeyValue = exportKey(
    new Uint8Array(exportedKeyState),
    "secret",
  );

  const verifyMessage = () => {
    const messageValue = messageElement.current.value;
    const signatureValue = signatureElement.current.value;
    const encodedMessage = new TextEncoder().encode(messageValue);
    const encodedSignature = decode(new TextEncoder().encode(signatureValue));

    window.crypto.subtle.verify(
      configState.config,
      keyState,
      encodedSignature,
      encodedMessage,
    )
      .then((verified) => {
        setVerified(verified);
      });
  };

  return (
    <div class="flex flex-col">
      <Heading3>Verify</Heading3>
      <p>Verify a message with the HMAC secret key.</p>
      <input
        type="text"
        placeholder="Secret"
        value={exportedKeyValue}
      />
      <label for="signature">Signature: </label>
      <textarea name="signature" placeholder="Signature" ref={signatureElement}>
      </textarea>
      <label for="message">Message to verify:</label>
      <textarea
        name="message"
        ref={messageElement}
        placeholder="Encoded Message"
      >
      </textarea>
      <Button onClick={verifyMessage} class="bg-purple-400">Sign</Button>
      {(verified)
        ? <p>Signature valid</p>
        : (verified == undefined)
        ? <p></p>
        : <p>Signiture not valid</p>}
    </div>
  );
}
