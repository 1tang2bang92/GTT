import styled from '@emotion/styled'
import { getMethods, isService } from '../../functions/grpc'
import { usePackage } from '../../hooks/workspace'
import Service from './Service'

const ServiceList = () => {
  const packages = usePackage()

  return (
    <ServiceListWarp>
      {packages
        .filter(isService)
        .map((x, i) => (
          <Service key={`service-${i}`} title={x[0]} methods={getMethods(x)}></Service>
        ))}
    </ServiceListWarp>
  )
}

const ServiceListWarp = styled.div`
  width: 100%;
`

export default ServiceList
