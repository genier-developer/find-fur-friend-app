import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { addNewPet, updatePet } from '@/features/pet/actions/pet-actions'
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  SelectChangeEvent,
  Select,
  MenuItem,
} from '@mui/material'
import { v1 } from 'uuid'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/slices/auth-slice'
import { useParams } from 'react-router-dom'
import { getPetByIdFromFirebase } from '@/features/pet/pet-api'
import { Pet } from '@/features/pet/pet-types'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { DragAndDropUploader } from '@/features/pet/components/drag-and-drop-uploader'

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
    sex: '',
    type: '',
    ownerId: currentUser?.uid || '',
    isFavorite: false,
    isAvailable: true,
  })

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
            sex: data.sex || '',
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
  const handleSelectChange = (field: keyof Pet) => (event: SelectChangeEvent<string>) => {
    setPet(prev => ({ ...prev, [field]: event.target.value }))
  }
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        setPet(prev => ({ ...prev, image: reader.result as string }))
      }
    }
    reader.readAsDataURL(file)
  }

  const modalStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    paddingRight: '8px',
    p: 2,
  }

  return (
    <Modal open={isOpen} onClose={() => navigate('/')} aria-labelledby="pet-form-modal-title">
      <Box sx={modalStyles}>
        <Typography id="pet-form-modal-title" variant="h5" align="center" gutterBottom>
          {isEdit ? 'EDIT PET' : 'ADD NEW PET'}
        </Typography>
        <DragAndDropUploader onUpload={handleImageUpload} />
        {pet.image && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Preview:</Typography>
            <img src={pet.image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </Box>
        )}
        <TextField
          label="Name"
          value={pet.name || ''}
          onChange={handleChange('name')}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Type</InputLabel>
          <Select value={pet.type || ''} onChange={handleSelectChange('type')} label="Type">
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="dog">Dog</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Sex</InputLabel>
          <Select value={pet.sex || ''} onChange={handleSelectChange('sex')} label="Sex">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
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
