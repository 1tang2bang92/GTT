import axios from 'axios'
import { useMessage } from '../hooks/event'

const Adapter = () => {
  useMessage((event: MessageEvent<any>) => {
    const { data } = event
    if (!data.direction) return
    if (data.direction === 'to') {
      axios
        .post<any>('/', data, {
          responseType: 'json',
        })
        .then(x => window.postMessage({ direction: 'from', ...x.data }))
    }
  }, [])
  return <></>
}

export default Adapter
