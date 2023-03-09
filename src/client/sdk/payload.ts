import { TypeScheme } from "../../specs";
import { EmbededEntity } from "./common";

export interface Payloads {
    fields: PayloadField_Unknown[];
    validated: boolean;
}

export enum DataType {
    string = "string",
    number = "number",
    integer = "integer",
    date = "date",
    boolean = "boolean",
    entity = "entity",
    binary = "binary",
}

type DataType_Write = {
    string: string;
    number: number;
    integer: number;
    date: number;
    boolean: boolean;
    entity: string;
    binary: FormData;
}

type DataType_Read = {
    string: string;
    number: number;
    integer: number;
    date: number;
    boolean: boolean;
    entity: EmbededEntity;
    binary: void;
}

type PayloadField_Unknown = PayloadField<unknown, unknown>;

export abstract class PayloadField<TWrite, TRead> {
    onUpdated?: () => void | null;
    readonly declare id: string;
    declare typeScheme: TypeScheme;
    declare name: string;
    declare description?: string;
    declare unit?: string;
    declare placeHolder?: string;
    declare readOnly: boolean;
    declare hidden: boolean;
    declare validated: boolean;
    declare required: boolean;
    declare suggestion?: 'full' | 'partial';
    
    abstract suggest(): Promise<TRead[]>;
    abstract setValue(val: TWrite): void;
    abstract value(): TRead;

    as<T extends DataType>(): PayloadField<DataType_Write[T], DataType_Read[T]> {
        return this as PayloadField<DataType_Write[T], DataType_Read[T]>;
    }
    
    asArray<T extends DataType>(): PayloadField_Array<T> {
        return this as PayloadField_Array<T>;
    }
}


export class PayloadField_String extends PayloadField<string, string> {
    suggest(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: string): void {
        throw new Error("Method not implemented.");
    }
    value(): string {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Number extends PayloadField<number, number> {
    suggest(): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: number): void {
        throw new Error("Method not implemented.");
    }
    value(): number {
        throw new Error("Method not implemented.");
    }
}
export class PayloadField_Integer extends PayloadField<number, number> {
    suggest(): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: number): void {
        throw new Error("Method not implemented.");
    }
    value(): number {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Date extends PayloadField<number, number> {
    suggest(): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: number): void {
        throw new Error("Method not implemented.");
    }
    value(): number {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Binary extends PayloadField<FormData, void> {
    declare uploading: boolean;
    suggest(): Promise<void[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: FormData): void {
        throw new Error("Method not implemented.");
    }
    value(): void {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Boolean extends PayloadField<boolean, boolean> {
    suggest(): Promise<boolean[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: boolean): void {
        throw new Error("Method not implemented.");
    }
    value(): boolean {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Entity extends PayloadField<string, EmbededEntity> {
    suggest(): Promise<EmbededEntity[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: string): void {
        throw new Error("Method not implemented.");
    }
    value(): EmbededEntity {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Array<T extends keyof DataType_Read> extends PayloadField<Array<DataType_Write[T]>, Array<DataType_Read[T]>> {
    suggest(): Promise<DataType_Read[T][][]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: DataType_Write[T][]): void {
        throw new Error("Method not implemented.");
    }
    value(): DataType_Read[T][] {
        throw new Error("Method not implemented.");
    }
}