import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.LEADER)
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}
