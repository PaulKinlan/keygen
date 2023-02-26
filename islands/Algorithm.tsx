import { useState } from "preact/hooks";

import { AlgorithmComponentProps } from "../types/AlgorithmComponentProps.ts";

import { Label } from "../ui/components/general/Label.tsx";
import {
  defaultConfig,
  defaultConfigUsage,
} from "../ui/defaults.ts";

import AlgorithmOutput from "../ui/components/AlgorithmOutput.tsx";
import AlgortihmConfig from "../ui/components/AlgortihmConfig.tsx";
import AlgorithmUsage from "../ui/components/AlgorithmUsage.tsx";

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
