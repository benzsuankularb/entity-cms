/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { Spec_WritePayload, TypeScheme } from "../specs";

export type ValidatePayloadsFunction = (payloads: { [id: string]: unknown }) => [valid: boolean, invalidPayloads: string[]];

export function createPayloadsValidator(payloadsSpec: Spec_WritePayload[]): ValidatePayloadsFunction {
    const payloadField_TypeValidators: { [id: string]: (value: any) => boolean } = {};
    payloadsSpec.forEach(spec => {
        payloadField_TypeValidators[spec.id] = createTypeValidator(spec.typeScheme)
    });
    
    const validateField = (payloads: {[id: string]: unknown}, id: string) => {
        const typeValidator = payloadField_TypeValidators[id];
        if (!typeValidator) {
            return false;
        }
        
        const value = payloads[id];
        if (!typeValidator(value)) {
            return false;
        }
        
        // FUTURE: cross field validation.

        return true;
    }

    return (payloads: {[id: string]: unknown}) => {
        const invalidPayloads = Object.keys(payloads).filter(payloadId => !validateField(payloads, payloadId));
        return [
            invalidPayloads.length === 0,
            invalidPayloads
        ];
    };
}

function createTypeValidator(typeScheme: TypeScheme) {
    const zod = createZod(typeScheme);
    return (value: any) => {
        const { success } = zod.safeParse(value);
        return success;
    };
}

function createZod(typeScheme: TypeScheme): z.ZodType {
    if (typeScheme.type === 'string') {
        const { enum: _enum, format, max, min, regex } = typeScheme;
        if (_enum) {
            return z.enum(_enum as [string, ...string[]]);
        }
        let _zod = z.string();
        if (format === 'url') { _zod = _zod.url(); }
        if (format === 'email') { _zod = _zod.email(); }
        if (min) { _zod = _zod.min(min); }
        if (max) { _zod = _zod.max(max); }
        if (regex) { _zod = _zod.regex(new RegExp(regex)); }
        return _zod;
    }
    
    if (typeScheme.type === 'number') {
        const { decimals, max, min } = typeScheme;
        let _zod = z.number();
        if (min) { _zod = _zod.min(min); }
        if (max) { _zod = _zod.max(max); }
        if (decimals) { _zod = _zod.multipleOf(1 / (10 ** decimals)); }
        return _zod;
    }
    
    if (typeScheme.type === 'integer') {
        const { max, min, step } = typeScheme;
        let _zod = z.number();
        if (min) { _zod = _zod.min(min); }
        if (max) { _zod = _zod.max(max); }
        if (step) { _zod = _zod.multipleOf(step); }
        return _zod;
    }
    
    if (typeScheme.type === 'date') {
        return z.number();
    }
    
    if (typeScheme.type === 'boolean') {
        return z.boolean();
    }
    
    if (typeScheme.type === 'binary') {
        return z.string();
    }
    
    if (typeScheme.type === 'array') {
        return createZod(typeScheme.typeScheme).array();
    }
    
    if (typeScheme.type === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const object: any = {}
        const keys = Object.keys(typeScheme.typeSchemes);
        for (const key of keys) {
            const scheme = typeScheme.typeSchemes[key];
            object[key] = createZod(scheme)
        }
        return z.object(object);
    }
    
    if (typeScheme.type === 'entity') {
        return z.string();
    }
    
    throw `unable to create zod from TypeScheme`;
}
