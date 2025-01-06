import { useFormContext } from '@/features/form/hooks/useFormContext';
import { Slider as MuiSlider, SliderProps as MuiSliderProps, SxProps, Theme, Typography } from '@mui/material';
import { forwardRef, ReactElement, Ref } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';

type SliderProps<T extends FieldValues> = Omit<MuiSliderProps, 'name' | 'value' | 'onChange'> & {
  name: Path<T>;
  label?: string;
  unit?: string;
};

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toString();
};

export const Slider = forwardRef(
  <T extends FieldValues>(
    { name, label, min = 10, max = 100, sx, unit, ...sliderProps }: SliderProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const { control, readOnly } = useFormContext();

    const defaultSx: SxProps<Theme> = {
      width: 1,
      ...sx
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {label && <Typography gutterBottom>{label}</Typography>}
            <MuiSlider
              {...sliderProps}
              {...field}
              min={min}
              max={max}
              sx={defaultSx}
              disabled={readOnly}
              value={(field.value as number) ?? min}
              ref={ref}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${unit}${formatNumber(value)}`}
            />
          </>
        )}
      />
    );
  }
) as <T extends FieldValues>(props: SliderProps<T> & { ref?: Ref<HTMLInputElement> }) => ReactElement;
