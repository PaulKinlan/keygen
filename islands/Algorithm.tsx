import { JSX } from "preact";
import { StateUpdater, useState } from "preact/hooks";

import { IS_BROWSER } from "$fresh/runtime.ts";

/*
https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey

For RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP: pass an RsaHashedKeyGenParams object.
For ECDSA or ECDH: pass an EcKeyGenParams object.
For HMAC: pass an HmacKeyGenParams object.
For AES-CTR, AES-CBC, AES-GCM, or AES-KW: pass an AesKeyGenParams object.
*/

type AlgorithmConfigComponentProps = {
  state: any;
  setState: StateUpdater<{}>;
};

function HmacKeyGenParams({state, setState}: AlgorithmConfigComponentProps): JSX.Element {

  const hashChange = (event: Event) => {
    setState({...state, hash: event.target?.value});
  };
  const lengthChange = (event: Event) => {
    setState({...state, length: event.target?.value});
  };

  return (
    <fieldset>
      <legend>HMAC configuration</legend>
      <label for="name">
        <input name="name" type="text" value="HMAC" required />
      </label>
      <label for="hash">
        <select name="hash" onInput={hashChange}>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </label>
      <label for="length">
        <input name="length" type="number" onInput={lengthChange} />
      </label>
    </fieldset>
  );
}

function EcKeyGenParams(): JSX.Element {
  return <div>EcKeyGenParams</div>;
}

type AlgorithmComponentProps = {
  algorithm: string;
};

type AlgorithmConfig = {
  [k: string]: (props: AlgorithmConfigComponentProps) => JSX.Element;
};

function Debug(obj) {
  console.log("debug", obj, Object.entries(obj).map(([k,v]) => <div>a</div>))
  return <div>
    {Object.entries(obj.config).map(([k,v]) => <div>a</div>)}
  </div>
}

function AlgortihmConfig(props: AlgorithmComponentProps): JSX.Element {
  // Manage the state here.
  const [configState, setConfigState] = useState({});

  console.log("render config", configState)

  const component = config[props.algorithm]({
    state: configState,
    setState: setConfigState,
  });

  return (
    <div>
      <h1>Config</h1>
      {component}
      <div><Debug config={configState} /></div>
    </div>
  );
}

const config: AlgorithmConfig = {
  "HMAC": HmacKeyGenParams,
  "ECDSA": EcKeyGenParams,
  "ECDH": EcKeyGenParams,
};

export default function Algorithm(props: AlgorithmComponentProps) {
  const [algorithm, setAlgorithm] = useState(props.algorithm || "HMAC");

  const onChange = (event: Event) => {
    setAlgorithm(event?.target?.value);
  };

  return (
    <fieldset>
      <legend>Algorithm</legend>
      <select value={algorithm} onInput={onChange}>
        <option value="HMAC">HMAC</option>
        <option value="ECDSA">ECDSA</option>
        <option value="ECDH">ECDH</option>
      </select>
      <AlgortihmConfig algorithm={algorithm} />
    </fieldset>
  );
}
