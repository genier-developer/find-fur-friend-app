import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { addNewPet, updatePet } from '@/features/pet/actions/pet-actions'
import { Modal, Box, Typography, Button, TextField } from '@mui/material'
import { v1 } from 'uuid'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/slices/auth-slice'
import { useParams } from 'react-router-dom'
import { getPetByIdFromFirebase } from '@/features/pet/pet-api'
import { Pet } from '@/features/pet/pet-types'

const PetForm: FC = () => {
  const { id } = useParams<{ id: string }>()
  const currentUser = useSelector(selectUser)
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useAppDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  const [pet, setPet] = useState<Partial<Pet>>({
    id: '',
    age: 0,
    weight: 0,
    image: '',
    name: '',
    sex: 'Unknown',
    type: '',
    ownerId: currentUser?.uid || '',
    isFavorite: false,
    isAvailable: true,
  })

  const newPet = useMemo<Pet>(
    () => ({
      age: +pet.age!,
      createdAt: new Date().toISOString(),
      id: v1(),
      image: pet.image || '',
      isAvailable: true,
      name: pet.name!,
      sex: pet.sex || 'Unknown',
      type: pet.type!,
      updatedAt: new Date().toISOString(),
      weight: pet.weight,
      ownerId: currentUser?.uid || '',
      isFavorite: false,
    }),
    [pet, currentUser?.uid]
  )

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      getPetByIdFromFirebase(id).then(data => {
        if (data) {
          setPet({
            id: data.id,
            age: data.age.toString(),
            weight: data.weight.toString(),
            image: data.image || '',
            name: data.name || '',
            sex: data.sex || 'Unknown',
            type: data.type || '',
            ownerId: data.ownerId || '',
            isFavorite: data.isFavorite ?? false,
            isAvailable: data.isAvailable ?? true,
          })
        }
      })
    }
  }, [id])

  const [errors, setErrors] = useState({
    petName: false,
    petType: false,
    petAge: false,
    petWeight: false,
  })

  const handleSave = useCallback(() => {
    const hasErrors =
      !pet.name || !pet.type || !pet.age || !pet.weight || errors.petAge || errors.petWeight

    if (hasErrors) {
      alert('All required fields must be filled out.')
      setErrors({
        petName: !pet.name,
        petType: !pet.type,
        petAge: !pet.age,
        petWeight: !pet.weight,
      })
      return
    }

    const updatedPet: Pet = {
      id: pet.id || v1(),
      age: pet.age,
      createdAt: isEdit ? pet.createdAt! : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      image: pet.image || '',
      isAvailable: pet.isAvailable ?? true,
      name: pet.name!,
      sex: pet.sex || 'Unknown',
      type: pet.type!,
      weight: pet.weight,
      ownerId: pet.ownerId || currentUser?.uid || '',
      isFavorite: pet.isFavorite || false,
    }

    if (isEdit) {
      dispatch(
        updatePet({
          ...pet,
          age: +pet.age!,
          weight: +pet.weight!,
          updatedAt: new Date().toISOString(),
        } as Pet)
      )
    } else {
      dispatch(
        addNewPet({
          ...pet,
          id: v1(),
          age: +pet.age!,
          weight: +pet.weight!,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Pet)
      )
    }

    setIsOpen(false)
    navigate('/')
  }, [dispatch, pet, isEdit, currentUser?.uid, errors, navigate])

  const handleClose = () => {
    setIsOpen(false)
    navigate('/')
  }

  const handleChange = (field: keyof Pet) => (e: ChangeEvent<HTMLInputElement>) => {
    setPet(prev => ({ ...prev, [field]: e.target.value }))
  }

  const modalStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal open={isOpen} onClose={() => navigate('/')} aria-labelledby="pet-form-modal-title">
      <Box sx={modalStyles}>
        <Typography id="pet-form-modal-title" variant="h5" align="center" gutterBottom>
          {isEdit ? 'EDIT PET' : 'ADD NEW PET'}
        </Typography>
        <TextField
          label="Name"
          value={pet.name || ''}
          onChange={handleChange('name')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Type"
          value={pet.type || ''}
          onChange={handleChange('type')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          type="number"
          value={pet.age || ''}
          onChange={handleChange('age')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Weight"
          type="number"
          value={pet.weight || ''}
          onChange={handleChange('weight')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          value={pet.image || ''}
          onChange={handleChange('image')}
          fullWidth
          margin="normal"
        />
        <Box display={'flex'} justifyContent={'space-between'} sx={{ marginTop: 3 }}>
          <Button onClick={handleSave} variant="contained">
            {isEdit ? 'Save Changes' : 'Add'}
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default PetForm
