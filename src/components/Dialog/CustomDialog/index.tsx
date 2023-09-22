import * as React from "react"
import {
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Theme } from "@mui/material/styles"

interface CustomDialogProps {
  open: boolean
  title: string
  content: React.ReactNode
  actions: React.ReactNode
  onClose: () => void
}

const StyledDialog = styled(Dialog)(({ theme }: { theme: Theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

export const CustomDialog = ({
  open,
  title,
  content,
  actions,
  onClose,
}: CustomDialogProps) => {
  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </StyledDialog>
  )
}
