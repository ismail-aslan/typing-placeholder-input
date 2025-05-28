import React, { useEffect, useRef } from "react";
import PlaceholderTyperClass, {
  PlaceholderTyperOptions,
} from "../PlaceholderTyper";

function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value);
  const prev = JSON.stringify(ref.current);
  const next = JSON.stringify(value);
  if (prev !== next) {
    ref.current = value;
  }
  return ref.current;
}

type BaseProps = PlaceholderTyperOptions & {
  as?: "input" | "textarea";
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  BaseProps & {
    as?: "input";
  };

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  BaseProps & {
    as: "textarea";
  };

type PlaceholderTyperWrapperProps = InputProps | TextareaProps;

const PlaceholderTyperWrapper: React.FC<PlaceholderTyperWrapperProps> = (
  props
) => {
  const { as = "input", ...rest } = props;

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const typerRef = useRef<PlaceholderTyperClass | null>(null);

  // Extract PlaceholderTyper-specific options
  const {
    strings,
    speed,
    delayBetween,
    deleteSpeed,
    loop,
    cursor,
    ...nativeProps
  } = rest;

  const stableOptions = useDeepCompareMemoize({
    strings,
    speed,
    delayBetween,
    deleteSpeed,
    loop,
    cursor,
  });
  useEffect(() => {
    if (inputRef.current) {
      typerRef.current = new PlaceholderTyperClass(
        inputRef.current,
        stableOptions
      );
    }
    return () => {
      typerRef.current?.stop();
    };
  }, [stableOptions]);

  if (as === "textarea") {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        {...(nativeProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      {...(nativeProps as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
};

export type { PlaceholderTyperWrapperProps };
export default PlaceholderTyperWrapper;
