import styled from '@emotion/styled'
import { Typography, TextField } from '@mui/material';

const TitleBar = () => {
  return (
    <TitleBarWarp>
      <WorkspaceTypography variant='h5'> {"WORKSPACE TITLE(TEST)"} </WorkspaceTypography>
      <TextField id='search' placeholder='search' />
    </TitleBarWarp>
  )
}

const TitleBarWarp = styled.div`
  display: flex;
  fiex-direction: row;
  justify-content: space-between;
  background-color: red;
  padding: 10px;
`
const WorkspaceTypography = styled(Typography)`
  margin: auto 10px;
`
export default TitleBar
