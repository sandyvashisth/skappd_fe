import React, { ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import theme from 'src/theme';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledBox = styled(Box) <{ selected: boolean }>`
box-sizing: border-box;
display: inline-flex;
justify-content: center;
align-items: center;
margin-bottom: 16px;
&:not(:last-child){
  margin-right: 16px;
}
border: ${(props) => `1px solid ${props.selected ? theme.palette.secondary.dark : '#212121'}`};
border-radius: 4px;
cursor: pointer;
width: 264px;
height: 106px;
&:hover: {
  boxShadow:
    0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px rgba(13, 34, 89, 0.14), 0px 1px 14px rgba(13, 34, 89, 0.12);
}
`;

interface TParams {
  icon?: ReactNode;
  value: string;
  isSelected: boolean;
  onSelect: (key: string) => void;
  title: string;
  subTitle?: string;
}

export const FormCustomRadioField = (props: TParams) => {
  const { icon = null, value, isSelected, onSelect, title, subTitle } = props;

  const onClick = () => {
    onSelect(value);
  };

  return (
    <StyledBox
      onClick={onClick}
      selected={isSelected}
    >
      <Typography sx={{
        fontWidth: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        {isSelected ? 
        <CheckCircleIcon color="success" />: <RadioButtonUncheckedIcon color="success" />}{title}
      </Typography>
      <Typography component="p">
        {subTitle}
      </Typography>
    </StyledBox>
  );
};
