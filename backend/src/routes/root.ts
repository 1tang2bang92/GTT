import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { getAllServices, getProtoList } from '../functions/grcp'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    '/',
    async function (
      request: FastifyRequest<{
        Body: any
      }>,
      reply: FastifyReply
    ) {
      const { body } = request
      const { command } = body
      if (command === 'get-proto-list') {
        return await getProtoList()
      } else if (command === 'get-services') {
        return await getAllServices()
      } else {
        return {}
      }
    }
  )
}

export default root
