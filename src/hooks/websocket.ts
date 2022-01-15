import { useEffect, useRef, useState } from 'react'

// export const useWebSocket = (
//   url: string | URL,
//   protocols?: string | string[] | undefined
// ) => {
//   const wsRef = useRef<WebSocket>()
//   if (!wsRef.current) wsRef.current = new WebSocket(url, protocols)
//   console.log(wsRef)
//   return wsRef.current as WebSocket
// }

// export const useWebSocket = (
//   url: string | URL,
//   protocols?: string | string[] | undefined
// ) => {
//   const [ws, setWS] = useState<WebSocket>()
//   useEffect(() => {
//     setWS(new WebSocket(url, protocols))
//   },[protocols, url])
//   return ws
// }

// export const useWebSocket = (
//   url: string | URL,
//   protocols?: string | string[] | undefined
// ) => {
//   const wsRef = useRef<WebSocket>()
//   useEffect(() => {
//     if (!wsRef.current) wsRef.current = new WebSocket(url, protocols)
//   }, [protocols, url])
//   return wsRef.current as WebSocket
// }

export const useWebSocket = (
  url: string | URL,
  protocols?: string | string[] | undefined
) => {
  const wsRef = useRef<WebSocket>(new WebSocket(url, protocols))
  return wsRef.current as WebSocket
}
