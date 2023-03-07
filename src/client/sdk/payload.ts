import { TypeScheme } from "../../specs";
import { EmbededEntity } from "./models";

export interface Payloads {
    fields: PayloadField_Any[];
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

type FieldWriteType = {
    string: string;
    number: number;
    integer: number;
    date: number;
    boolean: boolean;
    entity: string;
    binary: FormData;
}

type FieldReadType = {
    string: string;
    number: number;
    integer: number;
    date: number;
    boolean: boolean;
    entity: EmbededEntity;
    binary: void;
}

type PayloadField_Any = PayloadField<unknown, unknown>;

export abstract class PayloadField<TWrite, TRead> {
    onUpdated?: () => void | null;
    declare id: string;
    declare typeScheme: TypeScheme;
    declare name: string;
    declare description?: string;
    declare unit?: string;
    declare readOnly: boolean;
    declare hidden: boolean;
    declare validated: boolean;
    declare required: boolean;
    declare suggestion?: 'full' | 'partial';
    
    abstract suggest(): Promise<TRead[]>;
    abstract setValue(val: TWrite): Promise<void>;
    abstract value(): Promise<TRead>;

    as<T extends DataType>(): PayloadField<FieldWriteType[T], FieldReadType[T]> {
        return this as PayloadField<FieldWriteType[T], FieldReadType[T]>;
    }
    
    asArray<T extends DataType>(): PayloadField_Array<T> {
        return this as PayloadField_Array<T>;
    }
}


export class PayloadField_String extends PayloadField<string, string> {
    suggest(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<string> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Number extends PayloadField<number, number> {
    suggest(): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
export class PayloadField_Integer extends PayloadField<number, number> {
    suggest(): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Date extends PayloadField<number, number> {
    suggest(): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Binary extends PayloadField<FormData, void> {
    suggest(): Promise<void[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: FormData): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Boolean extends PayloadField<boolean, boolean> {
    suggest(): Promise<boolean[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Entity extends PayloadField<string, EmbededEntity> {
    suggest(): Promise<EmbededEntity[]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<EmbededEntity> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadField_Array<T extends keyof FieldReadType> extends PayloadField<Array<FieldWriteType[T]>, Array<FieldReadType[T]>> {
    suggest(): Promise<FieldReadType[T][][]> {
        throw new Error("Method not implemented.");
    }
    setValue(val: FieldWriteType[T][]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    value(): Promise<FieldReadType[T][]> {
        throw new Error("Method not implemented.");
    }
}

