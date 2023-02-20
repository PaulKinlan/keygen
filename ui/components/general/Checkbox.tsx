import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Checkbox(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const otherProps = { ...props };
  delete otherProps.children;
  return (
    <>
      <input type="checkbox" {...otherProps} />
      <label for="sign">{this.props.children}</label>
    </>
  );
}
