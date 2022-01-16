import { useState } from 'react'
import { useMessage, usePostMessage } from './event'

// const checkProperty = (obj: any, name: string, value: T) => {
//   if (!obj[name]) return true
//   if (obj[name] !== 'from') return true
//   return false
// }

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

export const usePackage = () => {
  const [packages, setPackages] = useState<any[]>([])
  const command = 'get-packages'

  useMessage((event: MessageEvent) => {
    const { data } = event
    if (!data.direction) return
    if (data.direction !== 'from') return
    if (!data.command) return
    if (data.command !== command) return
    if (!data.data) return

    console.log(data)
    setPackages(data.data)
  })
  usePostMessage({
    direction: 'to',
    type: 'read',
    command: command,
  })
  return packages
}
