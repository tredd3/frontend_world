import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useParams, useHistory } from 'react-router-dom';
import { getSimilarItems } from '../services/similar-items';
import IntersectionObserver from './IntersectionObserver';
import SingleProduct from './products/SingleProduct';
import PageTemplate from './uiControls/PageTemplate/PageTemplate';
import UserLocation from './uiControls/UserLocation';
import FilterBar from './products/FilterBar';
import { getProductDetail } from '../services/product';

const SimilarItemsProducts = () => {
  const { skuId } = useParams();
  const history = useHistory();
  const [pageNum, setPageNum] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const fetchProducts = async () => {
    const { categoryId } = await getProductDetail(skuId);

    const responseObj = await getSimilarItems({
      pageNum, queryTerm: '', sort: {}, filter: categoryId ? { categoryId } : {}, productSkuId: skuId
    });
    setTotalCount(responseObj.count);
    setProducts([...products, ...responseObj.products]);
    setPageNum(pageNum + 1);
  };

  // TODO: FIXME
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchProducts(); }, []);
  return (
    <PageTemplate
      history={history}
      showCategories={false}
      showSearchedText
      inputText=""
      whiteBackground
    >
      <UserLocation />
      {products.length ? <FilterBar resultsCount={totalCount} /> : null}
      <Divider />
      <section style={{ padding: '0 10px' }}>
        {
          products.map((product, index) => (((products.length % 20) === 0 && index === (products.length - 2))
            ? (
              <IntersectionObserver key={index} onVisible={fetchProducts} index={index}>
                <SingleProduct product={product} />
              </IntersectionObserver>
            )
            : <SingleProduct key={index} product={product} />))
        }
      </section>
    </PageTemplate>
  );
};
export default SimilarItemsProducts;
