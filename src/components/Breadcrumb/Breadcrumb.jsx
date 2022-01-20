import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "@material-ui/core";

const Breadcrumb = ({ breadcrumbs, currentPage }) => {
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs?.map((breadcrumb, index) => (
                <Link key={index} href={breadcrumb.path} >{breadcrumb.name}</Link>
            ))}
            <Typography color='textPrimary'>{currentPage}</Typography>
        </Breadcrumbs>
    );
};

export default Breadcrumb;
