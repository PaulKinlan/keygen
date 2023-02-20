import { JSX } from "preact";

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
      <legend>{state.config.name} configuration</legend>
      <label for="name">
        Name
        <input
          name="name"
          type="text"
          value={state.config.name}
          disabled
          required />
      </label>
      <label for="publicExponent">
        Exponent:
        <input
          name="publicExponent"
          onInput={exponentChange}
          type="number"
          value={publicExponentAsNumber} />
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
