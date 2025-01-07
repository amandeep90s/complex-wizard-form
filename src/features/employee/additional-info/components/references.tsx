import { Chip, IconButton, Typography } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Autocomplete } from '@/features/form/components/controllers/autocomplete';
import { ErrorMessage } from '@/features/form/components/error-message';
import { Fragment } from 'react/jsx-runtime';
import Grid from '@mui/material/Grid2';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Schema } from '@/features/employee/additional-info/types/schema';
import { TextField } from '@/features/form/components/controllers/text-field';
import { d } from '@/utils/dictionary';
import { useFieldArray } from 'react-hook-form';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import { useRelationships } from '@/features/employee/additional-info/hooks/useQueries';

export const References = () => {
  const relationshipsQuery = useRelationships();

  const { control, readOnly } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references'
  });

  const handleAddClick = () => {
    append({
      name: '',
      relationship: '',
      contactInformation: ''
    });
  };

  const handleRemoveClick = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Grid
        size={{ xs: 12 }}
        sx={{ display: 'flex', alignItems: 'center' }}
        id="references">
        <Typography variant="subtitle2">{d.references}</Typography>
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
            <Chip label={`${d.reference} #${index + 1}`} />

            {!readOnly && (
              <IconButton
                color="error"
                onClick={() => handleRemoveClick(index)}>
                <RemoveCircleOutlineRoundedIcon />
              </IconButton>
            )}
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField<Schema>
              name={`references.${index}.name`}
              label={d.name}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Autocomplete<Schema>
              options={relationshipsQuery.data}
              name={`references.${index}.relationship`}
              textFieldProps={{ label: d.relationship }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField<Schema>
              name={`references.${index}.contactInformation`}
              label={d.contactInformation}
            />
          </Grid>
        </Fragment>
      ))}

      <Grid size={{ xs: 12 }}>
        <ErrorMessage<Schema> name="references" />
      </Grid>
    </>
  );
};
