import fp from 'fastify-plugin'
import websocket, { WebsocketPluginOptions } from 'fastify-websocket'

export default fp<WebsocketPluginOptions>(async (fastify, opts) => {
  await fastify.register(websocket)
})
