// ** MUI Imports
import {
  Box,
  Card,
  Tooltip,
  IconButton,
  Button
} from '@mui/material';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const CardTwitter = ({title, message, time}) => {
  return (
    <Card sx={{ mb: 2,border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'info.main' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(2, 3, 2.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2, alignItems: 'center', color: 'common.white' }}
        >
          {/* <FacebookOutlinedIcon sx={{ marginRight: 2.5 }} /> */}
          {title}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 2, color: 'common.white' }}>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <WatchLaterOutlinedIcon />
            <Typography variant='body2' sx={{ color: 'common.white' }}>
              {time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Delete">
              <IconButton sx={{ color: 'common.white' }}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardTwitter
