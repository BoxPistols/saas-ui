import { Box, Button } from '@mui/material'
import { CancelButton } from './CancelButton'

type Props = {
  cancelText: string
  submitText: string
  type?: 'submit' | 'reset' | 'button'
}

export const ButtonSet = ({
  cancelText,
  submitText,
  type,
  ...props
}: Props) => {
  return (
    <Box display="flex" gap={1}>
      <CancelButton>{cancelText}</CancelButton>
      <Button type={type ? type : 'submit'} {...props}>
        {submitText}
      </Button>
    </Box>
  )
}
