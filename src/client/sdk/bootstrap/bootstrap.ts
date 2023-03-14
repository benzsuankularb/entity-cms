import { RpcClient } from "../../rpc/client";
import { SpecRpc } from "../../rpc/interfaces";
import { Application } from "../application/application";

export interface BootstrapOptions {
    url: string;
}

export class Bootstrap {

    private readonly _rpcClient: RpcClient;
    private readonly _rpc: SpecRpc;
    private _application?: Application;

    constructor(options: BootstrapOptions) {
        this._rpcClient = new RpcClient();
        this._rpc = this._rpcClient.spec(options.url)
    }

    getApplication(): Promise<Application> {
        if (!this._application) {
            // fetch
        }
        throw '';
    }
}