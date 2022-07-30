import { createContext, useState, useEffect } from "react";

// import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments, /* addCollectionAndDocuments*/ } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriewsMap: {},

});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    /*
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, [])
*/

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoriesMap);
        }
        getCategoriesMap();
    }, [])
    const value = { categoriesMap }
    return (
        <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
    )
}