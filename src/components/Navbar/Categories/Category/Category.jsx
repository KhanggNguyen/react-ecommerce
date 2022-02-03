import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Typography } from "@material-ui/core";

const Category = React.forwardRef(
    ({ category, onCloseElNav, renderCategories }, ref) => {
        const [anchorElNav, setAnchorElNav] = useState(null);

        const handleOpenElNav = (e) => {
            setAnchorElNav(e.currentTarget);
        };

        const handleCloseElNav = () => {
            setAnchorElNav(null);
            onCloseElNav();
        };

        return category.children && category.children.length ? (
            <React.Fragment >
                <MenuItem onClick={handleOpenElNav} ref={ref}>
                    <Typography variant="body2">{category.name}</Typography>
                </MenuItem>
                {
                    <Menu
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        keepMounted
                        getContentAnchorEl={null}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseElNav}
                    >
                        {renderCategories(category.children)}
                    </Menu>
                }
            </React.Fragment>
        ) : (
            <MenuItem
                component={Link}
                to={`/products?category=${category.slug}`}
                onClick={handleCloseElNav}
                ref={ref}
            >
                <Typography variant="body2">{category.name}</Typography>
            </MenuItem>
        );
    }
);

Category.displayName = "Category";

export default Category;
