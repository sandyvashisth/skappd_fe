import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const OnboardingTimeline = () => {
    return (
        <React.Fragment>
            <Timeline
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                <TimelineItem>
                    <TimelineSeparator>
                        <CheckCircleIcon sx={{ color: 'green', width: '16px', height: '16px', my: '10px' }} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Login Setup</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color='info' />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Personal Details</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>Job Preferences</TimelineContent>
                </TimelineItem>
            </Timeline>
        </React.Fragment>
    );
}
