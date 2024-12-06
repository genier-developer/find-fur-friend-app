import { FC } from 'react'
import { Button, Card, CardActions, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import petIcon from '../../../assets/icons/pets-image.svg'
import Divider from '@mui/material/Divider'

export const AddPetButton: FC = () => {
  return (
    <Card elevation={6}>
      <CardMedia
        component="img"
        sx={{
          height: '200px',
          backgroundColor: '#f0f0f0',
        }}
        image={petIcon}
        alt="Pet logo"
      />
      <Divider />
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Button component={Link} to="/add" variant="contained">
          Add pet
        </Button>
      </CardActions>
    </Card>
  )
}
