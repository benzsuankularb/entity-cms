/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import * as spec from "../specs";
import { TypeScheme } from "../specs";

export type ValidatePayloadsFunction = (payloads: { [id: string]: unknown }) => [invalidIds: string[]];

export function createPayloadsValidator(payloadsSpec: spec.Spec_Payloads): ValidatePayloadsFunction {
    const typeValidators: { [id: string]: (value: any) => boolean } = {};
    payloadsSpec.forEach(spec => typeValidators[spec.id] = createTypeValidator(spec.typeScheme));
    
    const validateField = (payloads: {[id: string]: unknown}, id: string) => {
        const typeValidator = typeValidators[id];
        if (!typeValidator) {
            return false;
        }
        
        const value = payloads[id];
        if (!typeValidator(value)) {
            return false;
        }
        
        return true;
    }

    return (payloads: {[id: string]: unknown}) => {
        const invalidIds = Object.keys(payloads).filter(payloadId => !validateField(payloads, payloadId));
        return [invalidIds];
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
    } else if (typeScheme.type === 'number') {
        const { decimals, max, min } = typeScheme;
        let _zod = z.number();
        if (min) { _zod = _zod.min(min); }
        if (max) { _zod = _zod.max(max); }
        if (decimals) { _zod = _zod.multipleOf(1 / (10 ** decimals)); }
        return _zod;
    } else if (typeScheme.type === 'integer') {
        const { max, min, step } = typeScheme;
        let _zod = z.number();
        if (min) { _zod = _zod.min(min); }
        if (max) { _zod = _zod.max(max); }
        if (step) { _zod = _zod.multipleOf(step); }
        return _zod;
    } else if (typeScheme.type === 'date') {
        return z.number();
    } else if (typeScheme.type === 'boolean') {
        return z.boolean();
    } else if (typeScheme.type === 'binary') {
        return z.string();
    } else if (typeScheme.type === 'array') {
        return createZod(typeScheme.typeScheme).array();
    } else if (typeScheme.type === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const object: any = {}
        const keys = Object.keys(typeScheme.typeSchemes);
        for (const key of keys) {
            const scheme = typeScheme.typeSchemes[key];
            object[key] = createZod(scheme)
        }
        return z.object(object);
    } else if (typeScheme.type === 'entity') {
        return z.string();
    }
    throw `unable to create zod from TypeScheme`;
}
