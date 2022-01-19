import { useState } from 'react'
import styled from '@emotion/styled'
import SideMenu from './components/SideMenu'
import Workspace from './components/workspaceViewer/Index'
import FloatButton from './components/Options/FloatButton'
import Optoins from './components/Options/Index'
import Resizable from './components/resizable/Resizable'
import Adapter from './components/Adapter'

function App() {
  const [isOptionPage, setOptionPage] = useState(false)

  return (
    <ApplicationContainer>
      <Adapter />
      {isOptionPage ? (
        <Optoins />
      ) : (
        <>
          <Resizable>
            <SideMenu />
            <Workspace />
          </Resizable>
          <FloatButton onClick={() => setOptionPage(true)} />
        </>
      )}
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
