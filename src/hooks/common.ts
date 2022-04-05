/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialogData, MessageDialogParams } from "../models/common.model";
import { RootState } from "../redux/store";
import { changeConfirmDialog, lockScreen, changeMessageDialog, unLockScreen } from "./../redux/reducers/common.reducer";

const useCommon = () => {
  const dispatch = useDispatch();
  const commonState = useSelector((state: RootState) => state.common);

  /**
   * openLockScreen
   */
  const openLockScreen = useCallback(() => {
    // dispatch lockScreen action
    dispatch(lockScreen());
  }, [dispatch]);

  /**
   * closeLockScreen
   */
  const closeLockScreen = useCallback(() => {
    // dispatch unlockScreen action
    dispatch(unLockScreen());
  }, [dispatch]);

  /**
   * show message dialog
   * @param params MessageDialogParams
   */
  const showMessage = useCallback(
    (params: MessageDialogParams): void => {
      dispatch(
        changeMessageDialog({
          open: true,
          data: params,
        })
      );
    },
    [dispatch]
  );

  /**
   * close message dialog
   */
  const closeMessage = useCallback(() => {
    dispatch(
      changeMessageDialog({
        open: false,
      })
    );
  }, [dispatch]);

  /**
   * show confirm dialog
   */
  const showConfirm = useCallback(
    (data: ConfirmDialogData) => {
      dispatch(
        changeConfirmDialog({
          open: true,
          data,
        })
      );
    },
    [dispatch]
  );

  /**
   * close confirm dialog
   */
  const closeConfirm = useCallback(() => {
    dispatch(
      changeConfirmDialog({
        open: false,
      })
    );
  }, [dispatch]);

  return useMemo(
    () => ({
      showMessage,
      closeMessage,
      openLockScreen,
      showConfirm,
      closeConfirm,
      closeLockScreen,
      ...commonState,
    }),
    [closeConfirm, closeLockScreen, closeMessage, commonState, openLockScreen, showConfirm, showMessage]
  );
};

export default useCommon;
