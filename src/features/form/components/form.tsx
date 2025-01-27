import { Button, ButtonProps, IconButton, IconButtonProps, Typography } from '@mui/material';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  useForm
} from 'react-hook-form';

import { FormContext } from '@/features/form/types/formContext';
import { FormErrorSummary } from '@/features/form/components/form-error-summary';
import Grid from '@mui/material/Grid2';
import { ReactNode } from 'react';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { ZodSchema } from 'zod';
import { d } from '@/utils/dictionary';
import { useConfirm } from '@/features/confirm/hooks/useContext';
import { zodResolver } from '@hookform/resolvers/zod';

type FormProps<T extends FieldValues> = {
  children: ReactNode;
  schema: ZodSchema<T>;
  title?: string;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  slotProps?: {
    submitButtonProps?: ButtonProps;
    resetButtonProps?: Partial<IconButtonProps>;
    formContainerProps?: Partial<typeof Grid>;
  };
  showResetButton?: boolean;
  mode?: UseFormProps<T>['mode'];
  submitButtonText?: string;
  values?: UseFormProps<T>['values'];
  defaultValues?: DefaultValues<T>;
  readOnly?: boolean;
};

const Form = <T extends FieldValues>({
  children,
  schema,
  title,
  onSubmit,
  onError,
  slotProps,
  showResetButton = true,
  mode = 'all',
  values,
  defaultValues,
  submitButtonText,
  readOnly = false
}: FormProps<T>) => {
  const confirm = useConfirm();

  const form = useForm<T>({
    mode,
    values,
    defaultValues,
    resolver: zodResolver(schema)
  });

  const handleConfirm = () => {
    form.reset(defaultValues);
  };

  const handleResetFormClick = async () => {
    await confirm({
      onConfirm: handleConfirm
    });
  };

  const extendedForm: FormContext<T> = {
    ...form,
    readOnly
  };

  return (
    <FormProvider {...extendedForm}>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={form.handleSubmit(onSubmit, onError)}
        {...slotProps?.formContainerProps}>
        {title && (
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
            size={{ xs: 12 }}>
            <Typography variant="h6">{title}</Typography>
            {showResetButton && !readOnly && (
              <IconButton
                onClick={handleResetFormClick}
                color="inherit"
                {...slotProps?.resetButtonProps}>
                <RestartAltOutlinedIcon />
              </IconButton>
            )}
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <FormErrorSummary />
        </Grid>

        {children}

        {!readOnly && (
          <Grid offset="auto">
            <Button
              type="submit"
              variant="contained"
              {...slotProps?.submitButtonProps}>
              {submitButtonText ?? slotProps?.submitButtonProps?.children ?? d.submit}
            </Button>
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
};

export { Form };
