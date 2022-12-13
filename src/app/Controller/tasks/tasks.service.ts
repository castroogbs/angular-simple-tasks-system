import { Injectable } from '@angular/core';
import { Task } from 'src/app/Model/Task';
import { Repository } from '../Repository';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements Repository<Task> {

  constructor() { }

  save(task: Task): Task
  {
    const tasks = this.getAll();
    task.id = Math.floor(Date.now() * Math.random()).toString(36);
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
  }

  getAll(): Task[]
  {
    const tasksData = localStorage.getItem("tasks");
    return JSON.parse(tasksData == null ? "[]" : tasksData);
  }

  findById(id: string): Task
  {
    const tasks = this.getAll();
    const task = tasks.filter( task => task.id === id );
    return task[0];
  }

  update(currentTask: Task): void
  {
    let tasks = this.getAll();
    tasks = tasks.map( task => {
      if ( task.id === currentTask.id )
      {
        task.name = currentTask.name
      }
      return task;
    } )
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  delete(id: string): Task
  {
    let tasks = this.getAll();
    const currentTask = this.findById(id);

    tasks = tasks.filter( task => task.id !== id );
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return currentTask;
  }

  getAllUserTasks(userId: string): Task[]
  {
    const tasks = this.getAll()
                        .filter( (task: Task) => task.userId === userId );
    return tasks;
  }
}
