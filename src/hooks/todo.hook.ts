import { useAppDispatch } from "./redux.hook";
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useMemo } from "react";
import { fetchWithLock } from "../redux/reducers/common.reducer";
import { API } from "../common/constants/api.constants";
import { FetcherRequest } from "../models/fetcher.model";

const useTodo = () => {
  const dispatch = useAppDispatch();

  /**
   *API TODO(API-600-003)
   * @param payload GET todolist
   */
  const getTodoList = useCallback(
    (payload: Partial<FetcherRequest>) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "GET";

        dispatch(fetchWithLock({ data: { url: "API.TODO", data, method }, successCallback, errorCallback }));
      } catch (error: any) {
        errorCallback && errorCallback(error);
      }
    },
    [dispatch]
  );

  return useMemo(() => ({ getTodoList }), [getTodoList]);
};

export default useTodo;
