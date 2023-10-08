import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
//import NestedMenuItem from "material-ui-nested-menu-item";
import NestedMenuItem from "../../../CustomMenu/NestedMenuItem/NestedMenuItem";
const Category = React.forwardRef(
    ({ category, renderCategories, onItemClick, menuPosition }, ref) => {
        return category.children && category.children.length ? (
            <>
                {
                    <NestedMenuItem
                        label={`${category.name}`}
                        parentMenuOpen={!!menuPosition}
                    >
                        {renderCategories(category.children)}
                    </NestedMenuItem>
                }
            </>
        ) : (
            <MenuItem
                component={Link}
                to={`/products?categoryId=${category._id}`}
                onClick={onItemClick}
                ref={ref}
            >
                {category.name}
            </MenuItem>
        );
    }
);

Category.displayName = "Category";

export default Category;
