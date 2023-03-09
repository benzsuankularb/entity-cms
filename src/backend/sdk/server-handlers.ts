import { BinaryHandler } from "./binary-handler";
import { EntityEndpointHandler } from "./endpoint-handler";


export class ServerHandlers {
    getEntityEndpointHandler<T>(id: string): EntityEndpointHandler<T> | null {
        throw '';
    }

    getBinaryHandler(id: string): BinaryHandler | null {
        throw '';
    }
}
