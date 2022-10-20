import styled from "@emotion/styled";
import { Button } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

const StyledAccordion = styled(Accordion)`
  min-height: 74px;
  width: 100%;
  border: none;
  box-shadow: none;
  display: flex;
  padding: 0 8px;
  background: ${({ expanded }) => `${expanded ? '#fff': 'transparent'}`};
`;

const StyledTitle = styled(Typography)`
  color: #065740;
  font-size: 16px;
  line-height: 15px;
  font-weight: 500;
  min-width: 160px;
`;

const StyledValue = styled(Typography)`
  color: #000;
  font-size: 16px;
  line-height: 15px;
  font-weight: 500;
`;

const EmptyValue = styled(Typography)`
  font-size: 16px;
  line-height: 15px;
  color: rgba(6, 87, 64, 0.4);
`;

const Edit = styled(Typography)`
  font-size: 16px;
  line-height: 15px;
  color: #1ec271;
`;

type TProps = {
  name: string;
  title: ReactNode;
  value?: string;
  expanded: string;
  handleChange: (accordionName: string) => void;
  children: ReactNode;
};

export const StepAccordion = ({
  name,
  title,
  value,
  expanded,
  handleChange,
  children,
}: TProps) => {
  return (
    <StyledAccordion square expanded={expanded === name}>
      {expanded !== name && (
        <AccordionSummary
          aria-controls={`${name}-content`}
          id={`${name}-header`}
          sx={{ minWidth: '100%'}}
          expandIcon={
            value && <Edit
              onClick={() => {
                handleChange(name);
              }}
            >
              Edit
            </Edit>
          }
        >
          <StyledTitle
            onClick={() => {
              handleChange(name);
            }}
          >
            {title}
          </StyledTitle>
          {value ? (
            <StyledValue
              sx={{ ml: 2 }}
            >
              {Array.isArray(value)? value.join(', '): value}
            </StyledValue>
          ) : (
            <EmptyValue
              onClick={() => {
                handleChange(name);
              }}
            >
              Select
            </EmptyValue>
          )}
        </AccordionSummary>
      )}
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};
