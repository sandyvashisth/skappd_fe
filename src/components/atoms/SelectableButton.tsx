import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)(({ selected }: { selected: boolean }) => ({
  fontSize: "13px",
  color: selected ? "#2E7D32" : "#000000DE",
  borderColor: selected ? "#2E7D3280" : "#00000042",
  padding: "7px 10px",
  backgroundColor: selected ? "#2E7D320A" : "transparent",
}));

export default function SelectableButton({
  isButtonSelected,
  label,
  id,
  key,
  updateBenefits,
}: {
  isButtonSelected: boolean;
  label: string;
  id: string;
  key: string;
  updateBenefits: Function;
}) {
  const [selected, setSelected] = React.useState<boolean>(isButtonSelected);

  const handleClick = () => {
    setSelected(!selected);
    updateBenefits(!selected);
  };
  return (
    <StyledButton variant="outlined" selected={selected} onClick={handleClick}>
      {label}
    </StyledButton>
  );
}
