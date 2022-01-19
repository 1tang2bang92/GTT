import styled from '@emotion/styled'
import { Divider } from '@mui/material'
import { ReactNode, useState, useRef, forwardRef } from 'react'
import { useEventListener } from '../../hooks/event'

const ResizableWapper = forwardRef(
  (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    ref: any
  ) => {
    return <div {...props} ref={ref} />
  }
)

const Splitter = (props: any) => (
  <ResizableSplitter {...props} orientation="vertical" variant="middle" />
)

const Resizable = (props: { children: ReactNode[] }) => {
  const { children } = props
  const first = useRef<HTMLDivElement>(null)
  const [click, setClick] = useState(false)
  const [width, setWidth] = useState(320)

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    //console.log(first.current!!.offsetWidth)
    setClick(true)
    setWidth(first.current!!.offsetWidth)
  }

  useEventListener('mouseup', (event: MouseEvent) => {
    setClick(false)
  })

  useEventListener(
    'mousemove',
    (event: MouseEvent) => {
      if (!click) return
      setWidth(width + event.movementX)
    },
    []
  )

  return (
    <ResizableContainer>
      <ResizableWapper ref={first} style={{ flexGrow: 0, width: width }}>
        {children[0]}
      </ResizableWapper>
      <Splitter onMouseDown={onMouseDown} />
      <ResizableWapper style={{ flexGrow: 1, flexShrink: 0 }}>
        {children[1]}
      </ResizableWapper>
    </ResizableContainer>
  )
}

export default Resizable

const ResizableContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ResizableSplitter = styled(Divider)`
  width: 4px;
  cursor: col-resize;
  transition-duration: 0.2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // &:hover {
  //   margin: 0px -2px;
  //   width: 8px;
  // }
`
