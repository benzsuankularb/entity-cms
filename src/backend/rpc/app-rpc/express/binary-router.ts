import { FileInfo } from "busboy";
import busboy from "connect-busboy";
import express from "express";
import { Readable } from "stream";

const router = express.Router();

router.use(busboy());

router.use('upload/:bucket', (req, res) => {
    const bucket = req.params.bucket;
    const binaryHandler = req.appRpc.binaryHandler;
    req.pipe(req.busboy);
    req.busboy.on('file', async (name: string, stream: Readable, info: FileInfo) => {
        if (name != 'file') {
            return;
        }
        
        const [id] = await binaryHandler.upload({
            bucket: bucket,
            mimeType: info.mimeType,
            binary: stream,
        });

        stream.on('close', () => {
            console.log("Upload Finished of " + info.filename);
            res.status(204).send({ id });
        });
    });
});

router.use('download/:bucket/:id', async (req, res) => {
    const bucket = req.params.bucket;
    const id = req.params.id;
    const binaryHandler = req.appRpc.binaryHandler;
    const [ url ] = await binaryHandler.downloadUrl({ bucket, id });
    if (!url) {
        res.status(404).send({ error: 'not found' }); //TODO design resp body
        return;
    }
    res.redirect(url);
});

export const expressBinaryRouter = router;