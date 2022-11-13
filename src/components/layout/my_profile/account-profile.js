import * as React from 'react';

import {
    Avatar,
    Box,
    Button,
    Link,
    Card,
    CardActions,
    CardContent,
    Divider,
    Tooltip,
    IconButton,
    Typography,
    useMediaQuery
} from '@mui/material';
import { PersonalDetails } from "@components/organisms/PersonalDetails";


import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Lareb Nawab',
    discipline: 'Occupational Therapist'
};

export const ONBOARDING_VIEW = {
    personal_details: PersonalDetails,
    job_preferences: JobPreferences,
    setup_your_discipline: SetupYourDiscipline,
    education_certifications: EducationCertification,
    level_of_comfort: LevelOfComfort,
    location_preferences: LocationPreferences,
    benefits_priorities: BenefitsPriorities,
};
const classes = theme => ({
    root: {
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px 0`,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit / 2,
        top: theme.spacing.unit / 2,
        color: theme.palette.grey[500],
    },
})
export const AccountProfile = (props) => {

    const [open, setOpen] = React.useState(false);
    const [displayView, setDisplayView] = React.useState('personal_details');
    const View = ONBOARDING_VIEW[displayView];

    const handleClickOpen = (displayView) => {
        setDisplayView(displayView);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const View = () => {
    //     return ONBOARDING_VIEW[displayView]
    // }

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >

                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleClickOpen('job_preferences')}>
                            <Avatar sx={{
                                height: 164,
                                mb: 2,
                                width: 164,
                            }}>
                                <FavoriteIcon sx={{ height: 120, width: 120, color: "red" }} />
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    
                            
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {user.name}<Link onClick={() => handleClickOpen('personal_details')}><CreateOutlinedIcon /></Link>
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {`${user.city} ${user.country}`}
                    </Typography>
                     gutterBottom
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        {user.discipline}<Link onClick={() => handleClickOpen('setup_your_discipline')}><CreateOutlinedIcon /></Link>
                    </Typography>
                </Box>
            </CardContent>
            
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseOutlinedIcon variant="contained" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <View showFooter={false} />
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus onClick={handleClose}>
                    Disagree
                </Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button> */}
                </DialogActions>
            </Dialog>

        </Card>
    );
}

