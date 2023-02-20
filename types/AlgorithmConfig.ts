import { JSX } from "preact";
import { AlgorithmConfigComponentProps } from "./AlgorithmConfigComponentProps.ts";

export type AlgorithmConfig = {
  [k: string]: (props: AlgorithmConfigComponentProps) => JSX.Element;
};
