import { ReactNode } from "react";
import { Button } from "@mui/material";

type Props = {
  children: ReactNode;
};

export const CancelButton = ({ children, ...props }: Props) => {
  return (
    <Button variant="outlined" color="secondary" {...props}>
      {children}
    </Button>
  );
};
