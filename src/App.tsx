import React, { useState } from 'react'
import styled from '@emotion/styled'
import SideMenu from './components/SideMenu'
import Workspace from './components/workspaceViewer/Index'
import FloatButton from './components/Options/FloatButton'
import Optoins from './components/Options/Index'
import Resizable from './components/resizable/Resizable'

function App() {
  const [isOptionPage, setOptionPage] = useState(false)

  return (
    <ApplicationContainer>
      {isOptionPage ? (
        <Optoins />
      ) : (
        <>
          <SideMenu />
          <Workspace />
          <FloatButton onClick={() => setOptionPage(true)} />
        </>
      )}
      {/* <Resizable>
        <div>1</div>
        <div>2</div>
      </Resizable> */}
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
