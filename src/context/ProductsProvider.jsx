import { createContext, useEffect, useState } from "react";
import { getAllArticles } from "../services/ArticleService";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllArticles();
        setProductList(products);
        setShowList(products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (query) => {
    if (query) {
      const filtered = productList.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setShowList(filtered);
    } else {
      setShowList(productList);
    }
  };

  return (
    <ProductsContext.Provider value={{ productList, showList, filterProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;