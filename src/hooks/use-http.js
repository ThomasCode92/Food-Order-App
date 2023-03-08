import { useCallback, useState } from 'react';

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      if (applyData) {
        applyData(data);
      }
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong';
      setError(errorMessage);
    }

    setIsLoading(false);
  }, [requestConfig, applyData]);

  return { isLoading, error, sendRequest };
};

export default useHttp;
