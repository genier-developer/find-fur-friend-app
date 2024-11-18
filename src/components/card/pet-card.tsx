import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { selectUser } from '@/features/auth-slice'
import { addFavoritePet, deleteFavoritePet } from '@/features/pet-slice'
import { Pet } from '@/models/pet-types'
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export type PetItemProps = {
  pet: Pet
  isFavorite?: boolean
}

export const PetCard: FC<PetItemProps> = ({ isFavorite, pet }) => {
  const currentUser = useSelector(selectUser)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [isFavorites, setIsFavorites] = useState(isFavorite)

  const handleClose = () => {
    setOpen(false)
  }
  const handleFavoriteClick = () => {
    if (currentUser) {
      if (isFavorite) {
        dispatch(deleteFavoritePet(pet.id))
      } else {
        dispatch(addFavoritePet(pet))
      }
      setIsFavorites(!isFavorite)
    } else {
      setOpen(true)
    }
  }

  return (
    <Card elevation={6} sx={{ maxWidth: 345 }}>
      <CardMedia image={pet.image} sx={{ height: 200, width: 200 }} />
      <CardContent>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <Typography component={'div'} sx={{ marginBottom: 1 }} variant={'h5'}>
            {pet.name}
          </Typography>
          {currentUser && isFavorites ? (
            <FavoriteOutlined color={'primary'} onClick={handleFavoriteClick} />
          ) : (
            <FavoriteBorderOutlined color={'primary'} onClick={handleFavoriteClick} />
          )}
        </div>
        <Typography color={'text.secondary'}>
          Age: <b>{pet.age}</b>
        </Typography>
        <Typography color={'text.secondary'}>
          Weight, kg: <b>{pet.weight}</b>
        </Typography>
        <Typography color={'text.secondary'}>
          Sex: <b>{pet.sex ? 'male' : 'female'}</b>
        </Typography>
        <Typography color={'text.secondary'}>
          Available: <b>{pet.isAvailable ? 'Yes' : 'No'}</b>
        </Typography>
        {!currentUser && (
          <Dialog
            aria-describedby={'alert-dialog-description'}
            aria-labelledby={'alert-dialog-title'}
            onClose={handleClose}
            open={open}
          >
            <DialogContent>
              <DialogContentText id={'alert-dialog-description'}>
                ...you should be logged in
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button autoFocus component={Link} onClick={handleClose} to={'/login'}>
                Login
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
