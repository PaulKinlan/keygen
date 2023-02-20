import { JSX } from "preact";
import { AlgorithmConfigComponentProps } from "../../types/AlgorithmConfigComponentProps.ts";

import { Label } from "../components/general/Label.tsx";
import { Input } from "../components/general/Input.tsx";

export function HmacKeyGenParams(
  { state, setState }: AlgorithmConfigComponentProps): JSX.Element {
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
      <Label for="hash">
        Hash method:
        <select class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="hash" onInput={hashChange} value={state.config.hash}>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </Label>
      <Label for="length">
        Length (optional):
        <Input
          name="length"
          type="number"
          onInput={lengthChange}
          value={state.length} />
      </Label>
    </fieldset>
  );
}
