import { useCallback, useState } from "react";

type onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

export function useInput(initialValue = "") {
  const [inputValue, setInputValue] = useState(initialValue);

  const onHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  return [inputValue, onHandleChange, setInputValue] as [
    string,
    onChangeType,
    typeof setInputValue,
  ];
}
