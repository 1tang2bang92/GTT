import styled from '@emotion/styled'
import { Fab, ButtonTypeMap, ExtendButtonBase} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

const FloatButton: ExtendButtonBase<ButtonTypeMap> = (props: any) => {
  return (
    <FloatBtn 
      color='primary'
      {...props}
    > 
      <SettingsIcon /> 
    </FloatBtn>
  )
}

const FloatBtn = styled(Fab)`
  position: fixed; 
  right: 10px; 
  bottom: 10px;
`

export default FloatButton