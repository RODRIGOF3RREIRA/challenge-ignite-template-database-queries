import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder("findByTitleContaining")
      .where("title ILIKE :param", { param: `%${param}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    return await this.repository.query("SELECT COUNT(id) FROM games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder("findUsersByGameId")
      .relation(Game, "users")
      .of(id)
      .loadMany();
  }
}
