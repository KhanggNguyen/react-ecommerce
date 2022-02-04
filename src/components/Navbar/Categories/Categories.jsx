import React, { useState, useEffect } from "react";
import { Button, Menu } from "@material-ui/core";

import Category from "./Category/Category";
import { useSelector } from "react-redux";

const Categories = () => {
    const category = useSelector((state) => state.category);

    const [categories, setCategories] = useState(null);

    const [anchorElementNav, setAnchorElementNav] = useState(null);

    const [menuPosition, setMenuPosition] = useState(null);

    const handleOpenElNav = (e) => {
        setAnchorElementNav(e.currentTarget);

        if (menuPosition) return;

        e.preventDefault();

        setMenuPosition({
            top: e.pageY,
            left: e.pageX,
        });
    };

    const handleCloseElNav = () => {
        setAnchorElementNav(null);
    };

    const handleItemClick = () => {
        setMenuPosition(null);
    };

    const renderCategories = (categoryList) => {
        let cats = [];

        for (let cate of categoryList) {
            cats.push(
                <Category
                    key={cate._id}
                    category={cate}
                    menuPosition={menuPosition}
                    onItemClick={handleItemClick}
                    onCloseElNav={handleCloseElNav}
                    renderCategories={renderCategories}
                />
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
                open={!!menuPosition}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
                MenuListProps={{ onMouseLeave: handleItemClick }}
            >
                {categories && renderCategories(categories)}
            </Menu>
            {/* <CustomMenu options={categories} href={`/products?category=`}/> */}
        </>
    );
};

export default Categories;
