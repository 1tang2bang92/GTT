import styled from '@emotion/styled'
import TitleBar from './TitleBar'
import ServiceList from './ServiceList'
import CodePreview from './CodePreview'

const Workspace = () => {
  return (
    <WorkspaceContainer>
        <TitleBar />
        <DataAreaContainer>
          <ServiceList />
          {true ? (
            <CodePreview/>
          ) : null}
        </DataAreaContainer>
    </WorkspaceContainer>
  )
}

const WorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: blue;
`
const DataAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export default Workspace