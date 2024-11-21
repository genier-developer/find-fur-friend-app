import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { FC } from 'react'

type AlertDialogProps = {
  open: boolean
  onClose: () => void
}

export const AlertDialog: FC<AlertDialogProps> = ({ open, onClose }) => (
  <Dialog
    aria-describedby="alert-dialog-description"
    aria-labelledby="alert-dialog-title"
    onClose={onClose}
    open={open}
  >
    <DialogContent>
      <DialogContentText id="alert-dialog-description">You should be logged in</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button autoFocus component={Link} onClick={onClose} to="/login">
        Login
      </Button>
    </DialogActions>
  </Dialog>
)
