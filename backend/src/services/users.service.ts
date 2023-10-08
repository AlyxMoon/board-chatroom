import rethink from 'rethinkdb'
import { getConnection } from '../db'

export interface User {
  id?: string,
  username: string,
  password: string,
  color: string,
}

export class UserService {
  table = 'users'

  async find() {
    const cursor = await rethink.table(this.table).run(await getConnection())
    return await cursor.toArray() 
  }

  async create(data: User) {
    const user: User = {
      username: data.username,
      password: data.password,
      color: data.color,
    }

    await rethink.table(this.table).insert(user).run(await getConnection())
    return user
  }
}
