import { table as dbTable, desc as dbDesc } from 'rethinkdb'
import { getConnection } from '../../db'
import { Messages } from './messages.schema'

export class MessageService {
  async find() {
    const cursor = await dbTable('messages')
      .eqJoin('userId', dbTable('users'))
      // @ts-ignore
      .without({ right: { id: true, password: true } })
      .zip()
      .orderBy(dbDesc('createdAt'))
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

    await dbTable('messages').insert(message).run(await getConnection())
    return message
  }
}
