export interface Account {
    id: number;
    name: string;
    username: string;
    password: string;
    admin: boolean;
    active: boolean;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    created: Date;
    createdBy: string;
    active: boolean;
}