import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
//import { Link } from "@material-ui/core";
import { Link } from 'react-router-dom';
import useStyles from "./styles";

const Breadcrumb = ({ breadcrumbs, currentPage }) => {
    const classes = useStyles();

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs?.map((breadcrumb, index) => (
                <Link className={classes.a} key={index} to={breadcrumb.path} >{breadcrumb.name}</Link>
            ))}
            <Typography color='textPrimary'>{currentPage}</Typography>
        </Breadcrumbs>
    );
};

export default Breadcrumb;
