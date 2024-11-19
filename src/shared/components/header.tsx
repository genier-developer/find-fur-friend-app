// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
//
// import { selectUser, setUser, signOutUser } from '@/features/user/slices/auth-slice'
// import { selectFavoritePets } from '@/features/pet/slices/pet-slice'
// import { auth } from '@/services/firebase'
// import { FavoriteBorderOutlined } from '@mui/icons-material'
// import PetsIcon from '@mui/icons-material/Pets'
// import { Box } from '@mui/material'
// import AppBar from '@mui/material/AppBar'
// import Badge from '@mui/material/Badge'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
// import { onAuthStateChanged, signOut } from 'firebase/auth'
//
// export const Header = () => {
//   const favoritePets = useSelector(selectFavoritePets)
//   const currentUser = useSelector(selectUser)
//   // const currentUser = useSelector((state: RootState) => state.auth.currentUser)
//   const dispatch = useDispatch()
//   const [favoriteCount, setFavoriteCount] = useState(0)
//
//   useEffect(() => {
//     setFavoriteCount(favoritePets.length)
//   }, [favoritePets])
//
//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         dispatch(signOutUser())
//         console.log('signed out successful')
//       })
//       .catch(error => console.log(error))
//   }
//
//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, user => {
//       if (user) {
//         dispatch(setUser(user))
//       } else {
//         dispatch(setUser(null))
//       }
//     })
//
//     return () => {
//       listen()
//     }
//   })
//
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position={'static'}>
//         <Toolbar>
//           <IconButton
//             aria-label={'menu'}
//             color={'inherit'}
//             edge={'start'}
//             size={'large'}
//             sx={{ mr: 2 }}
//           >
//             <PetsIcon viewBox={'0 0 24 24'} />
//           </IconButton>
//           <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
//             FindFurFriends
//           </Typography>
//           {currentUser ? (
//             <>
//               <Button color={'inherit'} component={Link} to={'/'}>
//                 HOME
//               </Button>
//               <Button color={'inherit'} component={Link} to={'/add'}>
//                 ADD NEW PET
//               </Button>
//               <IconButton color={'inherit'} component={Link} to={'/favorites'}>
//                 {favoriteCount > 0 ? (
//                   <Badge badgeContent={favoriteCount} color={'error'}>
//                     <FavoriteBorderOutlined />
//                   </Badge>
//                 ) : (
//                   <FavoriteBorderOutlined />
//                 )}
//               </IconButton>
//               <Button color={'inherit'} onClick={handleSignOut}>
//                 SIGN OUT
//               </Button>
//               <Typography variant={'body1'}>{`as ${currentUser.email}`}</Typography>
//             </>
//           ) : (
//             <>
//               <Button color={'inherit'} component={Link} to={'/'}>
//                 HOME
//               </Button>
//               <Button color={'inherit'} component={Link} to={'/login'}>
//                 Sign In
//               </Button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   )
// }

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
        console.log('Signed out successfully')
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
                SIGN OUT
              </Button>

              <AuthDetails />
            </>
          ) : (
            <>
              <Button color={'inherit'} component={Link} to={'/'}>
                HOME
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