import { JSX } from "preact";
import { StateUpdater, useState } from "preact/hooks";

import { IS_BROWSER } from "$fresh/runtime.ts";

type AlgorithmComponentProps = {
  algorithm: string;
};

type AlgorithmConfig = {
  [k: string]: (props: AlgorithmConfigComponentProps) => JSX.Element;
};

/*
https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey

For RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP: pass an RsaHashedKeyGenParams object.
For ECDSA or ECDH: pass an EcKeyGenParams object.
For HMAC: pass an HmacKeyGenParams object.
For AES-CTR, AES-CBC, AES-GCM, or AES-KW: pass an AesKeyGenParams object.
*/

const configControl: AlgorithmConfig = {
  "HMAC": HmacKeyGenParams, // https://developer.mozilla.org/en-US/docs/Web/API/HmacKeyGenParams
  "ECDSA": EcKeyGenParams, // https://developer.mozilla.org/en-US/docs/Web/API/EcKeyGenParams
  "ECDH": EcKeyGenParams,
  "AES-CBC": AESKeyGenParams,
  "AES-CTR": AESKeyGenParams,
  "AES-GCM": AESKeyGenParams,
  "AES-KW": AESKeyGenParams,
  "RSASSA-PKCS1-v1_5": RsaHashedKeyGenParams,
  "RSA-PSS": RsaHashedKeyGenParams,
  "RSA-OAEP": RsaHashedKeyGenParams,
};

const defaultConfig = {
  "HMAC": { name: "HMAC", hash: "SHA-256", length: 256 },
  "ECDSA": { name: "ECDSA", hash: "P-256" },
  "ECDH": { name: "ECDH", hash: "P-256" },
  "AES-CBC": { name: "AES-CBC", length: 256 },
  "AES-CTR": { name: "AES-CTR", length: 256 },
  "AES-GCM": { name: "AES-GCM", length: 128 },
  "AES-KW": { name: "AES-KW", length: 256 },
  "RSASSA-PKCS1-v1_5": { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) },
  "RSA-PSS": { name: "RSA-PSS", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) },
  "RSA-OAEP": { name: "RSA-OAEP", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) },
}

type AlgorithmConfigComponentProps = {
  name: string;
  state: any;
  setState: StateUpdater<{}>;
};

function HmacKeyGenParams(
  { name, state, setState }: AlgorithmConfigComponentProps,
): JSX.Element {
  const hashChange = (event: Event) => {
    setState({ ...state, hash: event.target?.value });
  };
  const lengthChange = (event: Event) => {
    setState({ ...state, length: event.target?.value });
  };

  return (
    <fieldset>
      <legend>{name} configuration</legend>
      <label for="name">
        Name:
        <input name="name" type="text" value={name} disabled required />
      </label>
      <label for="hash">
        Hash method:
        <select name="hash" onInput={hashChange} value={state.hash}>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </label>
      <label for="length">
        Length (optional):
        <input name="length" type="number" onInput={lengthChange} value={state.length} />
      </label>
    </fieldset>
  );
}

function EcKeyGenParams({ name, state, setState }): JSX.Element {
  const hashChange = (event: Event) => {
    setState({ ...state, hash: event.target?.value });
  };

  return (
    <fieldset>
      <legend>{name} configuration</legend>
      <label for="name">
        Name
        <input name="name" type="text" value={name} disabled required />
      </label>
      <label for="hash">
        Hash method
        <select name="hash" onInput={hashChange} value={state.hash}>
          <option value="P-256">P-256</option>
          <option value="P-384">P-384</option>
          <option value="P-521">P-521</option>
        </select>
      </label>
    </fieldset>
  );
}

function AESKeyGenParams({ name, state, setState }): JSX.Element {
  // lenght 128, 192, or 256.
  const lengthChange = (event: Event) => {
    setState({ ...state, length: parseInt(event.target?.value) });
  };

  return (
    <fieldset>
      <legend>{name} configuration</legend>
      <label for="name">
        Name
        <input name="name" type="text" value={name} disabled required />
      </label>
      <label for="length">
        Length:
        <select name="length" onInput={lengthChange} value={state.length}>
          <option value="128">128</option>
          <option value="192">192</option>
          <option value="256">256</option>
        </select>
      </label>
    </fieldset>
  );
}

function RsaHashedKeyGenParams({ name, state, setState }): JSX.Element {
  const modulusLengthChange = (event: Event) => {
    setState({ ...state, length: event.target?.value });
  };

  const hashChange = (event: Event) => {
    setState({ ...state, hash: parseInt(event.target?.value) });
  };

  const exponentChange = (event: Event) => {
    const buffer = new ArrayBuffer(4);
    const _32bit = new Uint32Array(buffer);
    _32bit[0] = event.target?.valueAsNumber;
    setState({ ...state, exponent: new Uint8Array(buffer).slice(0,3) });
  };

  return (
    <fieldset>
      <legend>{name} configuration</legend>
      <label for="name">
        Name
        <input name="name" type="text" value={name} disabled required />
      </label>
      <label for="exponent">
        Exponent:
        <input
          name="exponent"
          onInput={exponentChange}
          type="number"
          value={state.exponent}
        />
      </label>
      <label for="modulusLength">
        Modulous Length:
        <select name="modulusLength" onInput={modulusLengthChange} value={state.modulusLength}>
          <option value="2048">2048</option>
          <option value="4096">4096</option>
        </select>
      </label>
      <label for="hash">
        Hash method
        <select name="hash" onInput={hashChange} value={state.hash}>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-521">SHA-521</option>
        </select>
      </label>
    </fieldset>
  );
}

function AlgortihmConfig(props: AlgorithmComponentProps): JSX.Element {
  // Manage the state here.
  const [configState, setConfigState] = useState({name: props.algorithm});

  if (configState.name !== props.algorithm) {
    // Update the state if the algorithm changes.
    setConfigState({...defaultConfig[props.algorithm]})
  }
  const configComponent = configControl[props.algorithm]({
    name: props.algorithm,
    state: configState,
    setState: setConfigState,
  });

  return (
    <div>
      <h1>Config</h1>
      {configComponent}
      <Debug config={configState} />
    </div>
  );
}

function Debug(obj) {
  console.log("debug", obj, Object.entries(obj).map(([k,v]) => <div>a</div>))
  return <div>
    {Object.entries(obj.config).map(([k,v]) => <div>a</div>)}
  </div>
}

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
        <option value="AES-CBC">AES-CBC</option>
        <option value="AES-CTR">AES-CTR</option>
        <option value="AES-GCM">AES-GCM</option>
        <option value="AES-KW">AES-KW</option>
        <option value="RSA-OAEP">RSA-OAEP</option>
        <option value="RSA-PSS">RSA-PSS</option>
        <option value="RSASSA-PKCS1-v1_5">RSASSA-PKCS1-v1_5</option>
      </select>
      <AlgortihmConfig algorithm={algorithm} />
    </fieldset>
  );
}
