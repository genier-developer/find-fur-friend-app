import { useSelector } from 'react-redux'

import { selectUser } from '@/features/user/slices/auth-slice'
import Typography from '@mui/material/Typography'

export const AuthDetails = () => {
  const user = useSelector(selectUser)

  return (
    <Typography variant={'subtitle1'} sx={{ marginLeft: 4 }}>
      {`Signed as ${user?.email}`}
    </Typography>
  )
}
