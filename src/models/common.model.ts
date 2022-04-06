export interface MessageDialogPayload {
  open: boolean;
  data?: MessageDialogParams;
}

export interface MessageDialogParams {
  title?: string;
  message: string;
  type?: "INFO" | "WARNING" | "ERROR";
  dismiss?: () => void;
}

export interface ConfirmDialogPayload {
  open: boolean;
  data?: ConfirmDialogData;
}

export interface ConfirmDialogData {
  title?: string;
  message: string;
  type?: "INFO" | "WARNING" | "ERROR";
  actions?: ConfirmDialogAction[];
}

export interface ConfirmDialogAction {
  label: string;
  className?: string;
  action?: () => void;
}
