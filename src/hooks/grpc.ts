import { useState } from 'react'
import { useMessage, usePostMessage } from './event'

export const useService = () => {
  const [services, setServices] = useState<any[]>([])
  useMessage((event: MessageEvent) => {
    const { data } = event
    if (!data.direction) return
    if (data.direction !== 'from') return
    if (!data.command) return
    if (data.command !== 'get-services') return
    if (!data.data) return

    console.log(data)
    setServices(data.data)
  })
  usePostMessage({
    direction: 'to',
    type: 'read',
    command: 'get-services',
  })
  return services
}
