import { Readable } from "stream";
import { z } from "zod";
import { RpcRequestContext } from "./request-context";

export const UploadOptions = z.object({
    mimeType: z.string(),
    bucket: z.string(),
    binary: z.instanceof(Readable),
});

export const DownloadUrlOptions = z.object({
    bucket: z.string(),
    id: z.string()
});

export type UploadOptions = z.infer<typeof UploadOptions>;
export type DownloadUrlOptions = z.infer<typeof DownloadUrlOptions>;

export type UploadResponse = {
    id: string;
}

export type DownloadUrlResponse = {
    url: string;
}

export interface RpcBinaryHandler {
    upload(context: RpcRequestContext, options: UploadOptions): Promise<UploadResponse>;
    downloadUrl(context: RpcRequestContext, options: DownloadUrlOptions): Promise<DownloadUrlResponse>;
}