import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Heading1(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const otherProps = { ...props };
  delete otherProps.children;
  return (
    <>
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
        {...otherProps}
      >
        {props.children}
      </h1>
    </>
  );
}

export function Heading2(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const otherProps = { ...props };
  delete otherProps.children;
  return (
    <>
      <h2
        class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
        {...otherProps}
      >
        {props.children}
      </h2>
    </>
  );
}

export function Heading3(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const otherProps = { ...props };
  delete otherProps.children;
  return (
    <>
      <h3
        class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl"
        {...otherProps}
      >
        {props.children}
      </h3>
    </>
  );
}

export function Heading4(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const otherProps = { ...props };
  delete otherProps.children;
  return (
    <>
      <h4
        class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl"
        {...otherProps}
      >
        {props.children}
      </h4>
    </>
  );
}
