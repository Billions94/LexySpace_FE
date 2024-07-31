import React from 'react';

export function useInput<T>(inputState: T) {
  const [input, setInput] = React.useState(inputState);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>): void {
    setInput({ ...input, [target.name]: target.value });
  }

  function resetInput() {
    setInput(inputState);
  }

  return { input, handleChange, setInput, resetInput } as const;
}
