import { useEffect } from 'react'

export const useEventListener = <K extends keyof DocumentEventMap>(
  type: K,
  handler: (this: Document, event: DocumentEventMap[K]) => any,
  deps: any[] = []
) =>
  useEffect(
    () => (
      document.addEventListener(type, handler),
      () => document.removeEventListener(type, handler)
    ),
    [type, handler, ...deps]
  )

  
export const useMessage = (
  handler: (this: Window, event: MessageEvent<any>) => any,
  deps: any[] = []
) =>
  useEffect(
    () => (
      window.addEventListener('message', handler),
      () =>  window.removeEventListener('message', handler)
    ),
    [handler, ...deps]
  )
