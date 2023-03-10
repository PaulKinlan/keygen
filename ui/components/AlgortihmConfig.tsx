import { JSX } from "preact";

import { Heading2 } from "./general/Headings.tsx";
import {
  configControl
} from "../defaults.ts";

export default function AlgortihmConfig(
  { configState, setConfigState }): JSX.Element {
  const configComponent = configControl[configState.config.name]({
    name: configState.config.name,
    state: configState,
    setState: setConfigState,
  });
  
  return (
    <div>
      <Heading2>Config</Heading2>
      {configComponent}
    </div>
  );
}
