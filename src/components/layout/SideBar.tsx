import * as React from "react";

import { Grid, Badge } from "@mui/material";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useRouter } from "next/router";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SelfImprovementOutlinedIcon from "@mui/icons-material/SelfImprovementOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const drawerWidth = 264;

export const SideBar = ({
  isDesktopView,
  container,
}: {
  isDesktopView: boolean;
  container?: HTMLElement;
}) => {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const textIconAndUrl = {
    dashboard: {
      text: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    // 'my_profile': {text: "My Profile", path: "/my_profile"},
    notification: {
      text: "Notification",
      path: "/notifications",
      icon: <NotificationsActiveOutlinedIcon />,
    },
  };

  const profile_forms_settings = [
    {
      title: "Personal Details",
      path: "personal_details",
      icon: <SelfImprovementOutlinedIcon />,
    },
    {
      title: "Job Preferences",
      path: "job_preferences",
      icon: <WorkOutlineOutlinedIcon />,
    },
    {
      title: "Discipline & Skills",
      path: "discipline_and_skills",
      icon: <ArchitectureOutlinedIcon />,
    },
    { title: "Education", path: "education", icon: <SchoolOutlinedIcon /> },
    {
      title: "Comfort Settings",
      path: "comfort_settings",
      icon: <ChairOutlinedIcon />,
    },
    {
      title: "Location Preferences",
      path: "location_preferences",
      icon: <PinDropOutlinedIcon />,
    },
    {
      title: "Priorities",
      path: "priorities",
      icon: <StarOutlineOutlinedIcon />,
    },
    {
      title: "Summary & Resume",
      path: "summary_resume",
      icon: <AttachFileOutlinedIcon />,
    },
  ];

  const redirectTo = (path: string) => {
    router.replace(path);

  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="dashboard" disablePadding>
          <ListItemButton href={textIconAndUrl["dashboard"].path}>
            <ListItemIcon>{textIconAndUrl["dashboard"].icon}</ListItemIcon>
            <ListItemText primary={textIconAndUrl["dashboard"].text} />
          </ListItemButton>
        </ListItem>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ManageAccountsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {profile_forms_settings.map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() => redirectTo('/account-settings')}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItem key="notification" disablePadding>
          <ListItemButton onClick={() => redirectTo('/notifications')} >
            <ListItemIcon>
              <Badge badgeContent={4} color="primary">
                {textIconAndUrl["notification"].icon}
              </Badge>
            </ListItemIcon>
            <ListItemText primary={textIconAndUrl["notification"].text} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const openModal = (hash: string) => {
    router.push({ hash: hash });
  };

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
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": { width: drawerWidth },
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth },
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
