import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(id);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}
