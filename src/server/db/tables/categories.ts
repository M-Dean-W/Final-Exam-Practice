import type { RowDataPacket } from "mysql2";
import { SelectQ } from "../queryUtils";

export interface ICategoriesRow extends RowDataPacket {
    id:number;
    name:string;
}

export function getAllCategories(){
    return SelectQ<ICategoriesRow>('SELECT * FROM Categories')
}

export function getOneCategory(id:number){
    return SelectQ<ICategoriesRow>('SELECT * FROM Categories WHERE book.id = ?', [id])
}