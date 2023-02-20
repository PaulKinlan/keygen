import { JSX } from "preact";

import { Label } from "../components/general/Label.tsx";

export function RsaHashedKeyGenParams({ state, setState }): JSX.Element {
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
      <Label for="publicExponent">
        Exponent:
        <input
          name="publicExponent"
          onInput={exponentChange}
          type="number"
          value={publicExponentAsNumber} />
      </Label>
      <Label for="modulusLength">
        Modulous Length:
        <select
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="modulusLength"
          onInput={modulusLengthChange}
          value={state.config.modulusLength}
        >
          <option value="2048">2048</option>
          <option value="4096">4096</option>
        </select>
      </Label>
      <Label for="hash">
        Hash method
        <select 
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="hash" onInput={hashChange} value={state.config.hash}>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-521">SHA-521</option>
        </select>
      </Label>
    </fieldset>
  );
}
