import { Schema, defaultValues, schema } from '@/features/employee/additional-info/types/schema';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { DatePicker } from '@/features/form/components/controllers/date-picker';
import { Form } from '@/features/form/components/form';
import Grid from '@mui/material/Grid2';
import { References } from '@/features/employee/additional-info/components/references';
import { Slider } from '@/features/form/components/controllers/slider';
import { SubmitHandler } from 'react-hook-form';
import { TextField } from '@/features/form/components/controllers/text-field';
import { d } from '@/utils/dictionary';
import { startOfToday } from 'date-fns';
import { useNavigate } from 'react-router';
import { useStore } from '@/features/employee/additional-info/hooks/useStore';

const Page = () => {
  return (
    <>
      <Grid size={{ xs: 6 }}>
        <TextField<Schema>
          name="portfolioLink"
          label={d.portfolioLink}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <DatePicker<Schema>
          name="availabilityToStart"
          label={d.availabilityToStart}
          minDate={startOfToday()}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Slider<Schema>
          name="salaryExpectations"
          label={d.salaryExpectations}
          min={30000}
          max={200000}
          unit="$"
          step={10000}
          valueLabelDisplay="on"
        />
      </Grid>

      <References />
    </>
  );
};

type ProviderProps = {
  readOnly?: boolean;
};
const Provider = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();

  const { formData, updateFormData } = useStore();

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate('/employee/review');
  };

  return (
    <Form
      submitButtonText={d.saveAndContinue}
      slotProps={{
        submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> }
      }}
      schema={schema}
      values={formData}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      readOnly={readOnly}
      title={d.additionalInfo}>
      <Page />
    </Form>
  );
};

export { Provider as EmployeeAdditionalInfo };
