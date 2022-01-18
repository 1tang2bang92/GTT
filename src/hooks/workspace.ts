import { AnyDefinition } from '@grpc/proto-loader'
import { useState } from 'react'
import { useMessageAny, usePostMessage } from './event'

// const checkProperty = (obj: any, name: string, value: T) => {
//   if (!obj[name]) return true
//   if (obj[name] !== 'from') return true
//   return false
// }

export const usePackage = () => {
  const [state, setState] = useState<[string, AnyDefinition][]>([])
  const command = 'get-package'

  useMessageAny((event: MessageEvent) => {
    const { data } = event
    if (!data.direction) return
    if (data.direction !== 'from') return
    if (!data.command) return
    if (data.command !== command) return
    if (!data.data) return

    console.log(data)
    setState(data.data)
  })
  return state
}

export const useSetPackage = () => {
  const [state, setState] = useState<[string, AnyDefinition][]>([])
  usePostMessage({
    direction: 'from',
    command: 'get-package',
    data: state
  },[state])

  return setState
}

export const useWorkspace = () => {
  const [state, setState] = useState<any[]>(JSON.parse(window.localStorage.getItem('workspace') ?? '[]'))
  const command = 'get-workspace'

  useMessageAny((event: MessageEvent) => {
    const { data } = event
    if (!data.direction) return
    if (data.direction !== 'from') return
    if (!data.command) return
    if (data.command !== command) return
    if (!data.data) return

    console.log(data)
    const workspace = [...state, data.data]
    window.localStorage.setItem('workspace', JSON.stringify(workspace))
    setState(workspace)
  })
  return state
}
