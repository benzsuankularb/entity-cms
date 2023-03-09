
export abstract class BinaryHandler {
    abstract upload(buffer: Buffer): Promise<void>;
    abstract download(): Promise<Buffer>;
}