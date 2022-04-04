import { confirmDialog, isLoading, lockScreen, messageDialog, unLockScreen } from "./../redux/reducers/common.reducer";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialogData, MessageDialogParams } from "../models/common.model";

const useCommon = () => {
  const dispatch = useDispatch();
  const commonState = useSelector(isLoading);

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
        messageDialog({
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
      messageDialog({
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
        confirmDialog({
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
      confirmDialog({
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
