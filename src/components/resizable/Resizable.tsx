import styled from '@emotion/styled'
import { ReactNode } from 'react'

const ResizableWapper = (props: { children: ReactNode }) => {
  const { children } = props
  return <>{children}</>
}

const Splitter = () => {
  return <ResizableSplitter />
}

const Resizable = (props: { children: ReactNode[] }) => {
  const { children } = props
  const c = children
    .reduce<ReactNode[]>((acc, cur) => {
      acc.push(<ResizableWapper>{cur}</ResizableWapper>)
      acc.push(<Splitter />)
      return acc
    }, [])
    .slice(0, -1)
  return <ResizableContainer>{c}</ResizableContainer>
}

export default Resizable

const ResizableContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`

const ResizableSplitter = styled.div`
  width: 4px;
  margin: 0px 2px;
  height: 100%;
  cursor: pointer;
  background-color: red;
  transition-duration: 0.5s;
  &:hover {
    margin: 0px;
    width: 8px;
  }
`
