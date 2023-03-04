import * as z from "zod";
import { TypeScheme } from "../specs";

export class ZodPayloadParser {
    parse(zod: z.ZodObject<any>): TypeScheme[] {
        return [];
    }

    toZod(typeSchemes: Payload): z.ZodObject<any> {
        
        return z.object({});
    }
}