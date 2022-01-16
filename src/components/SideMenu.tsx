import styled from '@emotion/styled'
import {
  Collapse,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import WorkspacesIcon from '@mui/icons-material/Workspaces' //package
import DataObjectIcon from '@mui/icons-material/DataObject' //service
import FunctionsIcon from '@mui/icons-material/Functions' //rpc
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail' //message

import React, { Children, ReactNode, useState } from 'react'
import { usePackage } from '../hooks/grpc'

const ExpandableList = (props: { title: string; children?: ReactNode }) => {
  const { children, title } = props
  const [open, setOpen] = useState(false)

  const handleClick = (_: React.MouseEvent) => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <WorkspacesIcon style={{ marginRight: '10px' }} />
        <ListItemText primary={title} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  )
}

const ExpandableListItem = (props: {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  title: string
}) => {
  return (
    <ListItemButton onClick={props.onClick} sx={{ pl: 4 }}>
      <IntegrationInstructionsIcon style={{ marginRight: '10px' }} />
      <ListItemText primary={props.title} />
    </ListItemButton>
  )
}

const SideMenu = () => {
  const packages = usePackage()
  // const [list, setList] = useState([])
  // const handleAddButtonClick = (_: React.MouseEvent) => {}

  const handleListClick = (name: string, _: React.MouseEvent) => {
  }

  return (
    <MenuWarp>
      <List>
        <ExpandableList title="test">
          {packages.map((e, i) => (
            <ExpandableListItem
              // key={`ExpandableListItem-${i}`}
              title={e}
              onClick={event => handleListClick(e, event)}
            />
          ))}
        </ExpandableList>
      </List>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      {/* 
        <label htmlFor="contained-button-file">
          <Input accept="file" webkitdirectory directory />
          <Fab color="primary" aria-label="add" onClick={handleAddButtonClick}>
            <AddIcon />
          </Fab>
        </label>
      */}
    </MenuWarp>
  )
}

export default SideMenu

const MenuWarp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  > ul {
    width: 100%;
  }
`
