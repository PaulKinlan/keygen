import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...props}
      />
    </>
  );
}
