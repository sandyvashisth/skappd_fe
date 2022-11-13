import * as React from 'react';
import {
    ButtonBase,
    ButtonGroup,
    InputBase,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Grid, Theme, useMediaQuery } from "@mui/material";

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 264;

export const SideBar = ({
    isDesktopView,
    container,
}: {
    isDesktopView: true;
    container: undefined;

}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const textIconAndUrl = (placeholder: any) => {
        let settings = {
            'dashboard': {text: "Dashboard", path: "/dashboard"},
            'my_profile': {text: "My Profile", path: "/my_profile"},
            'notifications': { text: "Notification", path: "/notifications" },
        }
        return settings[placeholder];
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['dashboard', 'my_profile', 'notifications'].map((placeholder, index) => (
                    <ListItem key={placeholder} disablePadding>
                        <ListItemButton href={textIconAndUrl(placeholder).path}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={textIconAndUrl(placeholder).text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </div>
    );

    return (
        <>
            {isDesktopView ? (
                <Grid
                    item
                    sx={{
                        width: drawerWidth,
                        p: 2,
                        flexDirection: "column",
                    }}
                >
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { width: drawerWidth },
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>

                </Grid>
            ) : (
                <Grid
                    item
                    sx={{
                        width: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Grid>
            )}
        </>
    );
};

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};