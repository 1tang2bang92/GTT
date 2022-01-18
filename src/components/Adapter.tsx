import axios from 'axios'
import { useMessageAny } from '../hooks/event'
import { useWebSocket } from '../hooks/websocket'

const Adapter = () => {
  const ws = useWebSocket('ws://127.0.0.1:3010/ws')

  ws.onmessage = message => {
    const { data } = message
    window.postMessage(data)
  }

  useMessageAny(event => {
    const { data } = event
    if (!data.direction) return
    if (data.direction !== 'to') return

    console.log(data)

    axios
      .post<any>('http://127.0.0.1:3010/', data, {
        responseType: 'json',
      })
      .then(
        x => window.postMessage(x.data)
        // window.postMessage({
        //   direction: 'from',
        //   type: data.type,
        //   command: data.command,
        //   data: x.data,
        // })
      )
  })
  return <></>
}

export default Adapter
