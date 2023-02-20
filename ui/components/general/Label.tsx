export function Label(props: JSX.HTMLAttributes<HTMLLabelElement>) {
    const otherProps = { ...props };
    delete otherProps.children;
    return (
      <>
        <label
          class="block mb-2 text-sm font-medium text-gray-900"
          {...otherProps}
        >
          {props.children}
        </label>
      </>
    );
  }