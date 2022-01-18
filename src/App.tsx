import { useState } from 'react'
import styled from '@emotion/styled'
import SideMenu from './components/SideMenu'
import Workspace from './components/workspaceViewer/Index'
import FloatButton from './components/Options/FloatButton'
import Optoins from './components/Options/Index'
import Resizable from './components/resizable/Resizable'
import Adapter from './components/Adapter'
import { False, If, True } from './components/Condtition'

function App() {
  const [isOptionPage, setOptionPage] = useState(false)

  return (
    <ApplicationContainer>
      <Adapter />
      <If condition={isOptionPage}>
        <True>
          <Optoins />
        </True>
        <False>
          <Resizable>
            <SideMenu />
            <Workspace />
          </Resizable>
          <FloatButton onClick={() => setOptionPage(true)} />
        </False>
      </If>
    </ApplicationContainer>
  )
}

export default App

const ApplicationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`
