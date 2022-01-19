import styled from '@emotion/styled'
import { MessageTypeDefinition, MethodDefinition } from '@grpc/proto-loader'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Button, Paper, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ExpandIcon = (props: { open: boolean }) => {
  const { open } = props
  return open ? <StyledMenuOpenIcon /> : <StyledMenuIcon />
}

const Message = (props: { msg: MessageTypeDefinition }) => {
  const { msg } = props
  const type = msg.type as any
  const field = type.field as any[]
  console.log(msg)
  const result = field.reduce<any>((acc, cur) => {
    acc[cur.name] = cur.typeName || cur.type.substring(5)
    return acc
  }, {})
  return (
    <pre>
      {/* {type.name} */}{JSON.stringify(result, null, 2)}
    </pre>
  )
}

const MessageType = (props: {
  msg: MessageTypeDefinition
  stream: boolean
}) => {
  const { msg, stream } = props
  const type = msg.type as any
  return (
    <MessageWarper elevation={6}>
      <MessageName>{`${stream ? 'stream' : ''} ${type.name}`}</MessageName>
      <Divider />
      <Message msg={msg}></Message>
    </MessageWarper>
  )
}

const RPC = (props: {
  method: MethodDefinition<object, object>
  name: string
}) => {
  const { method, name } = props

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.currentTarget
    const formData = new FormData(target)
    const iter = formData.entries()
    let iterResult = iter.next()

    while (!iterResult.done) {
      const [id, value] = iterResult.value
      console.log(id, value)
      iterResult = iter.next()
    }
  }

  return (
    <RPCMethodContainer>
      <RPCMethodName>
        {name}
        <MessageType msg={method.requestType} stream={method.requestStream} />
        <MessageType msg={method.responseType} stream={method.responseStream} />
      </RPCMethodName>
      <form onSubmit={sendMessage}>
        <RPCTestTextAria name="code" aria-label="textaria"></RPCTestTextAria>
        <Button variant="contained" type="submit">
          Send
        </Button>
      </form>
    </RPCMethodContainer>
  )
}

const Service = (props: {
  title: string
  methods: [string, MethodDefinition<object, object>][]
}) => {
  const { title, methods } = props
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [props])

  const onClick = (_: React.MouseEvent) => {
    setOpen(!open)
  }

  return (
    <ServiceContainer>
      <ServiceTopBar variant="outlined" elevation={3} onClick={onClick}>
        <ExpandIcon open={open} />
        <ServiceTitle>{title}</ServiceTitle>
      </ServiceTopBar>
      <DataContainer>
        {open && (
          <DataWarper variant="elevation" elevation={6}>
            {methods.map(([name, method], idx) => (
              <RPC key={`${idx}`} name={name} method={method} />
            ))}
          </DataWarper>
        )}
      </DataContainer>
    </ServiceContainer>
  )
}

export default Service

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ServiceTopBar = styled(Paper)`
  display: flex;
  width: 100%;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const StyledMenuIcon = styled(MenuIcon)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`

const StyledMenuOpenIcon = styled(MenuOpenIcon)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`

const ServiceTitle = styled.h2`
  margin: auto 0px;
  width: 100%;
  text-align: center;
`
const DataContainer = styled.div`
  margin-left: 4rem;
`

const DataWarper = styled(Paper)`
  padding: 1rem;
`

const RPCMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4rem;
  width: 100%;
`

const RPCMethodName = styled.h2`
  margin: 0.5rem 0px;
`

const RPCTestTextAria = styled.textarea`
  outline: none;
  resize: none;
  width: 100%;
  height: 8rem;
`

const MessageWarper = styled(Paper)`
  padding: 10px;
  > * {
    margin: 0px;
  }
  > hr {
    margin: 10px 0px;
  }
`

const MessageName = styled.h5`

`