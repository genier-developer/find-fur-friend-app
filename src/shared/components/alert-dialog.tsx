import * as React from 'react'
import { Link } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add'
import PetsIcon from '@mui/icons-material/Pets'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export const AlertDialog = () => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleClickOpen} variant={'outlined'}>
        <AddIcon sx={{ fontSize: 50 }} />
        <PetsIcon sx={{ fontSize: 80 }} />
      </Button>

      <Dialog
        aria-describedby={'alert-dialog-description'}
        aria-labelledby={'alert-dialog-title'}
        onClose={handleClose}
        open={open}
      >
        {/*<DialogTitle id={'alert-dialog-title'}>{'Want to add new pet?'}</DialogTitle>*/}
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
    </>
  )
}
