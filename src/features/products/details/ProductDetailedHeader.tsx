import React, { useState } from "react";
import { Segment, Item, Header, Button, Image, Modal } from "semantic-ui-react";
import EditProductForm from "../form/EditProductForm";
import { IProductDTO } from "../../../app/models/Product/productDto";
import { observer } from "mobx-react-lite";

const productImageStyle = {
  filter: "brightness(30%)",
};

const productImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const ProductDetailedHeader: React.FC<{ product: IProductDTO }> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/productEdit2.jpg`}
          size="massive"
          style={productImageStyle}
        />
        <Segment basic style={productImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={product.ProductName}
                  style={{ color: "white" }}
                />
                <p>Quantity: {product.ProductQuantity} </p>
                <p>Available: {String(product.Available)} </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Modal
          open={open}
          closeOnTriggerClick
          dimmer="blurring"
          trigger={<Button color="green" onClick={() => setOpen(true)}>Edit</Button>}
          closeOnDimmerClick
          onClose={handleClose}
        >
          <Modal.Content>
            <EditProductForm product={product!} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProductDetailedHeader);
