import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import { useSelector } from "react-redux/es/exports";
import { selectCategoriesMap } from "../../store/categories/category.selector";

import './category.styles.scss'

const Category = () => {
    const { category } = useParams();
    console.log('render/re-rendering category component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        console.log('effect fired calling setProducts');
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </>

    )
}

export default Category;