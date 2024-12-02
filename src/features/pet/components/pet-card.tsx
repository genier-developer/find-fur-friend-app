import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/app/hooks'
import { selectUser } from '@/features/user/slices/auth-slice'
import { addFavoritePet, deleteFavoritePet } from '@/features/pet/slices/pet-slice'
import { Pet } from '@/features/pet/pet-types'
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material'
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material'
import { removePet } from '@/features/pet/actions/pet-actions'
import { AlertDialog } from '@/shared/components/alert-dialog'
import { useNavigate } from 'react-router-dom'
import defaultCatImage from '../../../assets/images/cat-default.svg'
import defaultDogImage from '../../../assets/images/dog-default.svg'

export type PetItemProps = {
  pet: Pet
  isFavorite?: boolean
}

export const PetCard: FC<PetItemProps> = ({ pet, isFavorite = false }) => {
  const currentUser = useSelector(selectUser)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [isFavorites, setIsFavorites] = useState(isFavorite)
  const navigate = useNavigate()

  const handleFavoriteClick = () => {
    if (currentUser) {
      if (isFavorites) {
        dispatch(deleteFavoritePet(pet.id))
      } else {
        dispatch(addFavoritePet(pet))
      }
      setIsFavorites(!isFavorites)
    } else {
      setOpen(true)
    }
  }

  const handleDelete = () => {
    dispatch(removePet(pet.id))
  }

  const renderFavoriteIcon = () =>
    currentUser && isFavorites ? (
      <FavoriteOutlined color="primary" onClick={handleFavoriteClick} />
    ) : (
      <FavoriteBorderOutlined color="primary" onClick={handleFavoriteClick} />
    )

  const renderOwnerActions = () => (
    <Box display="flex" justifyContent="space-between" mt={2}>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(`/edit/${pet.id}`)}>
        Edit
      </Button>
      <Button variant="contained" sx={{ mt: 2 }} color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  )

  const renderNoOwnerActions = () => (
    <Box display="flex" justifyContent="space-between" mt={2}>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        Edit
      </Button>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        Delete
      </Button>
    </Box>
  )

  return (
    <Card elevation={6} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // objectFit: 'contain', // чтобы изображение масштабировалось с учетом пропорций
          backgroundColor: '#f0f0f0',
        }}
        image={pet.image || (pet.type === 'cat' ? defaultCatImage : defaultDogImage)}
      />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5">{pet.name}</Typography>
          {renderFavoriteIcon()}
        </Box>
        <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
          Type: <b>{pet.type}</b>
        </Typography>
        <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
          Age: <b>{pet.age}</b>
        </Typography>
        <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
          Weight, kg: <b>{pet.weight}</b>
        </Typography>
        <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
          Sex: <b>{pet.sex ? 'Male' : 'Female'}</b>
        </Typography>
        <Typography color="text.secondary">
          Available: <b>{pet.isAvailable ? 'Yes' : 'No'}</b>
        </Typography>
        {pet.ownerId === currentUser?.uid ? renderOwnerActions() : renderNoOwnerActions()}
        {!currentUser && <AlertDialog open={open} onClose={() => setOpen(false)} />}
      </CardContent>
    </Card>
  )
}
