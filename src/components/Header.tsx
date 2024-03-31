import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '@/app/store'
import { setUser, signOutUser } from '@/features/authSlice'
import { auth } from '@/firebase'
import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const Header = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const dispatch = useDispatch()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser())
        console.log('signed out successful')
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const listen = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(setUser(null))
      }
    })

    return () => {
      listen()
    }
  }, [])
  const image = 'src/assets/images/pet-svgrepo-logo-header.svg'

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
            <img alt={'logo'} src={image} width={'32px'} />
          </IconButton>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            PET SHELTER
          </Typography>
          {currentUser ? (
            <>
              <Button color={'inherit'} component={Link} to={'/add'}>
                ADD NEW PET
              </Button>
              <Button color={'inherit'} component={Link} to={'/favorites'}>
                Favorites
              </Button>
              <Button color={'inherit'} onClick={handleSignOut}>
                SIGN OUT
              </Button>
              <Typography variant={'caption'}>{`${currentUser.email}`}</Typography>
            </>
          ) : (
            <Button color={'inherit'} component={Link} to={'/login'}>
              Sign In
            </Button>
          )}
          {/*<Button*/}
          {/*  color={'inherit'}*/}
          {/*  component={Link}*/}
          {/*  to={'/login'}*/}
          {/*  // onClick={handleHomeButtonClick}*/}
          {/*>*/}
          {/*  Sign In*/}
          {/*</Button>*/}
          {/*<Button color="inherit" onClick={() => setIsAddNewPetOpen(true)}>*/}
          {/*    Add New Pet*/}
          {/*</Button>*/}
          {/*<IconButton color="inherit" component={Link}*/}
          {/*            to="/favorites">*/}
          {/*    {favoriteCount > 0 ? (*/}
          {/*        <Badge badgeContent={favoriteCount} color="error">*/}
          {/*            <FavoriteBorderOutlined />*/}
          {/*        </Badge>*/}
          {/*    ) : (*/}
          {/*        <FavoriteBorderOutlined />*/}
          {/*    )}*/}
          {/*</IconButton>*/}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
