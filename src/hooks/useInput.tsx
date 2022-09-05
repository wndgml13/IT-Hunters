import { useState } from "react";

export function useInput(initialValue: any) {
  const [inputValue, setInputValue] = useState<any>(initialValue);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return [inputValue, onHandleChange, setInputValue];
}
