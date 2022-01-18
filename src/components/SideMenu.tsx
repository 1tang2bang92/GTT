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
import DeleteIcon from '@mui/icons-material/Delete';

import React, { Children, ReactNode, useState } from 'react'
import { useSetPackage, useWorkspace } from '../hooks/workspace'

import { openFileBrowser } from '../functions/openFileBrowser'
import { getAllPackageNames, getAnyDefinitionsByPackageName } from '../functions/grpc'
import { PackageDefinition } from '@grpc/proto-loader'

const ExpandableList = (props: { title: string; children?: ReactNode }) => {
  const { children, title } = props
  const [open, setOpen] = useState(true)

  const handleClick = (_: React.MouseEvent) => {
    setOpen(!open)
  }

  const deleteWorksapce = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <WorkspacesIcon style={{ marginRight: '10px' }} />
        <ListItemText primary={title} />
        <DeleteIcon onClick={deleteWorksapce} />
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
  const workspaces = useWorkspace()
  const setPackage = useSetPackage()

  const handleListClick = (pds:PackageDefinition[] , name: string, _: React.MouseEvent) => {
    setPackage(getAnyDefinitionsByPackageName(pds, name))
  }

  return (
    <MenuWarp>
      <List>
        {workspaces.map((e0: any, i0: number) => (
          <ExpandableList key={`ExpandableList-${i0}`} title={e0.title}>
            {getAllPackageNames(e0.packages).map((e1: any, i1: number) => (
              <ExpandableListItem
                key={`ExpandableListItem-${i1}`}
                title={e1}
                onClick={event => handleListClick(e0.packages, e1, event)}
              />
            ))}
          </ExpandableList>
        ))}
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
