import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../actions/auth';
import {
    AppBar,
    Container,
    Toolbar,
    Tooltip,
    Avatar,
    Button,
    IconButton,
    Badge,
    Typography,
    Box,
    MenuItem,
    Menu,
} from "@material-ui/core";
import { ShoppingCart, Person } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

import Logo from "../../assets/logo.png";
import useStyles from "./styles";

import Categories from "./Categories/Categories";

const Navbar = ({ totalItems }) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [anchorElementNav, setAnchorElementNav] = useState(null);
    const [anchorElementUser, setAnchorElementUser] = useState(null);

    const classes = useStyles();
    const location = useLocation();

    const handleOpenNavMenu = (e) => {
        setAnchorElementNav(e.currentTarget);
    };

    const handleOpenUserMenu = (e) => {
        setAnchorElementUser(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElementNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElementUser(null);
    };

    const handleProfile = (e) => {
        e.preventDefault();

        handleCloseUserMenu();
    }

    const handleLogout = () => {
        handleCloseUserMenu();
        dispatch(logout());
    }

    useEffect(() => {

    }, [auth.authenticated]);

    const renderLoggedInMenu = () => {
        return (
            <>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                                alt="User"
                                src="/static/images/avatar/2.jpg"
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElementUser}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        getContentAnchorEl={null}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElementUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <Typography variant="body2" className={classes.username}>{`Hello ${auth.currentUser.firstName}`}</Typography>
                        <MenuItem
                            key='Profile'
                            onClick={handleProfile}
                        >
                            <Typography variant="body2">Profile</Typography>
                        </MenuItem>
                        <MenuItem
                            key='logout'
                            onClick={handleLogout}
                        >
                            <Typography variant="body2">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </>
        );
    };

    const renderNonLoggedInMenu = () => {
        return (
            <>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Person />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElementUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        getContentAnchorEl={null}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElementUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem
                                component={Link}
                                to='/register'
                                key='register'
                                onClick={handleCloseNavMenu}
                            >
                                <Typography variant="h6">Register</Typography>
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to='/login'
                                key='login'
                                onClick={handleCloseNavMenu}
                            >
                                <Typography variant="h6">Login</Typography>
                            </MenuItem>
                    </Menu>
                </Box>
            </>
        );
    };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none", lg: "none" },
                            }}
                        >
                            <IconButton
                                aria-label="User account"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElementNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                getContentAnchorEl={null}
                                open={Boolean(anchorElementNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/products"
                                    key="products"
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography variant="body2">
                                        PRODUCTS
                                    </Typography>
                                </MenuItem>
                                <Categories />
                            </Menu>
                        </Box>

                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            className={classes.title}
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none", lg: "none" },
                            }}
                            style={{ textAlign: "center" }}
                        >
                            <img
                                src={Logo}
                                alt="Commerce.js"
                                height="25px"
                                className={classes.logo}
                            />
                            La Boutique
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                            className={classes.buttonNav}
                        >
                            <Button
                                component={Link}
                                to="/products"
                                key="products"
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                Products
                            </Button>
                            <Categories />
                        </Box>
                        <div className={classes.grow} />
                        {location.pathname !== "/cart" && (
                            <div className={classes.button}>
                                <IconButton
                                    component={Link}
                                    to="/cart"
                                    aria-label="Show card items"
                                    color="inherit"
                                >
                                    <Badge
                                        badgeContent={totalItems}
                                        color="secondary"
                                    >
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </div>
                        )}
                        {auth.authenticated ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Navbar;
