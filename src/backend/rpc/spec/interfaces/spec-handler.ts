import { z } from "zod";
import * as Spec from "../../../../specs";

export type ECMSSpec = Spec.Spec_Root;

export const GetSpecOptions = z.object({
    authentication: z.string().optional(),
    id: z.string().optional()
});

export type GetSpecOptions = z.infer<typeof GetSpecOptions>;

export interface RpcSpecHandler {
    getSpec(options: GetSpecOptions): Promise<ECMSSpec>;
}