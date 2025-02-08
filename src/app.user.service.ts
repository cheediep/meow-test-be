import { Injectable } from "@nestjs/common";
import { User } from "./types";

@Injectable()
export class UserService {
  constructor(private readonly data: User[]) {}

  findOne(id: string): User | null {
    return this.data.find((user) => user.id === id) ?? null;
  }
}
