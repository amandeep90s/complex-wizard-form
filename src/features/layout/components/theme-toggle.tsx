import { Menu } from '@/features/form/components/controllers/menu';
import { d } from '@/utils/dictionary';
import ContrastOutlined from '@mui/icons-material/ContrastOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

export interface Option {
  value: string | number;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

interface FormValues {
  selectedOption: string;
}

const menuOptions: Option[] = [
  {
    value: 'system',
    label: d.system,
    leftIcon: <ContrastOutlined />
  },
  {
    value: 'light',
    label: d.light,
    leftIcon: <WbSunnyOutlined />
  },
  {
    value: 'dark',
    label: d.dark,
    leftIcon: <DarkModeOutlined />
  }
];

const ThemeToggle = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      selectedOption: 'system'
    }
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Menu<FormValues>
          name="selectedOption"
          options={menuOptions}
          renderLabel={(option) => <Typography sx={{ paddingX: 1 }}>{option.label}</Typography>}></Menu>
      </form>
    </FormProvider>
  );
};

export { ThemeToggle };
