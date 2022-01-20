import React, { useState, useEffect } from "react";
import { Button, Menu, } from "@material-ui/core";

import Category from "./Category/Category";
import { useSelector } from "react-redux";

const Categories = () => {
    const category = useSelector( (state) => state.category);

    const [categories, setCategories] = useState(null);
    const [anchorElementNav, setAnchorElementNav] = useState(null);
    
    const handleOpenElNav = (e) => {
        setAnchorElementNav(e.currentTarget);
    };

    const handleCloseElNav = () => {
        setAnchorElementNav(null);
    };

    const renderCategories = (categoryList) => {
        let cats = [];

        for (let cate of categoryList) {
            cats.push(
                <Category key={cate._id} category={cate} onCloseElNav={handleCloseElNav} renderCategories={renderCategories}/>
            );
        }
        return cats;
    };
    
    useEffect(() => {
        setCategories(category.categories);
    }, []);

    return (
        <>
            <Button
                aria-label="Categories"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenElNav}
            >
                Categories
            </Button>
            <Menu
                id="menu-cats"
                anchorEl={anchorElementNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                getContentAnchorEl={null}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElementNav)}
                onClose={handleCloseElNav}
            >
                {categories && renderCategories(categories)}
            </Menu>
        </>
    );
};

export default Categories;
