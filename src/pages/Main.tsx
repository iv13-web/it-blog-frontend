import NavSidebar from '../components/NavSidebar'
import {Box} from '@mui/material'
import MainContainer from '../Layout/MainContainer'

export default function Main() {

  return (
    <>
      <NavSidebar/>
      <MainContainer>
        <Box sx={{width: '100%', height: 50, backgroundColor: 'teal'}}/>
      </MainContainer>
    </>
  )
}