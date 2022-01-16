import { useEffect } from 'react'

export const useEventListener = <K extends keyof DocumentEventMap>(
  type: K,
  handler: (this: Document, event: DocumentEventMap[K]) => any,
  deps: any[] = []
) =>
  useEffect(() => {
    document.addEventListener(type, handler)
    return () => document.removeEventListener(type, handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, handler, ...deps])

export const useMessage = (
  handler: (this: Window, event: MessageEvent<any>) => any,
  deps: any[] = []
) =>
  useEffect(() => {
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, ...deps])

export const usePostMessage = (message: any, deps: any[] = []) =>
  useEffect(() => {
    window.postMessage(message)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
