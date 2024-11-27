import { FC } from 'react'
import { Button, Card, CardActions, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import petIcon from '../../../assets/images/pets-image.svg'
import Divider from '@mui/material/Divider'

export const AddPetButton: FC = () => {
  return (
    <Card elevation={6}>
      <CardMedia component="img" sx={{ height: 200, width: 200 }} image={petIcon} alt="Pet logo" />
      <Divider />
      <CardActions sx={{ margin: 2 }}>
        <Button component={Link} to="/add" variant="contained">
          Add new pet
        </Button>
      </CardActions>
    </Card>
  )
}
