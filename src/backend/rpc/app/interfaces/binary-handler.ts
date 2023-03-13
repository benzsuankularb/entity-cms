import { Readable } from "stream";
import { z } from "zod";

const UploadOptions = z.object({
    authentication: z.string().optional(),
    mimeType: z.string(),
    bucket: z.string(),
    binary: z.instanceof(Readable),
});

const DownloadURLOptions = z.object({
    authentication: z.string().optional(),
    bucket: z.string(),
    id: z.string()
});

type UploadOptions = z.infer<typeof UploadOptions>;

type DownloadURLOptions = z.infer<typeof DownloadURLOptions>;

export interface RpcBinaryHandler {
    upload(options: UploadOptions): Promise<[id: string]>;
    downloadUrl(options: DownloadURLOptions): Promise<[url: string | null]>;
}