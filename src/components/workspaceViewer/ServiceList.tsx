import styled from '@emotion/styled'
import { useMessage, usePostMessage } from '../../hooks/event'
import { useService } from '../../hooks/grpc'
import Service from './Service'

const ServiceList = () => {
  const services = useService()

  return (
    <ServiceListWarp>
      {services.map((x, i) => (
        <Service key={`service-${i}`} title={x}></Service>
      ))}
    </ServiceListWarp>
  )
}

const ServiceListWarp = styled.div`
  width: 100%;
`

export default ServiceList
