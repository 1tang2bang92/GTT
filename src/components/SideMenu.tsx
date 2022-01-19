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
import DeleteIcon from '@mui/icons-material/Delete'

import React, { ReactNode, useState } from 'react'
import { useSetPackage, useWorkspace } from '../hooks/workspace'

import { openFileBrowser } from '../functions/openFileBrowser'
import { getServices } from '../functions/grpc'
import { PackageDefinition } from '@grpc/proto-loader'

const ExpandableList = (props: { title: string; children?: ReactNode }) => {
  const { children, title } = props
  const [open, setOpen] = useState(true)

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
  const workspace = useWorkspace()
  const setPackage = useSetPackage()

  console.log(workspace)

  const handleListClick = (pd: PackageDefinition, _: React.MouseEvent) => {
    setPackage(getServices(pd))
  }

  return (
    <MenuWarp>
      <List>
        {workspace && (
          <ExpandableList title={workspace.title}>
            {workspace.packages.map((pkg, idx1) => (
              <ExpandableListItem
                key={`ExpandableListItem-${idx1}`}
                title={pkg.fileName}
                onClick={event => handleListClick(pkg.origin, event)}
              />
            ))}
          </ExpandableList>
        )}
      </List>
      <Fab color="primary" aria-label="add" onClick={openFileBrowser}>
        <AddIcon />
      </Fab>
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
  overflow-y: auto;
  > ul {
    width: 100%;
  }
`
