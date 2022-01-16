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
  width: 100%;
  height: 100%;
`
const DataAreaContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  overflow-y: auto;
`

export default Workspace