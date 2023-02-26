import { JSX } from "preact";

import { defaultConfigUsage, usageControls } from "../defaults.ts";
import Checkbox from "./general/Checkbox.tsx";
import { Heading3 } from "./general/Headings.tsx";

export default function AlgorithmUsage(
  { configState, setConfigState, keyState, exportedKeyState },
): JSX.Element {
  const defaultUsage = [...defaultConfigUsage[configState.config.name]];

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
      <Heading3>Usage</Heading3>
      <fieldset>
        {defaultUsage.map((usage) => {
          return (
            <Checkbox
              name="usage"
              id={usage}
              value={usage}
              checked={configState.usage.includes(usage)}
              onChange={usageChange}
            >
              {usage}
            </Checkbox>
          );
        })}
      </fieldset>
      {configState.usage.map((usage) => {
        return usageControls[usage]({configState, keyState, exportedKeyState});
      })}
    </div>
  );
}
