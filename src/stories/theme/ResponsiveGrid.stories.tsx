import { Meta } from "@storybook/react"
import { ResponsiveGrid } from "./ResponsiveGrid"
import Typography from "@mui/material/Typography"

interface ResponsiveGridProps {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  spacing: number
  numberOfCards: number
}

type Props = ResponsiveGridProps

const ResponsiveGridStory: Meta = {
  title: "Stories/Grid",
  component: ResponsiveGrid,
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      control: { type: "select" },
      defaultValue: 4,
      table: { category: "gap" },
    },
    xs: {
      options: [1, 2, 3, 4, 6, 12],
      control: { type: "select" },
      defaultValue: 12,
      table: { category: "breakpoint" },
    },
    sm: {
      options: [1, 2, 3, 4, 6, 12],
      control: { type: "select" },
      defaultValue: 6,
      table: { category: "breakpoint" },
    },
    md: {
      options: [1, 2, 3, 4, 6, 12],
      control: { type: "select" },
      defaultValue: 4,
      table: { category: "breakpoint" },
    },
    lg: {
      options: [1, 2, 3, 4, 6, 12],
      control: { type: "select" },
      defaultValue: 3,
      table: { category: "breakpoint" },
    },
    xl: {
      options: [1, 2, 3, 4, 6, 12],
      control: { type: "select" },
      defaultValue: 2,
      table: { category: "breakpoint" },
    },
    numberOfCards: {
      control: { type: 'range', min: 1, max: 32 },
      defaultValue: 12,
      table: { category: 'properties' },
    },
  },
}

export default ResponsiveGridStory

export const Default = (args: any) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Grid パターン レスポンシブ例
      </Typography>
      <ResponsiveGrid {...args} />
    </>
  )
}

