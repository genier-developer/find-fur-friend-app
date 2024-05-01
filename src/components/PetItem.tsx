import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/app/hooks'
import {
  addFavoritePet,
  deleteFavoritePet,
  removePet,
  selectFavoritePets,
  updatePet,
} from '@/features/petSlice'
import { Pet } from '@/models/Pet'
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'

export type PetItemProps = {
  pet: Pet
}

export const PetItem: React.FC<PetItemProps> = ({ pet }) => {
  const [updatedPet, setUpdatedPet] = useState<Pet>(pet)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useAppDispatch()

  const favorites = useSelector(selectFavoritePets)
  const isFavoritePet = favorites.find(favPet => favPet.id === pet.id)

  const handleDeletePet = () => {
    dispatch(removePet(pet.id))
  }
  const handleToggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleCancelEditing = () => {
    setUpdatedPet(pet)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: number | string) => {
    setUpdatedPet(prevPet => ({
      ...prevPet,
      [field]: value,
    }))
  }

  const handleUpdatePet = () => {
    dispatch(updatePet(updatedPet))
    setIsEditing(false)
  }

  const handleAddFavoritePet = () => {
    dispatch(addFavoritePet(pet))
  }
  const handleDeleteFavoritePet = () => {
    dispatch(deleteFavoritePet(pet.id))
  }

  return (
    <Card elevation={6} sx={{ maxWidth: 345 }}>
      <CardMedia image={pet.image} sx={{ height: 200, width: 200 }} />
      <CardContent>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          {isEditing ? (
            <TextField
              label={pet.name}
              onChange={e => handleInputChange('name', e.target.value)}
              size={'small'}
              type={'text'}
              value={updatedPet.name}
            />
          ) : (
            <Typography component={'div'} sx={{ marginBottom: 1 }} variant={'h5'}>
              {pet.name}
            </Typography>
          )}

          {isFavoritePet ? (
            <FavoriteOutlined color={'primary'} onClick={handleDeleteFavoritePet} />
          ) : (
            <FavoriteBorderOutlined color={'primary'} onClick={handleAddFavoritePet} />
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
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {!isEditing && (
          <Button onClick={handleToggleEditing} size={'small'}>
            Update
          </Button>
        )}
        {isEditing && (
          <>
            <Button onClick={handleUpdatePet} size={'small'}>
              Save
            </Button>
            <Button onClick={handleCancelEditing} size={'small'}>
              Cancel
            </Button>
          </>
        )}
        {!isEditing && (
          <Button onClick={handleDeletePet} size={'small'}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
