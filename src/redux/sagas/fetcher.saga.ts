import { FetcherRequest, SuccessResponse } from "./../../models/fetcher.model";
import { put, takeLatest } from "redux-saga/effects";
import { fetchWithLock, lockScreen, messageDialog } from "../reducers/common.reducer";
import axiosInstance from "../../services/api.service";
import { AxiosError } from "axios";

function* handleFetcher({ payload }: { payload: FetcherRequest }) {
  yield put(lockScreen());

  // get parameters in payload
  const { data, successCallback, errorCallback } = payload;
  // call axios for request
  axiosInstance({ ...data })
    .then((res) => {
      const data: SuccessResponse<any> = {
        status: 0,
        result: res.data,
      };
      // handle success
      successCallback && successCallback(data);
    })
    .catch((error: AxiosError) => {
      // handle error
      const response = error.response;
      // if response status is 401 or 403 mean Unauthorized.
      if (response?.status === 401 || response?.status === 403) {
        // show message
        // store.dispatch(
        //     messageDialog({
        //         open: true,
        //         data: {
        //             type: "ERROR",
        //             title: "Authentication failed.",
        //             message: "Authentication failed.",
        //         },
        //     })
        // );

        // logout
        yeild put(logout());

        // clear data
        localStorage.clear();

        // clear session storage
        sessionStorage.clear();
      } else {
        // show error message
        yield put(
          messageDialog({
            open: true,
            data: {
              type: "ERROR",
              title: "An Error Occurred.",
              message: error?.message || "An Error Occurred.",
            },
          })
        );
      }

      // end process
      return;
    })
    .finally(() => {});
}

export default function* fetcher() {
  yield takeLatest(fetchWithLock, handleFetcher);
}
