import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
import { Header } from '@/shared/components/header'
import { PetCard } from '@/features/pet/components/pet-card'
import { selectFavoritePets } from '@/features/pet/slices/pet-slice'
import { Pet } from '@/features/pet/pet-types'
import { Box, Container, Grid, LinearProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FavoriteBorder } from '@mui/icons-material'

const FavoritePetList = () => {
  const favoritePets = useSelector(selectFavoritePets)
  const navigate = useNavigate()
  const isLoading = useAppSelector(state => state.pet.isLoading)

  useEffect(() => {
    if (!isLoading && favoritePets.length === 0) {
      const timer = setTimeout(() => {
        navigate(-1)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [favoritePets, isLoading, navigate])

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '35px' }}>
        <Grid alignItems={'center'} container justifyContent={'center'} spacing={5}>
          {favoritePets.length > 0 ? (
            favoritePets.map((pet: Pet) => (
              <Grid item key={pet.id}>
                <PetCard isFavorite pet={pet} />
              </Grid>
            ))
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <FavoriteBorder sx={{ fontSize: 40, color: 'text.primary', marginBottom: 1 }} />
              <Typography variant="h6" sx={{ color: 'text.primary', textAlign: 'center' }}>
                You don&apos;t have any favorites yet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  marginTop: 1,
                  textAlign: 'center',
                }}
              >
                Add your favorite pets to this list!
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default FavoritePetList
