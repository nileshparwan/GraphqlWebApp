export interface Iresp<T> {
    data: Array<T>;
    status: number;
    statusText: string;
}

export interface Iuser {
    firstName: string;
    lastName: string;
    age: number;
}