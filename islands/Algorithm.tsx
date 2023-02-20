import { JSX } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";

import { IS_BROWSER } from "$fresh/runtime.ts";

type AlgorithmComponentProps = {
  algorithm: string;
  configState: any;
  setConfigState: StateUpdater<{}>;
};

type AlgorithmConfigComponentProps = {
  name: string;
  state: any;
  setState: StateUpdater<{}>;
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
  "ECDSA": { name: "ECDSA", namedCurve: "P-256" },
  "ECDH": { name: "ECDH", namedCurve: "P-256" },
  "AES-CBC": { name: "AES-CBC", length: 256 },
  "AES-CTR": { name: "AES-CTR", length: 256 },
  "AES-GCM": { name: "AES-GCM", length: 256 },
  "AES-KW": { name: "AES-KW", length: 256 },
  "RSASSA-PKCS1-v1_5": {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
  "RSA-PSS": {
    name: "RSA-PSS",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
  "RSA-OAEP": {
    name: "RSA-OAEP",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
};

const defaultConfigUsage = { // verify this, copiolot made it
  "HMAC": ["sign", "verify"],
  "EDSA": ["sign", "verify"],
  "ECDH": ["deriveBits", "deriveKey"],
  "AES-CBC": ["encrypt", "decrypt"],
  "AES-CTR": ["encrypt", "decrypt"],
  "AES-GCM": ["encrypt", "decrypt"],
  "AES-KW": ["wrapKey", "unwrapKey"],
  "RSASSA-PKCS1-v1_5": ["sign", "verify"],
  "RSA-PSS": ["sign", "verify"],
  "RSA-OAEP": ["encrypt", "decrypt"],
};

function HmacKeyGenParams(
  { name, state, setState }: AlgorithmConfigComponentProps,
): JSX.Element {
  const hashChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, hash: event.target?.value },
    });
  };
  const lengthChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, length: event.target?.value },
    });
  };

  return (
    <fieldset>
      <legend>{state.config.name} configuration</legend>
      <label for="name">
        Name:
        <input
          name="name"
          type="text"
          value={state.config.name}
          disabled
          required
        />
      </label>
      <label for="hash">
        Hash method:
        <select name="hash" onInput={hashChange} value={state.config.hash}>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </label>
      <label for="length">
        Length (optional):
        <input
          name="length"
          type="number"
          onInput={lengthChange}
          value={state.length}
        />
      </label>
    </fieldset>
  );
}

function EcKeyGenParams({ state, setState }): JSX.Element {
  const hashChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, hash: event.target?.value },
    });
  };

  return (
    <fieldset>
      <legend>{state.config.name} configuration</legend>
      <label for="name">
        Name:
        <input
          name="name"
          type="text"
          value={state.config.name}
          disabled
          required
        />
      </label>
      <label for="hash">
        Named Curve:
        <select name="hash" onInput={hashChange} value={state.config.hash}>
          <option value="P-256">P-256</option>
          <option value="P-384">P-384</option>
          <option value="P-521">P-521</option>
        </select>
      </label>
    </fieldset>
  );
}

function AESKeyGenParams({ state, setState }): JSX.Element {
  // lenght 128, 192, or 256.
  const lengthChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, length: parseInt(event.target?.value) },
    });
  };

  return (
    <fieldset>
      <legend>{state.config.name} configuration</legend>
      <label for="name">
        Name
        <input
          name="name"
          type="text"
          value={state.config.name}
          disabled
          required
        />
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

function RsaHashedKeyGenParams({ state, setState }): JSX.Element {
  const modulusLengthChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, length: event.target?.value },
    });
  };

  const hashChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, hash: parseInt(event.target?.value) },
    });
  };

  const exponentChange = (event: Event) => {
    const buffer = new ArrayBuffer(4);
    const _32bit = new Uint32Array(buffer);
    _32bit[0] = event.target?.valueAsNumber;
    setState({ ...state, publicExponent: new Uint8Array(buffer).slice(0, 3) });
  };

  const buffer = new ArrayBuffer(4);
  const _8bit = new Uint8Array(buffer);
  const _32bit = new Uint32Array(buffer);

  _8bit.set(state.config.publicExponent, 0);

  const publicExponentAsNumber = _32bit[0];

  return (
    <fieldset>
      <legend>{state.config.name} configuration</legend>
      <label for="name">
        Name
        <input
          name="name"
          type="text"
          value={state.config.name}
          disabled
          required
        />
      </label>
      <label for="publicExponent">
        Exponent:
        <input
          name="publicExponent"
          onInput={exponentChange}
          type="number"
          value={publicExponentAsNumber}
        />
      </label>
      <label for="modulusLength">
        Modulous Length:
        <select
          name="modulusLength"
          onInput={modulusLengthChange}
          value={state.config.modulusLength}
        >
          <option value="2048">2048</option>
          <option value="4096">4096</option>
        </select>
      </label>
      <label for="hash">
        Hash method
        <select name="hash" onInput={hashChange} value={state.config.hash}>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-521">SHA-521</option>
        </select>
      </label>
    </fieldset>
  );
}

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
        <input
          type="checkbox"
          name="usage"
          id="sign"
          value="sign"
          checked={configState.usage.includes("sign")}
          onChange={usageChange}
        />
        <label for="sign">Sign</label>
        <input
          type="checkbox"
          name="usage"
          id="verify"
          value="verify"
          checked={configState.usage.includes("verify")}
        />
        <label for="verify">Verify</label>
        <input
          type="checkbox"
          name="usage"
          id="encrypt"
          value="encrypt"
          checked={configState.usage.includes("encrypt")}
        />
        <label for="encrypt">Encrypt</label>
        <input
          type="checkbox"
          name="usage"
          id="decrypt"
          value="decrypt"
          checked={configState.usage.includes("decrypt")}
        />
        <label for="decrypt">Decrypt</label>
        <input
          type="checkbox"
          name="usage"
          id="wrapKey"
          value="wrapKey"
          checked={configState.usage.includes("wrapKey")}
        />
        <label for="wrapKey">Wrap Key</label>
        <input
          type="checkbox"
          name="usage"
          id="unwrapKey"
          value="unwrapKey"
          checked={configState.usage.includes("unwrapKey")}
        />
        <label for="unwrapKey">Unwrap Key</label>
        <input
          type="checkbox"
          name="usage"
          id="deriveKey"
          value="deriveKey"
          checked={configState.usage.includes("deriveKey")}
        />
        <label for="deriveKey">Derive Key</label>
        <input
          type="checkbox"
          name="usage"
          id="deriveBits"
          value="deriveBits"
          checked={configState.usage.includes("deriveBits")}
        />
        <label for="deriveBits">Derive Bits</label>
      </fieldset>
    </div>
  );
}

function AlgorithmOutput({ configState }): JSX.Element {
  console.log("configState", configState);
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
    console.log("keyState", keyState);
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
    <fieldset>
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
