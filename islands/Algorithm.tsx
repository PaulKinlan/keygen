import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { AlgorithmComponentProps } from "../types/AlgorithmComponentProps.ts";
import Checkbox from "../ui/components/general/Checkbox.tsx";
import {
  configControl,
  defaultConfig,
  defaultConfigUsage,
  usageControls,
} from "../ui/defaults.ts";

function AlgortihmConfig(
  { configState, setConfigState },
): JSX.Element {
  const configComponent = configControl[configState.config.name]({
    name: configState.config.name,
    state: configState,
    setState: setConfigState,
  });

  const usageChange = (event) => {
    const usage = configState.usage;
    if (event.target.checked) {
      usage.push(event.target.value);
    } else {
      usage.splice(usage.indexOf(event.target.value), 1);
    }

    setConfigState({
      ...configState,
    });
  };

  return (
    <div>
      <h1>Config</h1>
      {configComponent}
      <fieldset>
        <legend>Usage</legend>
        <Checkbox
          name="usage"
          id="sign"
          value="sign"
          checked={configState.usage.includes("sign")}
          onChange={usageChange}
        >
          Sign
        </Checkbox>
        <Checkbox
          name="usage"
          id="verify"
          value="verify"
          checked={configState.usage.includes("verify")}
        >
          Verify
        </Checkbox>
        <Checkbox
          name="usage"
          id="encrypt"
          value="encrypt"
          checked={configState.usage.includes("encrypt")}
        >
          Encrypt
        </Checkbox>
        <Checkbox
          type="checkbox"
          name="usage"
          id="decrypt"
          value="decrypt"
          checked={configState.usage.includes("decrypt")}
        >
          Decrypt
        </Checkbox>
        <Checkbox
          name="usage"
          id="wrapKey"
          value="wrapKey"
          checked={configState.usage.includes("wrapKey")}
        >
          Wrap Key
        </Checkbox>
        <Checkbox
          name="usage"
          id="unwrapKey"
          value="unwrapKey"
          checked={configState.usage.includes("unwrapKey")}
        >
          Unwrap Key
        </Checkbox>
        <Checkbox
          name="usage"
          id="deriveKey"
          value="deriveKey"
          checked={configState.usage.includes("deriveKey")}
        >
          Derive Key
        </Checkbox>
        <Checkbox
          name="usage"
          id="deriveBits"
          value="deriveBits"
          checked={configState.usage.includes("deriveBits")}
        >
          Derive Bits
        </Checkbox>
      </fieldset>
      {configState.usage.map((usage) => {
        return usageControls[usage](configState);
      })}
    </div>
  );
}

function AlgorithmOutput({ configState }): JSX.Element {
  const [keyState, setKeyState] = useState(configState.usage);

  useEffect(() => {
    window.crypto.subtle.generateKey(
      configState.config,
      true,
      configState.usage, // options
    )
      .then((key) => {
        console.log("key", key);
        setKeyState(key);
      });
  }, [configState]);

  if (keyState instanceof CryptoKey) {
    return (
      <div>
        <h1>Key output</h1>
        <textarea placeholder="public key">{JSON.stringify(keyState)}</textarea>
      </div>
    );
  } else if ("publicKey" in keyState && "privateKey" in keyState) {
    return (
      <div>
        <h1>Public Key / Private Key output</h1>
        <textarea placeholder="public key">{keyState.publicKey}</textarea>
        <textarea placeholder="private key">{keyState.privateKey}</textarea>
      </div>
    );
  } else {
    return <div>Not a key</div>;
  }
}

export default function Algorithm(props: AlgorithmComponentProps) {
  const [algorithm, setAlgorithm] = useState(props.algorithm || "HMAC");
  const [configState, setConfigState] = useState({
    config: defaultConfig[algorithm],
    usage: defaultConfigUsage[algorithm],
  });

  const onChange = (event: Event) => {
    const newAlgorithm = event?.target?.value;
    setAlgorithm(newAlgorithm);
    setConfigState(
      {
        config: defaultConfig[newAlgorithm],
        usage: defaultConfigUsage[newAlgorithm],
      },
    );
  };

  return (
    <fieldset class="max-w-md">
      <legend>Algorithm</legend>
      <select value={configState.algorithm} onInput={onChange}>
        <option value="HMAC">HMAC</option>
        <option value="ECDSA">ECDSA</option>
        <option value="ECDH">ECDH</option>
        <option value="AES-CBC">AES-CBC</option>
        <option value="AES-CTR">AES-CTR</option>
        <option value="AES-GCM">AES-GCM</option>
        <option value="AES-KW">AES-KW</option>
        <option value="RSA-OAEP">RSA-OAEP</option>
        <option value="RSA-PSS">RSA-PSS</option>
        <option value="RSASSA-PKCS1-v1_5">RSASSA-PKCS1-v1_5</option>
      </select>
      <AlgortihmConfig
        configState={configState}
        setConfigState={setConfigState}
      />
      <AlgorithmOutput configState={configState} />
    </fieldset>
  );
}
