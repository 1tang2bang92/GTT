import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { getAllPackageNames, getAllServiceNames, getProtoFileList } from '../functions/grcp'

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
        return await getProtoFileList()
      } else if (command === 'get-services') {
        return await getAllServiceNames()
      } else if (command === 'get-packages') {
        return await getAllPackageNames()
      } else {
        return {}
      }
    }
  )
}

export default root
