import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";

import useStyles from "./styles";

import Logo from "../../assets/logo.png";
import {
    Facebook,
    Language,
    LinkedIn,
    LocationOn,
    Mail,
    Phone,
    Send,
    Twitter,
} from "@material-ui/icons";

const Footer = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Box
                sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}
                className={classes.box}
            >
                <Grid container sx={{ direction: {xs: "column", md: "row"}}}>
                    <Grid item xs={12} sm={3} className={classes.gridColumn}>
                        <Grid container direction="column" alignItems="flex-start">
                            <Grid item style={{ margin: "0 0 15px 0" }}>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component={Link}
                                    to="/"
                                    className={classes.title}
                                    sx={{
                                        flexGrow: 1,
                                        display: {
                                            xs: "flex",
                                            md: "none",
                                            lg: "none",
                                        },
                                    }}
                                >
                                    <img
                                        src={Logo}
                                        alt="Commerce.js"
                                        height="25px"
                                        className={classes.logo}
                                    />
                                    La Boutique
                                </Typography>
                            </Grid>
                            <Grid item style={{ margin: "0 4em 0 0" }}>
                                <Typography
                                    variant="subtitle2"
                                    style={{ color: "white" }}
                                    paragraph
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Phasellus laoreet turpis ut
                                    lacus lobortis ultrices. Maecenas cursus
                                    libero vitae velit imperdiet, vitae
                                    consequat sapien tempus. Nam in mi risus.
                                    Integer vel sem nunc. Donec ultricies justo
                                    neque, sed semper metus malesuada ut. Nunc
                                    dignissim nec justo vel commodo. Fusce et
                                    accumsan ante.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} className={classes.gridColumn}>
                        <Typography
                            variant="h5"
                            noWrap
                            className={classes.title}
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none", lg: "none" },
                            }}
                        >
                            Get in touch
                        </Typography>
                        <Divider className={classes.divider} />
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            className={classes.contactGrid}
                        >
                            <Grid item style={{ marginRight: "10px" }}>
                                <Phone fontSize="small" />
                            </Grid>
                            <Grid item>(+33) 01 23 45 67</Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            className={classes.contactGrid}
                        >
                            <Grid item style={{ marginRight: "10px" }}>
                                <Mail fontSize="small" />
                            </Grid>
                            <Grid item>nguyen.hkhang.96@gmail.com</Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            className={classes.contactGrid}
                        >
                            <Grid item style={{ marginRight: "10px" }}>
                                <LocationOn fontSize="small" />
                            </Grid>
                            <Grid item>Toulouse, 31000</Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                            className={classes.contactGrid}
                        >
                            <Grid item style={{ marginRight: "5px" }}>
                                <IconButton
                                    component={Link}
                                    to="#"
                                    color="inherit"
                                >
                                    <LinkedIn fontSize="small" />
                                </IconButton>
                            </Grid>
                            <Grid item style={{ marginRight: "5px" }}>
                                <IconButton
                                    component={Link}
                                    to="#"
                                    color="inherit"
                                >
                                    <Twitter fontSize="small" />
                                </IconButton>
                            </Grid>
                            <Grid item style={{ marginRight: "5px" }}>
                                <IconButton
                                    component={Link}
                                    to="#"
                                    color="inherit"
                                >
                                    <Facebook fontSize="small" />
                                </IconButton>
                            </Grid>
                            <Grid item style={{ marginRight: "5px" }}>
                                <IconButton
                                    component={Link}
                                    to="#"
                                    color="inherit"
                                >
                                    <Language fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} className={classes.gridColumn}>
                        <Typography
                            variant="h5"
                            noWrap
                            className={classes.title}
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none", lg: "none" },
                            }}
                        >
                            About us
                        </Typography>
                        <Divider className={classes.divider} />
                        <Grid
                            container
                            direction="column"
                            alignItems="flex-start"
                            columnspacing={10}
                            className={classes.contactGrid}
                        >
                            <Grid item xs={12} sm={12}>
                                <Typography
                                    component={Link}
                                    to="/#"
                                    variant="body2"
                                >
                                    About us
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            alignItems="flex-start"
                            columnspacing={10}
                            className={classes.contactGrid}
                        >
                            <Grid item xs={12} sm={12}>
                                <Typography
                                    component={Link}
                                    to="/#"
                                    variant="body2"
                                >
                                    Careers
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            alignItems="flex-start"
                            columnspacing={10}
                            className={classes.contactGrid}
                        >
                            <Grid item xs={12} sm={12}>
                                <Typography
                                    component={Link}
                                    to="/#"
                                    variant="body2"
                                >
                                    Sitemap
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} className={classes.gridColumn}>
                        <Typography
                            variant="h5"
                            noWrap
                            className={classes.title}
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none", lg: "none" },
                            }}
                        >
                            Newsletter
                        </Typography>
                        <Divider className={classes.divider} />
                        <form>
                            <Grid
                                container
                                direction="row"
                                alignItems="flex-start"
                                columnspacing={10}
                                className={classes.contactGrid}
                            >
                                <Grid item xs={9} sm={9}>
                                    <TextField
                                        name="email"
                                        type="email"
                                        placeholder="Sign up your email"
                                        variant="outlined"
                                        className={classes.newsletterTextField}
                                    />
                                </Grid>
                                <Grid item xs={3} sm={1}>
                                    <IconButton type="submit">
                                        <Send
                                            fontSize="large"
                                            style={{ color: "white" }}
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Footer;
