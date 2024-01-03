import React, { Suspense } from 'react'
import { Meta } from '@storybook/react'
const IconList = React.lazy(() => import('.'))
// import IconList from "."

const meta: Meta<typeof IconList> = {
  title: 'Mui/Icon',
  component: IconList,
  argTypes: {},
}

export default meta

export const Icons = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <IconList />
  </Suspense>
)
