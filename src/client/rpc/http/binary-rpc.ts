import type { UploadResponse } from "../../../backend/rpc/app-rpc";
import { RpcClientContext } from "../context";
import { BinaryRpc, DownloadOptions, UploadOptions } from "../interfaces";

export interface HttpBinaryRpcOptions {
    context: RpcClientContext;
    url: string;
}

export class HttpBinaryRpc implements BinaryRpc {
    
    private readonly _url: string;
    private readonly _context: RpcClientContext;
    
    constructor(options: HttpBinaryRpcOptions) {
        this._context = options.context;
        this._url = options.url;
    }
    
    async upload(options: UploadOptions): Promise<UploadResponse> {
        const url = `${this._url}/upload/${options.bucket}`;
        //TODO request context auth
        
        const formData  = new FormData();
        formData.append('file', options.file);
            
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            return response.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async download(options: DownloadOptions): Promise<void> {
        const url = `${this._url}/download/${options.bucket}/${options.id}`;
        //TODO request context auth
        
        try {
            const response = await fetch(url);
            const blob = await response.blob()
            const file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}