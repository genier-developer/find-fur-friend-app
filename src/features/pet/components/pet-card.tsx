import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/app/hooks'
import { selectUser } from '@/features/user/slices/auth-slice'
import { addFavoritePet, deleteFavoritePet } from '@/features/pet/slices/pet-slice'
import { Pet } from '@/features/pet/pet-types'
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { removePet } from '@/features/pet/actions/pet-actions'
import { AlertDialog } from '@/shared/components/alert-dialog'

export type PetItemProps = {
  pet: Pet
  isFavorite?: boolean
}

export const PetCard: FC<PetItemProps> = ({ pet, isFavorite = false }) => {
  const currentUser = useSelector(selectUser)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [isFavorites, setIsFavorites] = useState(isFavorite)

  const handleFavoriteClick = () => {
    if (currentUser) {
      if (isFavorites) {
        console.log('Deleted from Favorites: ', pet.id)
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

  useEffect(() => {
    console.log('CurrentUser: ', currentUser?.uid)
  }, [currentUser])

  return (
    <Card elevation={6} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={pet.image} sx={{ height: 200, width: 200 }} />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            {pet.name}
          </Typography>
          {currentUser && isFavorites ? (
            <FavoriteOutlined color="primary" onClick={handleFavoriteClick} />
          ) : (
            <FavoriteBorderOutlined color="primary" onClick={handleFavoriteClick} />
          )}
        </div>
        <Typography color="text.secondary">
          Age: <b>{pet.age}</b>
        </Typography>
        <Typography color="text.secondary">
          Weight, kg: <b>{pet.weight}</b>
        </Typography>
        <Typography color="text.secondary">
          Sex: <b>{pet.sex ? 'Male' : 'Female'}</b>
        </Typography>
        <Typography color="text.secondary">
          Available: <b>{pet.isAvailable ? 'Yes' : 'No'}</b>
        </Typography>
        {pet.ownerId === currentUser?.uid ? (
          <Button sx={{ marginTop: 2 }} variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        ) : (
          <Button variant="contained" sx={{ marginTop: 2 }} disabled>
            Delete
          </Button>
        )}
        {!currentUser && <AlertDialog open={open} onClose={() => setOpen(false)} />}
      </CardContent>
    </Card>
  )
}
