import type { RowDataPacket } from "mysql2";
import { SelectQ, ModifyQ } from "../queryUtils";

export interface IBooksRow extends RowDataPacket {
    id:number;
    category_id:number;
    title: string;
    author:string;
    price:number;
    created_at:Date;
}

export function getAllBooks(){
    return SelectQ<IBooksRow>('SELECT * FROM Books')
}

export function getOneBook(id:number){
    return SelectQ<IBooksRow>('SELECT * FROM Books WHERE book.id = ?', [id])
}

export function addBook(category_id:number, title:string, author:string, price:number){
    return ModifyQ('INSERT INTO Books (category_id, title, author, price) VALUE (?,?,?,?)',[category_id,title,author,price])
}

export function updateBook(category_id:number, title:string, author:string, price:number, id:number){
    return ModifyQ('INSERT INTO Books SET category_id = ?, title = ?, author =?, price = ? WHERE id = ?',[category_id,title,author,price,id])
}

export function deleteBook(id:number){
    return ModifyQ('DELETE FROM Books WHERE id=?')
}