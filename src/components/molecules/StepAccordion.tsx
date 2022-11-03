import styled from "@emotion/styled";
import { Theme, useMediaQuery } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import theme from "src/theme";
import React, { ReactNode } from "react";

const StyledAccordion = styled(Accordion)`
  min-height: 74px;
  width: 100%;
  border: none;
  box-shadow: none;
  display: flex;
  padding: 0 8px;
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
`;

const Edit = styled(Typography)`
  font-size: 16px;
  line-height: 15px;
  color: #1ec271;
`;

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  "& .MuiAccordionSummary-content": {
    gap: "10px",
    "& p": {
      marginLeft: "0",
    },
    "& p:nth-last-of-type(1)": {
      color: "#1EC271",
      lineHeight: "1.2rem",
      paddingRight: "10px",
    },
  },
}));

type TProps = {
  name: string;
  title: ReactNode;
  value?: any;
  expanded: string;
  handleChange: (accordionName: string) => void;
  children: ReactNode;
  fieldsType: string;
  isError?: any;
};

export const StepAccordion = ({
  name,
  title,
  value,
  expanded,
  handleChange,
  children,
  fieldsType,
  isError,
}: TProps) => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const selectedValues =
    fieldsType === "comboButtonWithInput"
      ? Array.isArray(value) &&
        value.map(({ key, value }) => `${key} ${value}yrs`)
      : value;
  const haveSelectedValues = Array.isArray(selectedValues)
    ? selectedValues.length > 0
    : selectedValues;
  return (
    <StyledAccordion
      square
      expanded={expanded === name}
      sx={{
        background: expanded === name ? "#fff" : "transparent",
        m: `${fieldsType === "comboButtonWithInput" ? "0 !important" : "auto"}`,
        flexDirection: "column",
      }}
    >
      {expanded !== name && (
        <StyledAccordionSummary
          aria-controls={`${name}-content`}
          id={`${name}-header`}
          sx={{
            "& .MuiPaper-root": {
              flexDirection: isDesktop ? "row" : "column",
              minWidth: "100%",
            },
            "& .MuiAccordionSummary-content": {
              flexDirection: isDesktop ? "row" : "column",
            },
          }}
          expandIcon={
            haveSelectedValues && (
              <Edit
                onClick={() => {
                  handleChange(name);
                }}
              >
                Edit
              </Edit>
            )
          }
        >
          <StyledTitle
            onClick={() => {
              handleChange(name);
            }}
          >
            {title}
          </StyledTitle>
          {haveSelectedValues ? (
            <StyledValue sx={{ ml: 2 }}>
              {Array.isArray(selectedValues)
                ? selectedValues.join(", ")
                : selectedValues}
            </StyledValue>
          ) : (
            <EmptyValue
              onClick={() => {
                handleChange(name);
              }}
              sx={{
                color: isError?.message
                  ? "#d32f2f !important"
                  : "rgba(6, 87, 64, 0.4) !important",
              }}
            >
              Select
            </EmptyValue>
          )}
        </StyledAccordionSummary>
      )}
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

StepAccordion.defaultProps = {
  fieldsType: "checkbox",
  value: [],
};
