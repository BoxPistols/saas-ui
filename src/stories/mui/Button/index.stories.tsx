import type { Meta } from "@storybook/react";
import {
  Button,
  ButtonTypeMap,
  ExtendButtonBase,
  Typography,
} from "@mui/material";
// mock
import SendIcon from "@mui/icons-material/Send";

const meta: Meta<typeof Button> = {
  title: "Mui/Button",
  component: Button,
  // tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["contained", "outlined", "text"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    color: {
      control: {
        type: "select",
        options: [
          "inherit",
          "primary",
          "secondary",
          "error",
          "info",
          "success",
          "warning",
        ],
      },
    },
  },
};

export default meta;

export const Variants = {
  args: {
    children: "Button",
  },
  render: (args: ExtendButtonBase<ButtonTypeMap<object, "button">>) => (
    <>
      <Typography variant="body2" gutterBottom>
        Buttonバリエーション検証
      </Typography>
      <Button {...args} />
    </>
  ),
  argTypes: {
    variant: {
      defaultValue: "contained",
      control: { type: "select" },
      options: ["contained", "text", "outlined"],
    },
    color: {
      defaultValue: "primary",
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
        "inherit",
      ],
    },
    size: {
      defaultValue: "medium",
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

export const Contained = {
  args: {
    children: "Button",
    variant: "contained",
  },
};

export const Outlined = {
  args: {
    children: "Button",
    variant: "outlined",
  },
};

export const Text = {
  args: {
    children: "Button",
    variant: "text",
  },
};

export const StartIcon = {
  args: {
    children: "Button",
    startIcon: <SendIcon />,
    variant: "contained",
  },
};

// error
export const Error = {
  args: {
    children: "Button",
    color: "error",
    variant: "contained",
  },
};

// disabled
export const Disabled = {
  args: {
    children: "Button",
    disabled: true,
    variant: "contained",
  },
};

// custom with sx @info: https://mui.com/system/getting-started/the-sx-prop/
export const Custom = {
  args: {
    children: "Button",
    variant: "outlined",
    sx: {
      minWidth: 240,
      maxWidth: 480,
      color: "dimgray",
      background: "white",
      borderColor: "dimgray",
      borderRadius: "3em",
      "&:hover": {
        borderColor: "darkgray",
        background: "lightgray",
      },
    },
  },
};
