import { useState, useCallback } from "react";

type InputProps = {
  defaultValue: string;
};

export type InputState = {
  value: string;
  handleChange: Function;
};

export default function useInput(props: InputProps): InputState {
  const { defaultValue } = props;

  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return {
    value,
    handleChange
  };
}
