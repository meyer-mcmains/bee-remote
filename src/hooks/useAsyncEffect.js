import { useEffect, useState } from 'react';

const useAsyncEffect = func => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    async function asyncFunc() {
      setResult(await func());
    }
    asyncFunc();
  }, [func]);
  return [result];
};

export default useAsyncEffect;
