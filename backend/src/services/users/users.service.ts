import rethink from 'rethinkdb'
import { getConnection } from '../../db'
import { Users, UsersData } from './users.schema'

export class UsersService {
  id = 'id'
  table = 'users'

  async get (id: string): Promise<Users> {
    const result = (await rethink.table(this.table).get(id).run(await getConnection())) as Users
    return result
  }

  async find() {
    const cursor = await rethink.table(this.table).run(await getConnection())
    return await cursor.toArray() 
  }

  async create(data: UsersData) {
    const user: UsersData = {
      username: data.username,
      password: data.password,
      color: data.color,
    }

    await rethink.table(this.table).insert(user).run(await getConnection())
    return user
  }
}
