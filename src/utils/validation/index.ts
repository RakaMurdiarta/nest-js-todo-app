import * as z from 'zod';

export const validate = <T>(schema: z.ZodSchema<T>, obj: any): T => {
  try {
    const parseRes = schema.parse(obj);

    return parseRes;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw error;
  }
};
