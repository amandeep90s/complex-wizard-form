import { regex } from '@/utils/regex';
import { startOfToday } from 'date-fns';
import validator from 'validator';
import { z } from 'zod';

const referencesSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().min(1),
  contactInformation: z
    .string()
    .min(1)
    .refine((value) => validator.isEmail(value) || validator.isMobilePhone(value))
});

const schema = z.object({
  portfolioLink: z.union([z.string().regex(regex.link), z.literal('')]),
  availabilityToStart: z.coerce.date().refine((date) => date >= startOfToday()),
  salaryExpectations: z.number().min(3000).max(200000),
  references: z.array(referencesSchema).min(1)
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  availabilityToStart: new Date(),
  references: [],
  salaryExpectations: 100000,
  portfolioLink: ''
};

export { defaultValues, schema as employeeAdditionalInfoSchema, schema, type Schema };
