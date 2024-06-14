// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorCatch = (error: any): string => {
    const message = error?.responce?.data?.message

    return message
    ? typeof error.responce.date.message === 'object'
    ? message[0]
    : message
    : error.message
}