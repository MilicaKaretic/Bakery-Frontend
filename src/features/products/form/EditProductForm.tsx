import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IProductDTO } from "../../../app/models/Product/productDto";
import ProductStore from "../../../app/stores/productStore";
import { observer } from "mobx-react-lite";
interface IProps {
  product: IProductDTO;
}

const EditProductForm: React.FC<IProps> = ({ product: initialFormState }) => {
  const productStore = useContext(ProductStore);
  const {
    editProduct,
    submitting,
    productsDTO,
  } = productStore;

  const [product, setProduct] = useState<IProductDTO>(initialFormState);
  const [errorProductName, setErrorProductName] = useState(false);
  const [errorProductQuantity, setErrorProductQuantity] = useState(false);
  const [errorAvailable, setErrorAvailable] = useState(false);
  const [availableRequiredError, setAvailableRequiredError] = useState(false);
  const [productQuantityRequiredError, setProductQuantityRequiredError] = useState(false);
  const [productNameRequiredError, setProductNameRequiredError] = useState(false);

  const handleSubmit = () => {
    const productNameValid = product.ProductName !== "";
    if (!productNameValid) {
        setProductNameRequiredError(true);
    }
    const productQuantityValid = product.ProductQuantity !== 0;
    if (!productQuantityValid) {
        setProductQuantityRequiredError(true);
    }
    const availableValid = !!product.Available !== true || !!product.Available !== false;
    if (!availableValid) {
      setAvailableRequiredError(true);
    }
    


    const formValid = productNameValid && productQuantityValid && availableValid;

    if (formValid) {
      editProduct({
        ProductID: +product.ProductID,
        ProductName: product.ProductName,
        ProductQuantity: product.ProductQuantity,
        Available: !!product.Available
          });
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "ProductName") {
      if (value === "") {
        setProductNameRequiredError(true);
      } else {
        setProductNameRequiredError(false);
      }
    }

    if (name === "ProductQuantity") {
        if (value === "") {
          setProductQuantityRequiredError(true);
        } else {
          setProductQuantityRequiredError(false);
        }
      }

      // if (name === "Available") {
      //   if (value === "") {
      //     setAvailableRequiredError(true);
      //   } else {
      //     setAvailableRequiredError(false);
      //   }
      // }


    setProduct({ ...product, [name]: value });
  };

  
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Product Name "
            required true
            placeholder="20"
            name="ProductName"
            error={errorProductName}
            value={product?.ProductName}
          />
          {errorProductName && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Product Name is too big"
            />
          )}
          {productNameRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Product Name"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Product Quantity "
            required true
            placeholder="20"
            name="ProductQuantity"
            error={errorProductQuantity}
            value={product?.ProductQuantity}
          />
         {errorProductQuantity && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Product quantity is incorrect"
            />
          )}
          {productQuantityRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Product Quantity"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Available"
            required true
            placeholder="20"
            name="Available"
            value={product.Available}
            error={errorAvailable}
          />
          {errorAvailable && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Available is too big"
            />
          )}
          {availableRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Available"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            loading={submitting}
            style={{ width: "50%", marginRight: 10 }}
            positive
            type="submit"
            content="Save"
            
          />
          {}
        </div>
      </Form>
    </Segment>
  );
};

export default observer(EditProductForm);
