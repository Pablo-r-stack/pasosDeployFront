// import { useEffect, useState } from "react";
// import { getAllArticles } from "../services/ArticleService";

// const useProducts = () => {
//     const [productList, setProductList] = useState([]);
//     const [showList, setShowList] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//         console.log('Current ShowList in hook:', showList);
//       }, [showList]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const products = await getAllArticles();
//                 setProductList(products);
//                 setShowList(products);
//                 setLoading(false);
//             } catch (error) {
//                 console.error(error);
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const filterProducts = (query) => {

//         if (query) {
//             const filtered = productList.filter(product =>
//                 product.name.toLowerCase().includes(query.toLowerCase())
//             );
//             setShowList(filtered);
//         } else {
//             setShowList(productList);
//         }
//     };

//     return {
//         productList,
//         showList,
//         filterProducts,
//         loading,
//     };
// };

// export default useProducts;
