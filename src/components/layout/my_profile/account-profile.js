import * as React from 'react';

import {
    Avatar,
    Box,
    Link,
    Card,
    CardContent,
    Divider,
    Tooltip,
    IconButton,
    Typography,
    useMediaQuery,
    Grid
} from '@mui/material';
import { PersonalDetails } from "@components/organisms/PersonalDetails";


import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Lareb Nawab',
    discipline: 'Occupational Therapist',
    experience: "5+ years",
    education: "DASC University"
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
                                height: 136,
                                mb: 2,
                                width: 136,
                            }}>
                                <FavoriteIcon sx={{ height: 120, width: 120, color: "red" }} />
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Click to edit" arrow>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            <Link color="textPrimary" underline='none' onClick={() => handleClickOpen('personal_details')}>{user.name}</Link>
                        </Typography>
                    </Tooltip>
                    
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {`${user.city} ${user.country}`}
                    </Typography>
                    
                    <Tooltip title="Click to edit" arrow>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            <Link color="textPrimary" underline='none' onClick={() => handleClickOpen('setup_your_discipline')}>{user.discipline}</Link>
                        </Typography>
                    </Tooltip>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box sx={{ p: 2 }}>
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Tooltip title="Click to edit" arrow>
                            <Typography
                                color="textSecondary"
                                display="inline"
                                sx={{ pl: 1 }}
                                variant="body2"
                            >
                                <Link variant="body2" color="textSecondary" underline='none' onClick={() => handleClickOpen('setup_your_discipline')}>{user.experience}</Link>
                            </Typography>
                        </Tooltip>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Tooltip title="Click to edit" arrow>
                            <Typography
                                color="textSecondary"
                                display="inline"
                                sx={{ pl: 1 }}
                                variant="body2"
                            >
                              <Link variant="body2" color="textSecondary" underline='none' onClick={() => handleClickOpen('education_certifications')}>{user.education}</Link>
                            </Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            
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

