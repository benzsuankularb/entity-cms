import { z } from "zod";
import * as Spec from "../../../../common/specs";
import { RpcRequestContext } from "./request-context";

export type EntityCmsSpec = Spec.Spec_Root;

export const GetSpecOptions = z.object({
    id: z.string().optional()
});

export type GetSpecOptions = z.infer<typeof GetSpecOptions>;

export interface RpcSpecHandler {
    getSpec(requestContext: RpcRequestContext, options: GetSpecOptions): Promise<EntityCmsSpec>;
}