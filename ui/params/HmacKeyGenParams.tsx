import { JSX } from "preact";
import { AlgorithmConfigComponentProps } from "../../types/AlgorithmConfigComponentProps.ts";


export function HmacKeyGenParams(
  { name, state, setState }: AlgorithmConfigComponentProps): JSX.Element {
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
          required />
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
          value={state.length} />
      </label>
    </fieldset>
  );
}
