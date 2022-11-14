// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
// import TrendingUp from 'mdi-material-ui/TrendingUp'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import CellphoneLink from 'mdi-material-ui/CellphoneLink'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import EmailAlert from 'mdi-material-ui/EmailAlertOutline'
// import EmailSend from 'mdi-material-ui/EmailSendOutline'
// import Cancel from 'mdi-material-ui/Cancel'
// import FlashAlert from 'mdi-material-ui/FlashAlertOutline'

const salesData = [
  {
    stats: '49',
    title: 'New Jobs',
    color: 'primary',
    icon: <TrendingUpOutlinedIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '10',
    title: 'Applied',
    color: 'info',
    icon: <TrendingUpOutlinedIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '5',
    color: 'success',
    title: 'Response',
    icon: <TrendingUpOutlinedIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '3',
    color: 'warning',
    title: 'Rejected',
    icon: <TrendingUpOutlinedIcon sx={{ fontSize: '1.75rem' }} />
  }
]

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

export const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Job Statistics'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth in new Job post
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

// export default StatisticsCard
