import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/Controller/tasks/tasks.service';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() userId: string = "";

  editTask: boolean = false;
  taskToEdit: Task | null = null;

  constructor(private tasksDB: TasksService) { }

  ngOnInit(): void {
  }

  postTasks(taskname: string): boolean
  {
    if (taskname == "") {
      alert("Preencha o campo com uma tarefa para continuar");
      return false;
    }

    let task = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      userId: this.userId,
      name: taskname
    };
    let saveTask = this.tasksDB.save(task);

    if (saveTask) {
      alert("Tarefa salva com sucesso!")
      return true;
    }

    return false;
  }

  changeTask(taskId: string): void
  {
    this.editTask = true;
    this.taskToEdit = this.tasksDB.findById(taskId);
  }

  putTasks(newTaskName: string, currentTaskValues: Task): void
  {
    currentTaskValues.name = newTaskName;
    this.tasksDB.update(currentTaskValues);
    alert("Tarefa alterada com sucesso!")
  }

  getAllTasks(): Task[]
  {
    return this.tasksDB.getAllUserTasks(this.userId);
  }

  deleteTask(taskId: string)
  {
    this.tasksDB.delete(taskId);
    alert("Tarefa deletada com sucesso")
  }

}
