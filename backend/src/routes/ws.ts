import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import 'fastify-websocket'
import { SocketStream } from 'fastify-websocket'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    { websocket: true },
    async function (connection: SocketStream, request: FastifyRequest) {
      const { socket } = connection
      socket.on('message', async message => {})
    }
  )
}

export default root
