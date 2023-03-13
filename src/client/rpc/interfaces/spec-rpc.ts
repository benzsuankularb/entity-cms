import { EntityCmsSpec, GetSpecOptions } from "../../../backend/rpc/spec-rpc";

export interface SpecRpc {
    getSpec(options: GetSpecOptions): Promise<EntityCmsSpec>;
}