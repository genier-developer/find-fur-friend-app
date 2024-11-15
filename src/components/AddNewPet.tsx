// import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAppDispatch } from '@/app/hooks'
// import { Header } from '@/components/Header'
// import { addNewPet } from '@/features/petSlice'
// import { Card, Container, FormControl, SelectChangeEvent, Typography } from '@mui/material'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import TextField from '@mui/material/TextField'
// import { v1 } from 'uuid'
//
// const AddNewPet: FC = () => {
//   const [pet, setPet] = useState({
//     petAge: '',
//     petImage: '',
//     petName: '',
//     petSex: '',
//     petType: '',
//     petWeight: '',
//   })
//
//   const [errors, setErrors] = useState({
//     petName: false,
//     petType: false,
//     petAge: false,
//     petWeight: false,
//   })
//
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()
//
//   const newPet = useMemo(
//     () => ({
//       age: +pet.petAge,
//       createdAt: new Date().toISOString(),
//       id: v1(),
//       image: pet.petImage,
//       isAvailable: false,
//       name: pet.petName,
//       sex: pet.petSex,
//       type: pet.petType,
//       updatedAt: new Date().toISOString(),
//       weight: +pet.petWeight,
//     }),
//     [pet]
//   )
//
//   const handleAdd = useCallback(() => {
//     const hasErrors = !pet.petName || !pet.petType || errors.petAge || errors.petWeight
//
//     if (hasErrors) {
//       setErrors({
//         petName: !pet.petName,
//         petType: !pet.petType,
//         petAge: errors.petAge,
//         petWeight: errors.petWeight,
//       })
//       return
//     }
//
//     dispatch(addNewPet(newPet))
//     navigate('/')
//   }, [dispatch, newPet, navigate, pet.petName, pet.petType, errors])
//
//   const handleCancel = useCallback(() => navigate('/'), [navigate])
//
//   const validateField = (name: string, value: string) => {
//     if (name === 'petAge' || name === 'petWeight') {
//       return !/^\d*$/.test(value) // Только цифры
//     }
//     return false
//   }
//
//   const onTextFieldChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
//       const { name, value } = e.target
//
//       setPet(prevPet => ({ ...prevPet, [name]: value }))
//
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         [name]: validateField(name, value),
//       }))
//     },
//     []
//   )
//
//   const commonStyles = {
//     marginBottom: 2,
//     paddingLeft: 0.5,
//     paddingRight: 0.5,
//   }
//
//   return (
//     <>
//       <Header />
//       <Card
//         elevation={10}
//         sx={{
//           margin: '35px auto',
//           maxWidth: 350,
//           padding: 5,
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h5" textAlign={'center'}>
//           ADD NEW PET
//         </Typography>
//         <Container sx={{ marginTop: 4 }}>
//           <TextField
//             fullWidth
//             label="Name"
//             name="petName"
//             onChange={onTextFieldChange}
//             size="small"
//             sx={commonStyles}
//             value={pet.petName}
//             variant="outlined"
//             error={errors.petName}
//             helperText={errors.petName ? 'Name is required' : ''}
//           />
//           <TextField
//             fullWidth
//             label="Age"
//             name="petAge"
//             onChange={onTextFieldChange}
//             size="small"
//             sx={commonStyles}
//             value={pet.petAge}
//             variant="outlined"
//             error={errors.petAge}
//             helperText={errors.petAge ? 'Invalid age format' : ''}
//           />
//           <TextField
//             fullWidth
//             label="Weight, kg"
//             name="petWeight"
//             onChange={onTextFieldChange}
//             size="small"
//             sx={commonStyles}
//             value={pet.petWeight}
//             variant="outlined"
//             error={errors.petWeight}
//             helperText={errors.petWeight ? 'Invalid weight format' : ''}
//           />
//
//           <Box sx={{ display: 'flex', ...commonStyles }}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Sex</InputLabel>
//               <Select label="Sex" name="petSex" onChange={onTextFieldChange} value={pet.petSex}>
//                 <MenuItem value="male">Male</MenuItem>
//                 <MenuItem value="female">Female</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//
//           <Box sx={{ display: 'flex', ...commonStyles }}>
//             <FormControl fullWidth size="small" error={errors.petType}>
//               <InputLabel>Type</InputLabel>
//               <Select label="Type" name="petType" onChange={onTextFieldChange} value={pet.petType}>
//                 <MenuItem value="cat">Cat</MenuItem>
//                 <MenuItem value="dog">Dog</MenuItem>
//               </Select>
//               {errors.petType && <Typography color="error">Type is required</Typography>}
//             </FormControl>
//           </Box>
//
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginTop: 5,
//               ...commonStyles,
//             }}
//           >
//             <Button onClick={handleCancel} variant="contained">
//               Cancel
//             </Button>
//             <Button onClick={handleAdd} variant="contained">
//               Add
//             </Button>
//           </Box>
//         </Container>
//       </Card>
//     </>
//   )
// }
//
// export default AddNewPet

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { Header } from '@/components/Header'
import { addNewPet } from '@/features/petSlice'
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

const AddNewPet: React.FC = () => {
  const [pet, setPet] = useState({
    petAge: '',
    petImage: '',
    petName: '',
    petSex: '',
    petType: '',
    petWeight: '',
  })

  const [errors, setErrors] = useState({
    petName: false,
    petType: false,
    petAge: false,
    petWeight: false,
  })

  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const newPet = useMemo(
    () => ({
      age: +pet.petAge,
      createdAt: new Date().toISOString(),
      id: v1(),
      image: pet.petImage,
      isAvailable: false,
      name: pet.petName,
      sex: pet.petSex,
      type: pet.petType,
      updatedAt: new Date().toISOString(),
      weight: +pet.petWeight,
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
    if (name === 'petAge' || name === 'petWeight') {
      return !/^\d*$/.test(value) // Numeric only
    }
    return false
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
    position: 'absolute' as 'absolute',
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
            <TextField
              fullWidth
              label="Age"
              name="petAge"
              onChange={onTextFieldChange}
              size="small"
              sx={{ marginBottom: 2 }}
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

            <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
              <InputLabel>Sex</InputLabel>
              <Select label="Sex" name="petSex" onChange={onTextFieldChange} value={pet.petSex}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ marginBottom: 2 }} error={errors.petType}>
              <InputLabel>Type</InputLabel>
              <Select label="Type" name="petType" onChange={onTextFieldChange} value={pet.petType}>
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="dog">Dog</MenuItem>
              </Select>
              {errors.petType && <Typography color="error">Type is required</Typography>}
            </FormControl>

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

export default AddNewPet
