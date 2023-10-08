import rethink from 'rethinkdb'
import { getConnection } from '../db'

export interface Message {
  id?: string,
  userId?: number,
  text: string,
}

export class MessageService {
  async find() {
    const cursor = await rethink.table('messages').run(await getConnection())
    return await cursor.toArray() 
  }

  async create(data: Message) {
    const message: Message = {
      // id: this.messages.length,
      userId: data.userId,
      text: data.text,
    }

    await rethink.table('messages').insert(message).run(await getConnection())
    return message
  }
}
