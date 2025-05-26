import React, { useEffect, useRef } from "react";
import PlaceholderTyper, { PlaceholderTyperOptions } from "../PlaceholderTyper";

type ElementType = "input" | "textarea";

type BaseProps = {
  as?: ElementType;
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
} & PlaceholderTyperOptions;

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type TypingInputProps = InputProps | TextareaProps;

const TypingInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TypingInputProps
>((props, ref) => {
  const { as = "input", className, id, name, placeholder, ...rest } = props;

  const localRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const combinedRef =
    (ref as React.RefObject<HTMLInputElement | HTMLTextAreaElement>) ||
    localRef;

  useEffect(() => {
    if (combinedRef.current) {
      new PlaceholderTyper(
        combinedRef.current,
        rest as PlaceholderTyperOptions
      );
    }
  }, [combinedRef, rest]);

  if (as === "textarea") {
    return (
      <textarea
        ref={combinedRef as React.Ref<HTMLTextAreaElement>}
        className={className}
        id={id}
        name={name}
        placeholder={placeholder}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  const inputProps = rest as React.InputHTMLAttributes<HTMLInputElement>;
  return (
    <input
      ref={combinedRef as React.Ref<HTMLInputElement>}
      className={className}
      id={id}
      name={name}
      type={inputProps.type ?? "text"}
      placeholder={placeholder}
      {...inputProps}
    />
  );
});

TypingInput.displayName = "TypingInput";

export default TypingInput;
