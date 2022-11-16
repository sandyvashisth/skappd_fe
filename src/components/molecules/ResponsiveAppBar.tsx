import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "@images/logo.svg";
import theme from "src/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "context/AuthContext";

const pages: string[] = [];
const settings = ["Profile", "Logout"];

export const ResponsiveAppBar = () => {
  const router = useRouter();
  const { route } = router;
  const { logout, isAuthenticated, loading } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event: any, key: string) => {
    if (key === "Logout" && logout) {
      logout();
    }
    console.log("lele", event, key);
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="relative"
      sx={{
        background: "#FFFFFF",
        boxShadow: "none",
        border: "1px  solid #f2f2f2",
        zIndex: 1201,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ p: 0 }}
            >
              <MenuIcon />
            </IconButton>
            {pages.length > 0 && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
          <Box>
            <Logo />
          </Box>
          {route !== "/" && (
            <Box
              sx={{
                left: "264px",
                position: "absolute",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link href="/">
                <Button
                  sx={{ color: "#1EC271" }}
                  startIcon={<ArrowBackIcon fontSize="small" />}
                >
                  Back to Home
                </Button>
              </Link>
            </Box>
          )}
          {!loading && (
            <Box
              sx={{
                [theme.breakpoints.up("md")]: {
                  position: "absolute",
                  right: 0,
                },
              }}
            >
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Sandy" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={(e) => handleCloseUserMenu(e, setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button variant="text" href="/login">
                    Sign IN
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ color: "white", marginLeft: "40px" }}
                    href="/signup"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
