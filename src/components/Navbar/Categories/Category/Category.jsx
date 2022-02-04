import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";

const Category = React.forwardRef(
    ({ category, renderCategories, onItemClick, menuPosition }, ref) => {
        return category.children && category.children.length ? (
            <React.Fragment>
                {
                    <NestedMenuItem
                        label={`${category.name}`}
                        parentMenuOpen={!!menuPosition}
                    >
                        {renderCategories(category.children)}
                    </NestedMenuItem>
                }
            </React.Fragment>
        ) : (
            <MenuItem
                component={Link}
                to={`/products?category=${category.slug}`}
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
