import React, { useContext, useEffect } from "react";
import { Image, Grid, Popup, Container } from "semantic-ui-react";
import ProductStore from "../../../app/stores/productStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ProductDetailedHeader from "./ProductDetailedHeader";

interface DetailParams {
  id: string;
}
const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const productStore = useContext(ProductStore);
  const { product, loadProduct, loadingInitial } = productStore;

  useEffect(() => {
    loadProduct(+match.params.id);
  }, [loadProduct, match.params.id, history]);

  if (loadingInitial || !product)
    return <LoadingComponent content="Loading product..." />;

  return (
    <Grid>
      <Popup
        trigger={
          <Link to="/products">
            <Image
              style={{ marginRight: 160 }}
              src={`/assets/arrow.png`}
              wrapped
              size="tiny"
              ui={false}
            />
          </Link>
        }
        content="Back to products"
        position="top left"
      />

      <Grid.Column width={7}>
        <Container style={{ marginTop: 5, marginRight: 50 }}>
          <ProductDetailedHeader product={product!} />
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDetails);
