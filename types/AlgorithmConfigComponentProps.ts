import { StateUpdater } from "preact/hooks";

export type AlgorithmConfigComponentProps = {
  name: string;
  state: any;
  setState: StateUpdater<{}>;
};
