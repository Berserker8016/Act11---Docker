import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

export type task = {
  id: number,
  date: Date,
  descryption: string,
  completed: boolean,
}

@Injectable()
export class TaskService {

  private tasks : task[] = [
    {
      id: 1,
      date: new Date(),
      descryption: 'Crea tu proyecto',
      completed: false
    },
    {
      id: 2,
      date: new Date(),
      descryption: 'Agrega el modulo de Task',
      completed: false
    },
    {
      id: 3,
      date: new Date(),
      descryption: 'Agregar controlador y servcio al modulo de Task',
      completed: false
    },
  ];

  create( task: task): task {
    const taskD = {
      id: this.tasks.length + 1,
      ...task
    } 

    this.tasks.push(taskD);
    return taskD;
  }

  getTasks(): task[] {
    return this.tasks;
  }

  getTask(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): task {
    const taskInd = this.tasks.findIndex(task => task.id === id);
    const updtTask = { ...this.tasks[taskInd], ...updateTaskDto};
    this.tasks[taskInd] = updtTask;
    console.log(id, updtTask);
    return updtTask;
  }

  remove(id: number): string  {
    const taskInd = this.tasks.findIndex((task) => task.id === id);
    if (taskInd === -1){
      throw new NotFoundException('Task with ID $(id) not found');
    }
    this.tasks.splice(taskInd, 1);
    return `This action removes a #${id} task`;
  }
}
