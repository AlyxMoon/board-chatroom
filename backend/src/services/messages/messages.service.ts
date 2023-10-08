import rethink from 'rethinkdb'
import { getConnection } from '../../db'
import { Messages } from './messages.schema'

export class MessageService {
  async find() {
    const cursor = await rethink.table('messages')
      .orderBy(rethink.desc('createdAt'))
      .limit(50)
      .run(await getConnection())
    return await cursor.toArray() 
  }

  async create(data: Messages) {
    const message: Omit<Messages, 'id'> = {
      userId: data.userId,
      text: data.text,
      createdAt: data.createdAt,
    }

    await rethink.table('messages').insert(message).run(await getConnection())
    return message
  }
}
