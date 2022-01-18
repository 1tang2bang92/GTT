import styled from '@emotion/styled'
import { MethodDefinition } from '@grpc/proto-loader'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { When } from '../Condtition'

const ExpandIcon = (props: {
  onClick: (event: React.MouseEvent) => any
  open: boolean
}) => {
  const { open, onClick } = props
  return open ? (
    <StyledMenuOpenIcon onClick={onClick} />
  ) : (
    <StyledMenuIcon onClick={onClick} />
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

  const onClick = (event: React.MouseEvent) => {
    setOpen(!open)
  }

  return (
    <ServiceContainer>
      <ServiceTopBar variant="outlined" square>
        <ExpandIcon open={open} onClick={onClick} />
        <ServiceTitle>{title}</ServiceTitle>
      </ServiceTopBar>
      <When condition={open}>
        <Paper variant="outlined" square>
          {methods.map((e, i) => (
            <div key={`div-${i}`}>{e[0]}</div>
          ))}
        </Paper>
      </When>
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
