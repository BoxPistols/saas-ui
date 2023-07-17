import { CustomButton } from "."
import { Meta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { StoryObj } from "@storybook/react"

export default {
  title: "Component/CustomButton",
  component: CustomButton,
  argTypes: {
    color: { options: ["primary", "secondary", "error"], control: "select" },
    variant: { options: ["text", "outlined", "contained"], control: "select" },
    size: { options: ["small", "medium", "large"], control: "select" },
    type: { options: ["button", "submit", "reset"], control: "select" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    disabled: false,
    color: "primary",
    variant: "contained",
    size: "medium",
    type: "submit",
  },
} as Meta

type StoryProps = ComponentProps<typeof CustomButton>

export const ButtonProps: StoryObj<StoryProps> = {
  args: { color: "primary" },
  render: (args) => <CustomButton {...args} />,
}
