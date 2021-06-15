import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {MyTodoList} from "../entity/todo"
import { todoService } from "src/provider/todoService";

@Controller("/to-do")
export class Todo {
  constructor(private readonly todoService: todoService){
  }

  @Get("/")
  get(){
    return this.todoService.findAll()
  }

  @Post("/add-to-do")
  add(@BodyParams() Todo:MyTodoList):Promise<MyTodoList>{
      return this.todoService.create(Todo)
  }

  @Put("/update/:id")
  update(@BodyParams() todo:MyTodoList, @PathParams("id") id: string){
    return this.todoService.update(todo, id)
  }

  @Delete("/delete/:id")
  async delete(@PathParams("id") id: string){
    return this.todoService.delete(id)
  }
}
