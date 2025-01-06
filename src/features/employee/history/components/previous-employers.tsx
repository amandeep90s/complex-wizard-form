import { TextField } from '@/features/form/components/controllers/text-field';
import { ErrorMessage } from '@/features/form/components/error-message';

import { Schema } from '@/features/employee/history/types/schema';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import { d } from '@/utils/dictionary';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Chip, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFieldArray } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';

const PreviousEmployers = () => {
  const { control, readOnly } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'previousEmployers'
  });

  const handleAddClick = () => {
    append({ jobTitle: '', employerName: '', responsibilities: '' });
  };

  const handleRemoveClick = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Grid
        sx={{ display: 'flex', alignItems: 'center' }}
        size={12}
        id="previousEmployers">
        <Typography variant="subtitle2">{d.previousEmployers}:</Typography>
        {!readOnly && (
          <IconButton
            onClick={handleAddClick}
            color="success">
            <AddCircleRoundedIcon />
          </IconButton>
        )}
      </Grid>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Grid
            sx={{ display: 'flex', alignItems: 'center' }}
            size={{ xs: 12 }}>
            <Chip
              label={`${d.employer} #${index + 1}:`}
              size="small"
              color="secondary"
            />
            {!readOnly && (
              <IconButton
                color="error"
                onClick={() => handleRemoveClick(index)}>
                <RemoveCircleOutlineRoundedIcon />
              </IconButton>
            )}
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField<Schema>
              name={`previousEmployers.${index}.employerName`}
              label={d.employerName}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField<Schema>
              name={`previousEmployers.${index}.jobTitle`}
              label={d.jobTitle}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField<Schema>
              name={`previousEmployers.${index}.responsibilities`}
              label={d.responsibilities}
              multiline
              maxRows={4}
            />
          </Grid>
        </Fragment>
      ))}
      <Grid size={{ xs: 12 }}>
        <ErrorMessage<Schema> name="previousEmployers" />
      </Grid>
    </>
  );
};

export { PreviousEmployers };
