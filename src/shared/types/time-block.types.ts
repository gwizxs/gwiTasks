import { IBase } from "./root.types"

export interface ITimeBlockResponse extends IBase{
    id: string
    createdAt?: string
    updatedAt?: string
    name: string
    color?: string
    duration: number
    order: number
}

export type TypeTimeBlockFormState = Partial<
Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
>