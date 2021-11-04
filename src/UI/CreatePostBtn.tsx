import {useHistory} from 'react-router-dom'
import {Button} from '@mui/material'

export default function CreatePostBtn() {
  const history = useHistory()

  return (
    <Button
      variant='contained'
      color='secondary'
      sx={{flexShrink: 0, display: {xs: 'none', sm: 'block'}}}
      onClick={() => history.push('/new')}
    >
      Create Post
    </Button>
  )
}