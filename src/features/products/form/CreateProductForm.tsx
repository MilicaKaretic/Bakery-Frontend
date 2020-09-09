import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IProductPost } from "../../../app/models/Product/productPost";
import ProductStore from "../../../app/stores/productStore";
import { observer } from "mobx-react-lite";

const CreateProductForm: React.FC = () => {
  const initializeForm = () => {
    return {
      ProductName: "",
      ProductQuantity: "",
      Available: "",
    };
  };

  const productStore = useContext(ProductStore);
  const {
    createProduct,
    submitting,
    productsDTO,
  } = productStore;

  const [product, setProduct] = useState(initializeForm);
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
    const productQuantityValid = product.ProductQuantity !== "";
    if (!productQuantityValid) {
        setProductQuantityRequiredError(true);
    }
    const availableValid = !!product.Available === true || !!product.Available === false;
    if (!availableValid) {
      setAvailableRequiredError(true);
    }


    const formValid = productNameValid && productQuantityValid && availableValid ;

    if (formValid) {
      let newProduct: IProductPost = {
        ProductName: product.ProductName,
        ProductQuantity: +product.ProductQuantity,
        Available: product.Available === "true" ? true : false,

      };
      createProduct(newProduct);
    } else {
    }
  };

  const handleChange = (e: any, result: any) => {
    const { name, value } = result;

    setProduct({
      ...product,
      [name]: value,
    });
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

      if (name === "Available") {
        if (value === "") {
          setAvailableRequiredError(true);
        } else {
          setAvailableRequiredError(false);
        }
      }

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
            placeholder="1"
            name="Available"
            error={errorAvailable}
          />
          {errorAvailable && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Incorrect availability"
            />
          )}
          {availableRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add availability"
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
        </div>
      </Form>
    </Segment>
  );
};

export default observer(CreateProductForm);
