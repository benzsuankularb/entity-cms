import { z } from "zod";
import type { UploadResponse } from "../../../backend/rpc/app-rpc";

export const UploadOptions = z.object({
    file: z.instanceof(File),
    bucket: z.string(),
});

export const DownloadOptions = z.object({
    bucket: z.string(),
    id: z.string(),
});

export type UploadOptions = z.infer<typeof UploadOptions>;
export type DownloadOptions = z.infer<typeof DownloadOptions>;

export interface BinaryRpc {
    upload(options: UploadOptions): Promise<UploadResponse>;
    download(options: DownloadOptions): Promise<void>;
}