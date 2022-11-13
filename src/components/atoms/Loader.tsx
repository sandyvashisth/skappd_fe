import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type TProps = {
  position?: 'fixed' | 'absolute';
};

export const Loader = ({ position = 'fixed' }: TProps) => {
  return (
    <Box
      data-cy="loader-container"
      sx={{
        display: 'flex',
        position,
        top: 'calc(50% - 48px)',
        left: 'calc(50% - 48px)',
        zIndex: 10,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
