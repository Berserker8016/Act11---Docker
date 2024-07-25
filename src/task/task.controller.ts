import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { TaskService, task } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getTasks(@Query() query: any){
    console.log(query);
    return this.taskService.getTasks();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getTask(@Param('id') id: string){
    console.log(id)
    return this.taskService.getTask(parseInt(id));
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) : task {
    return this.taskService.create(createTaskDto as unknown as task);
  }

  @Get()
  findAll() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.getTask(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
