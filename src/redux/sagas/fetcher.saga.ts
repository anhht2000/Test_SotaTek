/* eslint-disable no-console */
import { call, put, takeLatest } from "redux-saga/effects";
import { FetcherRequest, SuccessResponse } from "../../models/fetcher.model";
import { fetch } from "../../services/api.service";
import {
  changeMessageDialog,
  fetchWithLock,
  lockScreen,
  setIsLoading,
  unLockScreen,
} from "../reducers/common.reducer";

function* handleFetcher({ payload }: { payload: FetcherRequest }): any {
  yield put(lockScreen());
  // get parameters in payload
  const { data, successCallback, errorCallback } = payload;
  // call axios for request
  try {
    const response: Promise<Response> = yield call(fetch, data);
    console.log(response);

    const dataResponse: SuccessResponse<any> = {
      status: 0,
      // result: response.data,
    };
    // handle success
    successCallback && successCallback(dataResponse);
  } catch (error: any) {
    const response = error;
    // if response status is 401 or 403 mean Unauthorized.
    if (response?.status === 401 || response?.status === 403) {
      // show message
      yield put(
        changeMessageDialog({
          open: true,
          data: {
            type: "ERROR",
            title: "Authentication failed.",
            message: "Authentication failed.",
          },
        })
      );

      // logout
      // yeild put(logout());

      // clear data
      localStorage.clear();

      // clear session storage
      sessionStorage.clear();
    } else {
      // show error message

      yield put(
        changeMessageDialog({
          open: true,
          data: {
            type: "ERROR",
            title: "An Error Occurred.",
            message: error?.message || "An Error Occurred.",
          },
        })
      );
    }

    // error callback
    errorCallback && errorCallback(response);
    // end process
    return;
  } finally {
    yield put(setIsLoading(false));
    yield put(unLockScreen());
  }
}

export default function* fetcher() {
  yield takeLatest(fetchWithLock, handleFetcher);
}
