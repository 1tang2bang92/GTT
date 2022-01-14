import styled from '@emotion/styled'
import { Typography, TextField, AppBar, Toolbar } from '@mui/material'

const TitleBar = () => {
  return (
    <AppBar position="static">
      <TitleBarWarp>
        <WorkspaceTypography variant='h5'> {"WORKSPACE TITLE(TEST)"} </WorkspaceTypography>
        <TextField id='search' placeholder='search' size='small' />
      </TitleBarWarp>
    </AppBar>
  )
}

const TitleBarWarp = styled(Toolbar)`
  display: flex;
  fiex-direction: row;
  justify-content: space-between;
`
const WorkspaceTypography = styled(Typography)`
  margin: auto 10px;
`
export default TitleBar
