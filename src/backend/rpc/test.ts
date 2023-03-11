import { z } from "zod";

const zz = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
});

type Flat<T> = { [K in keyof T]: T[K] }

type zz = z.infer<typeof zz>
// type x = Flat<typeof zz>;