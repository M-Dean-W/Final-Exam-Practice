import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IBooksRow extends RowDataPacket {
    id:number;
    category_id:number;
    title:string;
    author:string;
    price:number;
    created_at:Date;
}

export function getALLBooks() {
    return SelectQuery<IBooksRow>('SELECT * FROM Books;')
}

export function getOneBook(id:number) {
    return SelectQuery<IBooksRow>('SELECT * FROM Books WHERE books.id = ?;', [id])
}

export function insertBook(category_id:number, title:string, author:string, price:number) {
    return ModifyQuery('INSERT INTO Books (category_id, title, author, price) VALUE (?, ?, ?, ?);', [category_id, title, author, price])
}

export function updateBook(category_id:number, title:string, author:string, price:number, id:number) {
    return ModifyQuery('UPDATE Books SET category_id = ?, title = ?, author = ?, price = ? WHERE id = ?;', [category_id, title, author, price, id])
}

export function deleteBook(id:number) {
    return ModifyQuery('DELETE FROM Books WHERE id = ?;', [id])
}