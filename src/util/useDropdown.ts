import { useState, useCallback } from "react";

type DropdownProps<T> = {
  defaultValue: T;
};

export type DropdownState<T> = {
  selectedValue: T;
  handleChange: Function;
};

export default function useDropdown<T>(
  props: DropdownProps<T>
): DropdownState<T> {
  const { defaultValue } = props;
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue);

  const handleChange = useCallback((value: T) => {
    setSelectedValue(value);
  }, []);

  return {
    selectedValue,
    handleChange
  };
}
