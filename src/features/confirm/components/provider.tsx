import { Options } from '@/features/confirm/types/options';
import { d } from '@/utils/dictionary';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ModalProps,
  Dialog as MuiDialog
} from '@mui/material';
import { Fragment, ReactNode, useCallback, useState } from 'react';
import { Context } from './context';

type DialogProps = {
  open: boolean;
  options: Options;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  onClose: ModalProps['onClose'];
  loading?: boolean;
};

const Dialog = ({ open, options, onCancel, onConfirm, onClose, loading }: DialogProps) => {
  const { title, content, confirmationText, cancellationText } = options;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <MuiDialog
      disableRestoreFocus
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={!loading ? onClose : undefined}>
      {title && <DialogTitle>{title}</DialogTitle>}

      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button
          onClick={onCancel}
          color="inherit">
          {cancellationText}
        </Button>

        <LoadingButton
          color="primary"
          variant="contained"
          loading={loading}
          onClick={handleConfirm}>
          {confirmationText}
        </LoadingButton>
      </DialogActions>
    </MuiDialog>
  );
};

type ProviderProps = {
  children: ReactNode;
  defaultOptions?: Options;
};

const Provider = ({ children, defaultOptions = {} }: ProviderProps) => {
  const [options, setOptions] = useState<Options>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resolveReject, setResolveReject] = useState<((value?: unknown) => void)[]>([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((optionsArg = {}) => {
    return new Promise((resolveArg, rejectArg) => {
      setOptions(optionsArg);
      setResolveReject([resolveArg, rejectArg]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsLoading(false);
    setResolveReject([]);
    if (options.onClose) {
      options.onClose();
    }
  }, [options]);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    if (resolve) {
      resolve();
    }
    if (options.onConfirm) {
      await options.onConfirm();
      handleClose();
    }
  }, [handleClose, options, resolve]);

  return (
    <Fragment>
      <Context.Provider value={confirm}>{children}</Context.Provider>
      <Dialog
        open={resolveReject.length === 2}
        options={{
          title: d.confirmAction,
          content: `${d.pleaseConfirmYouWouldLikeToProcess}.`,
          confirmationText: d.ok,
          cancellationText: d.cancel,
          ...defaultOptions,
          ...options
        }}
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleConfirm}
        loading={isLoading}
      />
    </Fragment>
  );
};

export { Provider as ConfirmProvider };
