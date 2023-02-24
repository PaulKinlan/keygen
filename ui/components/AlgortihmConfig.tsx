import { JSX } from "preact";
import Checkbox from "./general/Checkbox.tsx";
import { Heading2, Heading3 } from "./general/Headings.tsx";
import {
  configControl, defaultConfigUsage,
  usageControls
} from "../defaults.ts";

export default function AlgortihmConfig(
  { configState, setConfigState }): JSX.Element {
  const configComponent = configControl[configState.config.name]({
    name: configState.config.name,
    state: configState,
    setState: setConfigState,
  });
  
  const deafultUsage = [...defaultConfigUsage[configState.config.name]];

  const usageChange = (event) => {
    const usage = configState.usage;
    if(event.target.checked) {
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
      <Heading2>Config</Heading2>
      {configComponent}
      <Heading3>Usage</Heading3>
      <fieldset>
        {deafultUsage.map((usage) => {
          return (
            <Checkbox
              name="usage"
              id={usage}
              value={usage}
              checked={configState.usage.includes(usage)}
              onChange={usageChange}
            >{usage}</Checkbox>
          );
        })}
      </fieldset>
      {configState.usage.map((usage) => {
        return usageControls[usage](configState);
      })}
    </div>
  );
}
