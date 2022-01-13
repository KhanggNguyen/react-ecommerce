import React from 'react'
import { Navbar, Products } from '../../components'

const ProductListPage = ({onAddToCart}) => {
    return (
        <>
        <Products onAddToCart={onAddToCart} />
        </>
    )
}

export default ProductListPage
