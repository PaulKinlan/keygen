import { JSX } from "preact";

import { Label } from "../components/general/Label.tsx";

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
      <Label for="length">
        Length:
        <select class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="length" onInput={lengthChange} value={state.length}>
          <option value="128">128</option>
          <option value="192">192</option>
          <option value="256">256</option>
        </select>
      </Label>
    </fieldset>
  );
}
