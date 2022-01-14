import fp from 'fastify-plugin'
import cors, { FastifyCorsOptions } from 'fastify-cors'

export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  await fastify.register(cors)
})
