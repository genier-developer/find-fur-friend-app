import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, signOutUser } from '@/features/user/slices/auth-slice'
import { selectFavoritePets } from '@/features/pet/slices/pet-slice'
import { auth } from '@/services/firebase'
import { FavoriteBorderOutlined } from '@mui/icons-material'
import PetsIcon from '@mui/icons-material/Pets'
import { Box, AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import { AuthDetails } from '@/features/user/auth-details'

export const Header = () => {
  const favoritePets = useSelector(selectFavoritePets)
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser())
      })
      .catch(error => console.error(error))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton
            aria-label={'menu'}
            color={'inherit'}
            edge={'start'}
            size={'large'}
            sx={{ mr: 2 }}
          >
            <PetsIcon />
          </IconButton>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            FindFurFriends
          </Typography>
          {currentUser ? (
            <>
              <Button color={'inherit'} component={Link} to={'/'}>
                HOME
              </Button>
              <Button color={'inherit'} component={Link} to={'/add'}>
                ADD NEW PET
              </Button>
              <IconButton color={'inherit'} component={Link} to={'/favorites'}>
                {favoritePets.length > 0 ? (
                  <Badge badgeContent={favoritePets.length} color={'error'}>
                    <FavoriteBorderOutlined />
                  </Badge>
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Button color={'inherit'} onClick={handleSignOut}>
                Sign out
              </Button>
              <AuthDetails />
            </>
          ) : (
            <>
              <Button color={'inherit'} component={Link} to={'/'}>
                Home
              </Button>
              <Button color={'inherit'} component={Link} to={'/login'}>
                Sign In
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
