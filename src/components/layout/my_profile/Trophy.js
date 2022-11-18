// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
// ** Next Imports
import Link from 'next/link'
import { useState, useEffect } from "react";
import api from "services/api";

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

// user details
const user = {
  name: 'Lareb Nawab',
  account_status: 'Pending',

}

export const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  const [userProfile, setUserProfile] = useState({});

  useEffect (() => {
    getUserProfile();
  }, [])

  const getUserProfile = async () => {
    let profile = await api.get("v1/profile");
    setUserProfile(profile.data.data)
  }

  const LinkStyled = styled('a')(({ theme }) => ({
    textDecoration: 'none',
  }))

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Welcome {userProfile.full_name}! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Your Profile is
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
        {userProfile.profile_completed}% Completed and {userProfile.account_status}
        </Typography>
        <Button size='small' variant='contained'>
          <Link passHref href='/account-settings'>
            <LinkStyled>Update Profile</LinkStyled>
          </Link>
          
        </Button>
        <TriangleImg alt='triangle background' src={`/images/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/trophy.png' />
      </CardContent>
    </Card>
  )
}

// export default Trophy
