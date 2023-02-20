import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { AlgorithmComponentProps } from "../types/AlgorithmComponentProps.ts";
import Checkbox from "../ui/components/general/Checkbox.tsx";

import { Label } from "../ui/components/general/Label.tsx";
import { Heading2, Heading3 } from "../ui/components/general/Headings.tsx";
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

  console.log(defaultConfigUsage)
  const deafultUsage = [...defaultConfigUsage[configState.config.name]];

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
      <Heading2>Config</Heading2>
      {configComponent}
      <Heading3>Usage</Heading3>
      <fieldset>
        {deafultUsage.map((usage) => {
          console.log(usage)
          return (
            <Checkbox
              name="usage"
              id={usage}
              value={usage}
              checked={configState.usage.includes(usage)}
              onChange={usageChange}
            >{usage}</Checkbox>
          );
        })}
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
        <Heading3>Key output</Heading3>
        <textarea placeholder="public key">{JSON.stringify(keyState)}</textarea>
      </div>
    );
  } else if ("publicKey" in keyState && "privateKey" in keyState) {
    return (
      <div>
        <Heading3>Public Key / Private Key output</Heading3>
        <textarea placeholder="public key">
          {JSON.stringify(keyState.publicKey)}
        </textarea>
        <textarea placeholder="private key">
          {JSON.stringify(keyState.privateKey)}
        </textarea>
      </div>
    );
  } else {
    return <div>Not a key</div>;
  }
}

export default function Algorithm(props: AlgorithmComponentProps) {
  const algorithm = props.algorithm || "HMAC";
  const [configState, setConfigState] = useState({
    config: {...defaultConfig[algorithm]},
    usage: [...defaultConfigUsage[algorithm]],
  });

  const onChange = (event: Event) => {
    const newAlgorithm = event?.target?.value;
    setConfigState(
      {
        config: defaultConfig[newAlgorithm],
        usage: defaultConfigUsage[newAlgorithm],
      },
    );
  };

  return (
    <>
      <Label
        for="algorithm"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        Algorithm
      </Label>
      <select
        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        name="algorithm"
        value={configState.algorithm}
        onInput={onChange}
      >
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
    </>
  );
}
