import { JSX } from "preact";

import { Label } from "../components/general/Label.tsx";

export function EcKeyGenParams({ state, setState }): JSX.Element {
  const hashChange = (event: Event) => {
    setState({
      ...state,
      config: { ...state.config, hash: event.target?.value },
    });
  };

  return (
    <fieldset>
      <Label for="hash">
        Named Curve:
        <select class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="hash" onInput={hashChange} value={state.config.hash}>
          <option value="P-256">P-256</option>
          <option value="P-384">P-384</option>
          <option value="P-521">P-521</option>
        </select>
      </Label>
    </fieldset>
  );
}
