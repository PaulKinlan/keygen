import { JSX } from "preact";

export function EcKeyGenParams({ state, setState }): JSX.Element {
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
          required />
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
