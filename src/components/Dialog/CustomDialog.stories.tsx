import { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { CustomDialog } from "./CustomDialog"
import { Typography, Button } from "@mui/material"

type Story = StoryObj<typeof CustomDialog>

export default {
  title: "Component/CustomDialog",
  component: CustomDialog,
  tags: ["autodocs"],
} as Meta

const mockContent = (
  <>
    <Typography variant="h3" gutterBottom>
      Cras mattis consectetur purus sit amet fermentum.
    </Typography>
    <Typography gutterBottom mb={8}>
      Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Deleniti quod consequuntur perferendis
      a odit qui exercitationem, omnis delectus? Ducimus eligendi quisquam
      deserunt, tempora sapiente sit ad dolore reiciendis ipsum esse? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Tempore deserunt amet,
      consequuntur perferendis earum mollitia sint saepe quas ullam ducimus nemo
      autem ad a commodi vitae aliquid rerum tenetur eius.
    </Typography>
  </>
)

export const CustomDialogStory = ({}: Story) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <CustomDialog
        open={open}
        title="Modal title"
        onClose={handleClose}
        content={
          <>
            {mockContent}
            {mockContent}
            {mockContent}
            {mockContent}
          </>
        }
        actions={
          <>
            <Button
              autoFocus
              color="secondary"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button autoFocus variant="contained" onClick={handleClose}>
              Save changes
            </Button>
          </>
        }
      />
    </>
  )
}
