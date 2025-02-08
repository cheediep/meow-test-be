import { Injectable } from "@nestjs/common";
import { users } from "../data";
import { User } from "./types";

@Injectable()
export class UserService {
  constructor(private readonly data = users) {
    this.data = data;
  }

  findOne(id: string): User | null {
    return this.data.find((user) => user.id === id) ?? null;
  }
}
