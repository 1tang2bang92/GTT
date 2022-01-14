import axios from 'axios'
import { useMessage } from '../hooks/event'

const Adapter = () => {
  useMessage((event: MessageEvent<any>) => {
    const { data } = event
    if (!data.direction) return
    if (data.direction !== 'to') return
    
    console.log(data)
    axios
      .post<any>('http://127.0.0.1:3010/', data, {
        responseType: 'json',
      })
      .then(x =>
        window.postMessage({
          direction: 'from',
          type: data.type,
          command: data.command,
          data: x.data,
        })
      )
  })
  return <></>
}

export default Adapter
