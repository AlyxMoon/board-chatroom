import rethink, { Connection } from 'rethinkdb'

let connection: Connection

export const initializeDB = async () => {
  const config = { 
    db: 'board-chatroom',
    host: 'localhost',
    port: 28015,
  }

  connection = await rethink.connect(config)
  console.log('RethinkDB connected')

  const desiredTables = ['messages', 'users']
  const existingTables = await rethink.db('board-chatroom').tableList().run(connection)

  for (const table of desiredTables) {
    if (!existingTables.includes(table)) {
      await rethink.db('board-chatroom').tableCreate(table).run(connection)
    }
  }
}

export const getConnection = async (): Promise<Connection> => {
  return connection
}
