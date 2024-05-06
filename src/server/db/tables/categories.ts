import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface ICategoriesRow extends RowDataPacket {
    id:number;
    name:string;
}

export function getALLCategories() {
    return SelectQuery<ICategoriesRow>('SELECT * FROM Categories;')
}

export function getOneCategory(id:number) {
    return SelectQuery<ICategoriesRow>('SELECT * FROM Categories WHERE id = ?;', [id])
}

export function insertCategory(name:string) {
    return ModifyQuery('INSERT INTO Categories (name) VALUE (?);', [name])
}

export function updateCategory(name:string, id:number) {
    return ModifyQuery('UPDATE Categories SET name = ? WHERE id = ?;', [name, id])
}