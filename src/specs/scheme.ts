import * as z from 'zod';

export type TypeScheme_String = { type: 'string', format?: 'email' | 'url', regex?: string, min?: number, max?: number, enum?: string[] };
const TypeScheme_String: z.ZodType<TypeScheme_String> = z.object({
    type: z.enum(['string']),
    format: z.enum(['email', 'url']).optional(),
    regex: z.string().optional(),
    min: z.number().int().optional(),
    max: z.number().int().optional(),
    multiline: z.boolean(),
    enum: z.string().array(),
});

export type TypeScheme_Number = { type: 'number', min?: number, max?: number, decimals?: number };
const TypeScheme_Number: z.ZodType<TypeScheme_Number> = z.object({
    type: z.enum(['number']),
    max: z.number().optional(),
    min: z.number().optional(),
    decimals: z.number().int().min(0).optional(),
});

export type TypeScheme_Integer = { type: 'integer', min?: number, max?: number, step?: number };
const TypeScheme_Integer: z.ZodType<TypeScheme_Integer> = z.object({
    type: z.enum(['integer']),
    min: z.number().int().optional(),
    max: z.number().int().optional(),
    enum: z.number().array().optional(),
    step: z.number().int()
});

export type TypeScheme_Date = { type: 'date' };
const TypeScheme_Date: z.ZodType<TypeScheme_Date> = z.object({
    type: z.enum(['date']),
});

export type TypeScheme_Boolean = { type: 'bool' };
const TypeScheme_Boolean: z.ZodType<TypeScheme_Boolean> = z.object({
    type: z.enum(['bool']),
});

export type TypeScheme_Array = { type: 'array', typeScheme: TypeScheme };
const TypeScheme_Array: z.ZodType<TypeScheme_Array> = z.object({
    type: z.enum(['array']),
    typeScheme: z.lazy(() => TypeScheme),
});

export type TypeScheme_Object = { type: 'object', typeSchemes: { [key: string]: TypeScheme } };
const TypeScheme_Object: z.ZodType<TypeScheme_Object> = z.object({
    type: z.enum(['object']),
    typeSchemes: z.record(
        z.string(),
        z.lazy(() => TypeScheme),
    ),
});

export type TypeScheme_Binary = { type: 'binary', mimeType: string, gateway: string };
const TypeScheme_Binary: z.ZodType<TypeScheme_Binary> = z.object({
    type: z.enum(['binary']),
    mimeType: z.string(),
    gateway: z.string(),
});

export type TypeScheme_Entity = { type: 'entity', entity: string };
const TypeScheme_Entity: z.ZodType<TypeScheme_Entity> = z.object({
    type: z.enum(['entity']),
    entity: z.string(),
});

export const TypeScheme = TypeScheme_String
    .or(TypeScheme_Number)
    .or(TypeScheme_Integer)
    .or(TypeScheme_Date)
    .or(TypeScheme_Boolean)
    .or(TypeScheme_Array)
    .or(TypeScheme_Object)
    .or(TypeScheme_Binary)
    .or(TypeScheme_Entity);

export type TypeScheme = z.infer<typeof TypeScheme>;