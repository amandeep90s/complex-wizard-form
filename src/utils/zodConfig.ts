import { z } from 'zod';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const handleInvalidString = (issue: z.ZodInvalidStringIssue, ctx: z.ErrorMapCtx) => {
  let message: string;
  if (issue.validation === 'email') {
    message = ctx.data === '' ? 'Required' : 'Invalid email';
  } else {
    message = 'Invalid input';
  }
  return message;
};

const handleTooBig = (issue: z.ZodTooBigIssue, ctx: z.ErrorMapCtx) => {
  let message: string;
  if (issue.type === 'date') {
    if (
      issue.maximum &&
      typeof issue.maximum === 'object' &&
      (issue.maximum as Date).getTime() === new Date().setHours(0, 0, 0, 0)
    ) {
      message = 'Date cannot be in the future';
    } else {
      const maxDate = new Date(issue.maximum as number);
      message = `Date must be before ${formatDate(maxDate)}`;
    }
  } else if (issue.type === 'string') {
    message = `Maximum ${issue.maximum} characters allowed`;
  } else {
    message = ctx.defaultError;
  }
  return message;
};

const handleTooSmall = (issue: z.ZodTooSmallIssue) => {
  let message: string;
  if (issue.type === 'date') {
    const minDate = new Date(issue.minimum as number);
    message = `Date must be after ${formatDate(minDate)}`;
  } else if (issue.minimum === 1) {
    message = 'Required';
  } else if (issue.type === 'array') {
    message = 'At least one item is required';
  } else {
    message = `Minimum ${issue.minimum} characters`;
  }
  return message;
};

const handleInvalidType = (issue: z.ZodInvalidTypeIssue): string => {
  let message: string;
  if (['undefined', 'null'].includes(issue.received)) {
    message = 'Required';
  } else if (issue.expected === 'date') {
    message = 'Please enter a valid date';
  } else {
    message = 'Invalid input';
  }
  return message;
};

const getErrorMessage = (issue: z.ZodIssueOptionalMessage, ctx: z.ErrorMapCtx) => {
  let message: string;

  switch (issue.code) {
    case 'invalid_type':
      message = handleInvalidType(issue);
      break;

    case 'too_small':
      message = handleTooSmall(issue);
      break;

    case 'too_big':
      message = handleTooBig(issue, ctx);
      break;

    case 'invalid_date':
      message = 'Please enter a valid date';
      break;

    case 'invalid_string':
      message = handleInvalidString(issue, ctx);
      break;

    default:
      message = ctx.defaultError;
      break;
  }
  return message;
};

const setupZodErrors = () => {
  z.setErrorMap((issue, ctx) => {
    const message = getErrorMessage(issue, ctx);
    return { message };
  });
};

export { setupZodErrors };
