import { useState } from "react";
import checkStatus from "../utils/checkStatus";

export type RestApiState = {
  isLoading: boolean;
  error: any;
  data: any;
};
export type RestApiResult = any;

export type FetchRequestFn = (fetchOpts: any) => Promise<RestApiResult>;

// An extremely crude custom hook to handle fetch requests
// In reality we'd like something a bit better
export default function useRestApi(
  endpoint: string,
  fetchOpts: any = {}
): [RestApiState, FetchRequestFn] {
  const [requestState, setRequestState] = useState<RestApiState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const doFetchRequest: FetchRequestFn = async (extraFetchOpts) => {
    // Set new state before the request
    setRequestState({
      ...requestState,
      isLoading: true,
      error: null,
    });
    try {
      // TODO properly deep merge the 2 sets of fetch options
      const result = await fetch(endpoint, { ...fetchOpts, ...extraFetchOpts })
        .then(checkStatus)
        .then((r) => r.json());
      setRequestState({
        ...requestState,
        isLoading: false,
        data: result,
      });
      // Although the result is available through state, we'll also return the result
      // to support other patterns
      return result;
    } catch (e) {
      setRequestState({
        ...requestState,
        isLoading: false,
        error: e,
      });
      throw e;
    }
  };

  return [requestState, doFetchRequest];
}
