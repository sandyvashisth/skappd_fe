import React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '../src/components/atoms/Link';

const Home: NextPage = () => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' color='primary'>
          SKAPPd - Boilerplate for building faster.
        </Typography>
        <Typography component='h2' color='secondary'>
        with Material UI v5 with Next.js in TypeScript
        </Typography>
        <Link href="/onboarding">User Onboarding</Link>
      </Box>
    </Container>
  );
};

export default Home;
