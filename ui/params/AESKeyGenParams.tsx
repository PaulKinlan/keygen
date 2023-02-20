import { JSX } from "preact";

export function AESKeyGenParams({ state, setState }): JSX.Element {
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
          required />
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
