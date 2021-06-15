import {AfterRoutesInit, Injectable, Service} from "@tsed/common"
import {TypeORMService} from "@tsed/typeorm";
import {Connection} from "typeorm";
import { MyTodoList } from "src/entity/todo";

@Service()
export class todoService  implements AfterRoutesInit{
    private connection: Connection;
    
    constructor(private typeORMService: TypeORMService) {
    
    }
    
    $afterRoutesInit() {
        this.connection = this.typeORMService.get("todo")!; // get connection by name
    } 

    async create(todo:MyTodoList) :Promise<MyTodoList>{
        await this.connection.manager.save(todo)
        return todo
    }

    async findAll():Promise<MyTodoList[]>{
        return await this.connection.manager.find(MyTodoList)
    }

    async update(todo:MyTodoList, id:string){
        return await this.connection.manager.createQueryBuilder()
        .update<MyTodoList>(MyTodoList, {name: todo.name})
        .where("my_todo_list.id = :id", { id: id })
        .returning(['id', 'name'])
        .updateEntity(true)
        .execute()
        
        // return await this.connection.manager.save({
        //     id: todo.id,
        //     name: todo.name,
        //     checked: todo.checked,
        //     dateCreation: todo.dateCreation
        // })
    }

    async delete(id:string){
        return await this.connection.manager.createQueryBuilder()
        .delete()
        .from(MyTodoList)
        .where("my_todo_list.id = :id", { id: id})
        .execute();
    }

}