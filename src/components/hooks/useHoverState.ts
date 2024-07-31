import { useState } from 'react';

export function useHoverState() {
  const [show, setShow] = useState(false);

  function handleShow(state: boolean) {
    if (state) setShow(state);
    else setShow(state);
  }

  return { show, handleShow } as const;
}
