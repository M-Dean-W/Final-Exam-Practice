import type { RowDataPacket } from "mysql2";
import { SelectQ, ModifyQ } from "../queryUtils";

export interface IUsersRow extends RowDataPacket {
    id:number;
    email:string;
    created_at:Date;
}

export function findUser(column:string, value:string){
    return SelectQ<IUsersRow>('SELECT * FROM Users WHERE ??=?',[column,value])
}

export function registerUser(newUser: {email:string, password:string}){
    return ModifyQ('INSERT INTO users SET ?', newUser )
}