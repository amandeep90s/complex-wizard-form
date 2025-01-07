import { SkillSet } from '@/features/employee/skills/components/skill-set';
import { Schema } from '@/features/employee/skills/types/schema';
import { ErrorMessage } from '@/features/form/components/error-message';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import { d } from '@/utils/dictionary';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFieldArray } from 'react-hook-form';

export const SkillSets = () => {
  const { control, readOnly } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skillSets'
  });

  const handleAddClick = () => {
    append({
      category: '',
      subCategory: '',
      skills: [],
      description: '',
      yearsOfExperience: 2
    });
  };

  return (
    <>
      <Grid
        sx={{ display: 'flex', alignItems: 'center' }}
        size={12}
        id="skillSets">
        <Typography variant="subtitle2">{d.skillSets}</Typography>
        {!readOnly && (
          <IconButton
            onClick={handleAddClick}
            color="success">
            <AddCircleRoundedIcon />
          </IconButton>
        )}
      </Grid>

      {fields.map((field, index) => (
        <SkillSet
          fieldIndex={index}
          key={field.id}
          fieldRemove={remove}
        />
      ))}

      <Grid size={{ xs: 12 }}>
        <ErrorMessage<Schema> name="skillSets" />
      </Grid>
    </>
  );
};
