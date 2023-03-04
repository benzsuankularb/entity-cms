import * as z from 'zod';
import { TypeScheme } from './type_scheme';

const PayloadScheme_Field = z.object({
    type: z.enum(['field']),
    name: z.string(),
    uint: z.string().optional(),
    description: z.string().optional(),
    readOnly: z.boolean().optional(),
    required: z.boolean().optional(),
    typeScheme: TypeScheme,
});

const PayloadScheme_Conditional = z.object({
    type: z.enum(['conditional']),
})

export const PayloadScheme = PayloadScheme_Field.or(PayloadScheme_Conditional);

export type PayloadScheme_Field = z.infer<typeof PayloadScheme_Field>;
export type PayloadScheme_Conditional = z.infer<typeof PayloadScheme_Conditional>;
export type PayloadScheme = z.infer<typeof PayloadScheme>;