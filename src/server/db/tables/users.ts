import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IUsersRow extends RowDataPacket {
    id:number;
    email:string;
    created_at:Date;
}

export function getALLUsers() {
    return SelectQuery<IUsersRow>('SELECT * FROM users;')
}

export function getOneUser(id:number) {
    return SelectQuery<IUsersRow>('SELECT * FROM users WHERE id = ?;', [id])
}

export function findUser(column:string, value: string) {
    return SelectQuery<IUsersRow>('SELECT * FROM users WHERE ?? = ?',[column, value])
}

export function registerUser(newUser: {email:string, password: string}) {
    return ModifyQuery('INSERT INTO users SET ?;', newUser)
}