import styled from '@emotion/styled'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Paper } from '@mui/material'
import { useState } from 'react'

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

const Service = (props: { title: string }) => {
  const { title } = props
  const [open, setOpen] = useState(false)

  const onClick = (event: React.MouseEvent) => {
    setOpen(!open)
  }

  return (
    <ServiceContainer>
      <ServiceTopBar variant="outlined" square>
        <ExpandIcon open={open} onClick={onClick} />
        <ServiceTitle>{title}</ServiceTitle>
      </ServiceTopBar>
      {open ? <div>test</div> : null}
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
