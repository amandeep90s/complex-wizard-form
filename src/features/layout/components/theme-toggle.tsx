import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Menu } from '@/features/form/components/controllers/menu';
import Typography from '@mui/material/Typography';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { d } from '@/utils/dictionary';
import { useColorScheme } from '@mui/material';

export interface Option {
  value: string | number;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

interface FormValues {
  selectedOption: ThemeModes;
}

type ThemeModes = 'light' | 'dark' | 'system';

const menuOptions: Option[] = [
  {
    value: 'system',
    label: d.system,
    leftIcon: <ContrastOutlinedIcon />
  },
  {
    value: 'light',
    label: d.light,
    leftIcon: <WbSunnyOutlinedIcon />
  },
  {
    value: 'dark',
    label: d.dark,
    leftIcon: <DarkModeOutlinedIcon />
  }
];

const ThemeToggle = () => {
  const { setMode } = useColorScheme();
  const methods = useForm<FormValues>({
    defaultValues: {
      selectedOption: 'system'
    }
  });

  const selectedOption = methods.watch('selectedOption');

  useEffect(() => {
    if (selectedOption === 'system') {
      setMode('system');
    } else {
      setMode(selectedOption);
    }
  }, [selectedOption, setMode]);

  return (
    <FormProvider {...methods}>
      <form>
        <Menu<FormValues>
          name="selectedOption"
          options={menuOptions}
          renderLabel={(option) => <Typography sx={{ paddingX: 1 }}>{option.label}</Typography>}
        />
      </form>
    </FormProvider>
  );
};

export { ThemeToggle };
