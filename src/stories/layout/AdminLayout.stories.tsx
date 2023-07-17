import type { Meta, StoryObj } from "@storybook/react"
import { AdminLayout } from "./AdminLayout"

const meta: Meta<typeof AdminLayout> = {
  title: "Layout/AdminLayout",
  component: AdminLayout,
  // tags: ["autodocs"],
  argTypes: {
    numberOfCards: { control: { type: "range", min: 0, max: 12, step: 1 } },
    numberOfColumns: { control: { type: "range", min: 0, max: 12, step: 1 } },
    // columnDefs: { control: { type: "object" } },
    // rowData: { control: { type: "object" } },
  },
}

export default meta
type Story = StoryObj<typeof AdminLayout>

export const FullWidth: Story = {
  args: {
    numberOfCards: 1,
    numberOfColumns: 1,
  },
}

export const Four: Story = {
  args: {
    numberOfCards: 4,
    numberOfColumns: 4,
  },
}

export const Six: Story = {
  args: {
    numberOfCards: 6,
    numberOfColumns: 6,
  },
}
