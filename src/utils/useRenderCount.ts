import { useEffect, useRef } from 'react';

function useRenderCount() {
  const renderCount = useRef(1);
  useEffect(() => {
    renderCount.current += 1;
  });
  return renderCount;
}

export default useRenderCount;
