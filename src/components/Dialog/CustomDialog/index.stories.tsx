import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { CustomDialog } from '.'
import { Default } from '@/stories/theme/ResponsiveGrid.stories'

type Story = StoryObj<typeof CustomDialog>
type CustomDialogStoryProps = ComponentProps<typeof CustomDialog>

export default {
  title: 'Component/CustomDialog',
  component: CustomDialog,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    content: { control: 'text' },
    actions: { control: 'text' },
    IconClose: { control: 'boolean' }, // IconClose のためのコントローラを追加
  },
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

type ActionsProps = {
  handleClose: () => void
  handleSubmit: () => void
}

const Actions = ({ handleClose, handleSubmit }: ActionsProps) => (
  <>
    <Button onClick={handleClose} color="secondary" variant="outlined">
      Cancel
    </Button>
    <Button onClick={handleSubmit} variant="contained">
      Save changes
    </Button>
  </>
)

export const CustomDialogStory = (args: any) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleSubmit = (): void => {
    setOpen(false), alert('Submit!')
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>

      <CustomDialog
        {...args} // args を利用してコンポーネントのプロパティを渡す
        open={open}
        onClose={handleClose}
        actions={
          <Actions handleClose={handleClose} handleSubmit={handleSubmit} />
        }
      />
    </>
  )
}

CustomDialogStory.args = {
  title: 'Dialog title',
  IconClose: true,
  content: (
    <>
      {mockContent}
      {mockContent}
      {mockContent}
      {mockContent}
    </>
  ),
}

Default(CustomDialogStory)
