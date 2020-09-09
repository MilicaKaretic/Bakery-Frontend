import React, { useContext } from "react";
import {
  Item,
  Button,
  Segment,
  Image,
  Popup,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProductStore from "../../../app/stores/productStore";
import { IProductDTO } from "../../../app/models/Product/productDto";

const ProductListItem: React.FC<{ product: IProductDTO }> = ({ product }) => {
  const productStore = useContext(ProductStore);
  const { deleteProduct } = productStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 10 }}
              size="small"            
              src="/assets/productPlaceholder.png"
            />

            <Item.Content style={{ marginLeft: 20 }}>
              <Item.Header style={{ marginTop: 20 }}>{product.ProductName} </Item.Header>
              <Item.Meta style={{ marginBottom: 8 }}>
                __________________
              </Item.Meta>
              <Item.Meta style={{ marginBottom: 8 }}>
                Quantity: {product.ProductQuantity}
              </Item.Meta>
              <Item.Meta style={{ marginBottom: 8 }}>
                Available: {String(product.Available)}
              </Item.Meta>
             
            </Item.Content>
            <Popup
              trigger={
                <Icon onClick={(e: any) => deleteProduct(e, product.ProductID)}>
                  <Image
                    style={{ marginRight: 160 }}
                    src={`/assets/x.png`}
                    wrapped
                    ui={false}
                  />
                </Icon>
              }
              content="Delete Product"
              position="top left"
            />
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/products/${product.ProductID}`}
          floated="right"
          content="View"
          color="green"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ProductListItem;
