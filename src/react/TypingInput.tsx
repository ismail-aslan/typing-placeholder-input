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

interface PlaceholderTyperWrapperProps extends PlaceholderTyperOptions {
  as?: "input" | "textarea";
  className?: string;
  style?: React.CSSProperties;
  name?: string;
}

const PlaceholderTyperWrapper: React.FC<PlaceholderTyperWrapperProps> = ({
  as = "input",
  className,
  style,
  name,
  ...typerOptions
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const typerRef = useRef<PlaceholderTyperClass | null>(null);

  // ✅ Use deep compare memoization to prevent unnecessary reinitialization
  const stableOptions = useDeepCompareMemoize(typerOptions);

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

  const InputComponent = as;

  return (
    <InputComponent
      ref={inputRef as any}
      className={className}
      style={style}
      name={name}
    />
  );
};

export type { PlaceholderTyperWrapperProps };
export default PlaceholderTyperWrapper;
