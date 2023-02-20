import { StateUpdater } from "preact/hooks";

export type AlgorithmComponentProps = {
  algorithm: string;
  configState: any;
  setConfigState: StateUpdater<{}>;
};
