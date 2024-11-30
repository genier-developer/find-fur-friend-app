import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { Header } from '@/shared/components/header'
import { addNewPet } from '@/features/pet/actions/pet-actions'
import {
  Modal,
  Box,
  Container,
  FormControl,
  SelectChangeEvent,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { v1 } from 'uuid'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/slices/auth-slice'

const PetForm: FC = () => {
  const currentUser = useSelector(selectUser)
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [pet, setPet] = useState({
    petId: '',
    petAge: '',
    petImage: '',
    petName: '',
    petSex: '',
    petType: '',
    petWeight: '',
    ownerId: '',
    isFavorite: false,
  })

  const [errors, setErrors] = useState({
    petName: false,
    petType: false,
    petAge: false,
    petWeight: false,
  })

  const newPet = useMemo(
    () => ({
      age: +pet.petAge,
      createdAt: new Date().toISOString(),
      id: v1(),
      image: pet.petImage,
      isAvailable: true,
      name: pet.petName,
      sex: pet.petSex,
      type: pet.petType,
      updatedAt: new Date().toISOString(),
      weight: parseFloat(pet.petWeight.replace(',', '.')),
      ownerId: currentUser?.uid,
      isFavorite: false,
    }),
    [pet]
  )

  const handleAdd = useCallback(() => {
    const hasErrors = !pet.petName || !pet.petType || errors.petAge || errors.petWeight

    if (hasErrors) {
      setErrors({
        petName: !pet.petName,
        petType: !pet.petType,
        petAge: errors.petAge,
        petWeight: errors.petWeight,
      })
      return
    }

    dispatch(addNewPet(newPet))
    setIsOpen(false)
    navigate('/')
  }, [dispatch, newPet, navigate, pet.petName, pet.petType, errors])

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    navigate('/')
  }, [navigate])

  const handleCloseModal = () => {
    setIsOpen(false)
    navigate('/')
  }

  const validateField = (name: string, value: string) => {
    if (name === 'petAge') {
      return !/^\d+$/.test(value)
    }
    if (name === 'petWeight') {
      return !/^\d+([.,]\d+)?$/.test(value) //accept decimal numbers
    }
  }

  const onTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
      const { name, value } = e.target

      setPet(prevPet => ({ ...prevPet, [name]: value }))

      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }))
    },
    []
  )

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
    <>
      <Header />
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-new-pet-modal-title"
        aria-describedby="add-new-pet-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="add-new-pet-modal-title" variant="h5" align="center">
            ADD NEW PET
          </Typography>
          <Container sx={{ marginTop: 3 }}>
            <TextField
              required
              fullWidth
              label="Name (required)"
              name="petName"
              onChange={onTextFieldChange}
              size="small"
              sx={{ marginBottom: 2 }}
              value={pet.petName}
              variant="outlined"
              error={errors.petName}
              helperText={errors.petName ? 'Name is required' : ''}
            />

            <FormControl fullWidth size="small" sx={{ marginBottom: 2 }} error={errors.petType}>
              <InputLabel>Type</InputLabel>
              <Select label="Type" name="petType" onChange={onTextFieldChange} value={pet.petType}>
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="dog">Dog</MenuItem>
              </Select>
              {errors.petType && <Typography color="error">Type is required</Typography>}
            </FormControl>

            <TextField
              fullWidth
              label="Age"
              name="petAge"
              onChange={onTextFieldChange}
              size="small"
              sx={{ marginBottom: 1 }}
              value={pet.petAge}
              variant="outlined"
              error={errors.petAge}
              helperText={errors.petAge ? 'Invalid age format' : ''}
            />
            <TextField
              fullWidth
              label="Weight, kg"
              name="petWeight"
              onChange={onTextFieldChange}
              size="small"
              sx={{ marginBottom: 2 }}
              value={pet.petWeight}
              variant="outlined"
              error={errors.petWeight}
              helperText={errors.petWeight ? 'Invalid weight format' : ''}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 3,
              }}
            >
              <Button onClick={handleCancel} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleAdd} variant="contained">
                Add
              </Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  )
}

export default PetForm
