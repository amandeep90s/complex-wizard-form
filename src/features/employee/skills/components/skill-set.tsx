import { useSkillCategories, useSkills, useSkillSubcategories } from '@/features/employee/skills/hooks/useQueries';
import { Schema } from '@/features/employee/skills/types/schema';
import { Autocomplete } from '@/features/form/components/controllers/autocomplete';
import { TextField } from '@/features/form/components/controllers/text-field';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import { d } from '@/utils/dictionary';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Chip, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { UseFieldArrayRemove, useWatch } from 'react-hook-form';

type SkillSetProps = {
  fieldIndex: number;
  fieldRemove: UseFieldArrayRemove;
};

export const SkillSet = ({ fieldIndex, fieldRemove }: SkillSetProps) => {
  const { control, setValue, readOnly } = useFormContext<Schema>();

  const category = useWatch({
    control,
    name: `skillSets.${fieldIndex}.category`
  });

  const subCategory = useWatch({
    control,
    name: `skillSets.${fieldIndex}.subCategory`
  });

  const skillCategoriesQuery = useSkillCategories();
  const skillSubCategoriesQuery = useSkillSubcategories(category);
  const skillsQuery = useSkills(subCategory);

  const handleRemoveClick = () => {
    fieldRemove(fieldIndex);
  };

  const handleCategoryChange = () => {
    setValue(`skillSets.${fieldIndex}.subCategory`, '');
    setValue(`skillSets.${fieldIndex}.skills`, []);
  };

  const handleSubCategoryChange = () => {
    setValue(`skillSets.${fieldIndex}.skills`, []);
  };

  return (
    <>
      <Grid
        size={{ xs: 12 }}
        sx={{ display: 'flex', alignItems: 'center' }}>
        <Chip
          label={`${d.skill} #${fieldIndex + 1}`}
          size="small"
          color="secondary"
        />
        {!readOnly && (
          <IconButton
            color="error"
            onClick={handleRemoveClick}>
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
        )}
      </Grid>
      <Grid size={{ xs: 4 }}>
        <Autocomplete<Schema>
          name={`skillSets.${fieldIndex}.category`}
          options={skillCategoriesQuery.data}
          textFieldProps={{ label: d.category }}
          onOptionSelect={handleCategoryChange}
        />
      </Grid>
      <Grid size={{ xs: 4 }}>
        {!!category && (
          <Autocomplete<Schema>
            name={`skillSets.${fieldIndex}.subCategory`}
            options={skillSubCategoriesQuery.data}
            textFieldProps={{ label: d.subCategory }}
            onOptionSelect={handleSubCategoryChange}
          />
        )}
      </Grid>
      <Grid size={{ xs: 4 }}>
        {!!subCategory && (
          <Autocomplete<Schema, true>
            name={`skillSets.${fieldIndex}.skills`}
            options={skillsQuery.data}
            textFieldProps={{ label: d.skills }}
            multiple
          />
        )}
      </Grid>
      <Grid size={{ xs: 4 }}>
        <TextField<Schema>
          name={`skillSets.${fieldIndex}.yearsOfExperience`}
          label={d.yearsOfExperience}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 4 }}>
        <TextField<Schema>
          name={`skillSets.${fieldIndex}.description`}
          label={d.description}
          multiline
          maxRows={4}
        />
      </Grid>
    </>
  );
};
