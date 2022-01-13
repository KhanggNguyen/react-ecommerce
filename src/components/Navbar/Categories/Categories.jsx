import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Menu, } from "@material-ui/core";

import Category from "./Category/Category";

const BASE_URL = process.env.REACT_APP_API_URL;

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [anchorElementNav, setAnchorElementNav] = useState(null);
    
    const handleOpenElNav = (e) => {
        setAnchorElementNav(e.currentTarget);
    };

    const handleCloseElNav = () => {
        setAnchorElementNav(null);
    };

    const fetchCategories = async () => {
        const res = await axios.get(`${BASE_URL}/api/category/`);
        if(res.status === 200) setCategories(res.data.categoryList);
    };

    const renderCategories = (categoryList) => {
        let cats = [];

        for (let cate of categoryList) {
            cats.push(
                <Category category={cate} onCloseElNav={handleCloseElNav} renderCategories={renderCategories}/>
            );
        }
        return cats;
    };

    useEffect(() => {
        fetchCategories();
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
