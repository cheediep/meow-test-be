import { Injectable } from "@nestjs/common";
import { User } from "./types";

@Injectable()
export class UserService {
  constructor(private readonly datasource: User[]) {}

  findOne(id: string): User | null {
    return null;
  }
}
