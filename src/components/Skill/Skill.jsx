import React from 'react';
import { Box, Label, Description } from "./Skill.styles";

export const Skill = ({ label, description, responsive = true }) => {
  return (
    <Box responsive={responsive}>
      <Label responsive={responsive}>{label}</Label>
      {
        description &&
        <Description responsive={responsive}>{description}</Description>
      }
    </Box>
  );
};
