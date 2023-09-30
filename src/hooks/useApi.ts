import { useEffect, useState } from 'react';

import { HookTypeParam, ReturnHookType } from '../@types/hooks';

/**
 *
 * @template T the type of the Hook's `response`.
 * @template P the type of the service method's `param`.
 */
export function useApi<T, P = any>({ service, params, effects = [], delayDuration = 0, onSuccess }: HookTypeParam<T, P>): ReturnHookType<T> {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<T | any>(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoading(true);
    service(params)
      .then((res: T) => {
        setResponse(res);
        setTimeout(() => {
          setLoading(false);
          setLoaded(true);
        }, delayDuration);
        if (onSuccess) onSuccess(res)
      })
      .catch((err: any) => {
        setError(err);
        setLoading(false);
        setLoaded(true);
        setTimeout(() => {
          setLoading(false);
          setLoaded(true);
        }, delayDuration);
      });
    return () => { };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, effects);

  return {
    loading,
    loaded,
    response,
    error,
  };
}
