import { ReadStream } from "fs";
import { z } from "zod";

const UploadOptions = z.object({
    authentication: z.string().optional(),
    mimeType: z.string(),
    bucket: z.string().optional(),
});

const DownloadURLOptions = z.object({
    authentication: z.string().optional(),
    bucket: z.string().optional(),
});

type UploadOptions = z.infer<typeof UploadOptions>;

type DownloadURLOptions = z.infer<typeof DownloadURLOptions>;

export interface RpcBinaryHandler {
    upload(readStream: ReadStream, options: UploadOptions): Promise<{
        id: string;
    }>;
    
    downloadUrl(options: DownloadURLOptions): Promise<{
        url: string;
    }>;
}