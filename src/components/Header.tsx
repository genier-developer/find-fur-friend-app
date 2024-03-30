import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '@/app/store'
import { signOutUser } from '@/features/authSlice'
import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export const Header = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOutUser())
  }
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

// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { signOutUser } from '../features/authSlice.ts';
// import {RootState} from "../app/store.ts";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
//
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
//
// import {Box} from "@mui/material";
// export const Header = () => {
//     const currentUser = useSelector((state: RootState) => state.auth.currentUser);
//     const dispatch = useDispatch();
//
//     const handleSignOut = () => {
//         dispatch(signOutUser());
//     };
//     const image = 'src/assets/images/pet-svgrepo-logo-header.svg'
//     return (
//             <Box sx={{ flexGrow: 1}}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         <IconButton
//                             size="large"
//                             edge="start"
//                             color="inherit"
//                             aria-label="menu"
//                             sx={{ mr: 2 }}
//                         >
//                             <img src={image} alt={'logo'} width={'32px'}/>
//                         </IconButton>
//                         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                             PET SHELTER
//                         </Typography>
//                         <Button
//                             component={Link}
//                             to="/pets"
//                             color="inherit"
//                         >   Home
//                         </Button>
//                         <>
//                             {currentUser ? (
//                                 <>
//                                     <Button component={Link} to="/add" color="inherit">ADD NEW PET</Button>
//                                     <Button component={Link} color="inherit" to="/favorites">Favorites</Button>
//                                     <Button color="inherit" onClick={handleSignOut}>SIGN OUT</Button>
//                                 </>
//                             ) : (
//                                 <Link to="/login">Sign In</Link>
//                             )}
//                         </>
//                     </Toolbar>
//                 </AppBar>
//             </Box>
//     );
// };
