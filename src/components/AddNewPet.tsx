import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { Header } from '@/components/Header'
import { addNewPet } from '@/features/petSlice'
import { Card, Container, FormControl, SelectChangeEvent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { v1 } from 'uuid'

type AddNewPetProps = {
  onClose: () => void
}

export const AddNewPet: React.FC<AddNewPetProps> = ({ onClose }) => {
  const [pet, setPet] = useState({
    petAge: '',
    petImage: '',
    petName: '',
    petSex: '',
    petType: '',
    petWeight: '',
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const newPet = {
    age: +pet.petAge,
    createdAt: new Date().toISOString(),
    id: v1(),
    image: '',
    isAvailable: false,
    name: pet.petName,
    sex: pet.petSex,
    type: pet.petType,
    updatedAt: new Date().toISOString(),
    weight: +pet.petWeight,
  }
  const handleAdd = () => {
    dispatch(addNewPet(newPet))
    navigate('/home')
  }
  const handleCancel = () => {
    navigate('/home')
  }
  const onTextFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    textField: string
  ) => {
    setPet({ ...pet, [textField]: e.target.value })
  }

  return (
    <>
      <Header />
      <Card
        elevation={10}
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '35px',
          maxWidth: 250,
          padding: 5,
          textAlign: 'center',
        }}
      >
        <Typography variant={'h5'}>ADD NEW PET</Typography>
        <Container sx={{ marginTop: 2 }}>
          <TextField
            id={'outlined-basic-type'}
            label={'Name'}
            onChange={e => onTextFieldChange(e, 'petName')}
            size={'small'}
            sx={{ marginBottom: 2 }}
            value={pet.petName}
            variant={'outlined'}
          />
          <TextField
            id={'outlined-basic-type'}
            label={'Age'}
            onChange={e => onTextFieldChange(e, 'petAge')}
            size={'small'}
            sx={{ marginBottom: 2 }}
            value={pet.petAge}
            variant={'outlined'}
          />
          <TextField
            id={'outlined-basic-type'}
            label={'Weight, kg'}
            onChange={e => onTextFieldChange(e, 'petWeight')}
            size={'small'}
            sx={{ marginBottom: 2 }}
            value={pet.petWeight}
            variant={'outlined'}
          />

          <Box sx={{ alignSelf: 'left', display: 'flex', marginBottom: 2, textAlign: 'left' }}>
            <FormControl fullWidth size={'small'} sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
              <InputLabel>Sex</InputLabel>
              <Select
                label={'Sex'}
                onChange={e => onTextFieldChange(e, 'petSex')}
                value={pet.petSex}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ alignSelf: 'left', display: 'flex', marginBottom: 2, textAlign: 'left' }}>
            <FormControl fullWidth size={'small'} sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
              <InputLabel>Type</InputLabel>
              <Select
                label={'Type'}
                onChange={e => onTextFieldChange(e, 'petType')}
                value={pet.petType}
              >
                <MenuItem value={'cat'}>Cat</MenuItem>
                <MenuItem value={'dog'}>Dog</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 5,
              paddingLeft: 0.5,
              paddingRight: 0.5,
            }}
          >
            <Button onClick={handleCancel} variant={'contained'}>
              Cancel
            </Button>
            <Button onClick={handleAdd} variant={'contained'}>
              Add
            </Button>
          </Box>
        </Container>
      </Card>
    </>
  )
}
