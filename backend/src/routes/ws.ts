import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import 'fastify-websocket'
import { SocketStream } from 'fastify-websocket'

const ws: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/ws',
    { websocket: true },
    async function (connection: SocketStream, request: FastifyRequest) {
      const { socket } = connection
      socket.on('message', async message => {
        const msg = message.toString()
        // const obj = JSON.parse(msg)
        console.log(msg)
        socket.send(msg)
      })
    }
  )
}

export default ws
