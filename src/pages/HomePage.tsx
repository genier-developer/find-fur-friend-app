import { useEffect, useState } from 'react'
// import {FavoritePetList} from "./FavoritePetList.tsx";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { AddNewPet } from '@/components/AddNewPet'
import { Header } from '@/components/Header'
import { PetList } from '@/components/PetList'
// import { AuthDetails } from '@/components/auth/AuthDetails'
import { SignIn } from '@/components/auth/SignIn'
import { SignUp } from '@/components/auth/SignUp'
import { fetchPets, selectFavoritePets } from '@/features/petSlice'
import { FavoriteBorderOutlined } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export const HomePage = () => {
  const dispatch = useAppDispatch()

  const favoritePets = useSelector(selectFavoritePets)

  const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)

  const handleHomeButtonClick = () => {
    setIsAddNewPetOpen(false)
  }

  useEffect(() => {
    dispatch(fetchPets())
  }, [dispatch])

  useEffect(() => {
    setFavoriteCount(favoritePets.length)
  }, [favoritePets])

  return (
    <>
      <Header />
      {/*<AuthDetails />*/}
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
              <MenuIcon />
            </IconButton>
            <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
              PET SHELTER
            </Typography>
            <Button color={'inherit'} component={Link} onClick={handleHomeButtonClick} to={'/'}>
              Home
            </Button>
            <Button color={'inherit'} onClick={() => setIsAddNewPetOpen(true)}>
              Add New Pet
            </Button>
            <IconButton color={'inherit'} component={Link} to={'/favorites'}>
              {favoriteCount > 0 ? (
                <Badge badgeContent={favoriteCount} color={'error'}>
                  <FavoriteBorderOutlined />
                </Badge>
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ marginBottom: 4, marginTop: 4 }}>
        {isAddNewPetOpen ? (
          <Container sx={{ marginTop: 14 }}>
            <AddNewPet onClose={() => setIsAddNewPetOpen(false)} />
          </Container>
        ) : (
          <PetList />
        )}
        <SignUp />
        <SignIn />
        {/*<FavoritePetList/>*/}
      </Container>
    </>
  )
}
