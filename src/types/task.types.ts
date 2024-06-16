import type { IBase } from "./root.types"

export enum EnumTaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ITaskResponse extends IBase {
    id: string
    createdAt?: string
    updatedAt?: string
    name: string
    priority: EnumTaskPriority
    isCompleted: boolean
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>