import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IDeliveryPost } from "../../../app/models/Delivery/deliveryPost";
import DeliveryStore from "../../../app/stores/deliveryStore";
import { observer } from "mobx-react-lite";

const CreateDeliveryForm: React.FC = () => {
  const initializeForm = () => {
    return {
      DeliveryQuantity: "",
      Product: "",
      Employee: "",
      Deliverer: "",
      Marketplace: "",
    };
  };

  const deliveryStore = useContext(DeliveryStore);
  const {
    productNameRecord,
    employeeNameRecord,
    delivererNameRecord,
    marketplaceNameRecord,
    createDelivery,
    submitting,
    deliveriesDTO,
  } = deliveryStore;

  const [delivery, setDelivery] = useState(initializeForm);
  const [errorDeliveryQuantity, setErrorDeliveryQuantity] = useState(false);
  const [uniqueError, setUniqueError] = useState(false);
  const [productRequiredError, setProductRequiredError] = useState(false);
  const [employeeRequiredError, setEmployeeRequiredError] = useState(false);
  const [delivererRequiredError, setDelivererRequiredError] = useState(false);
  const [marketplaceRequiredError, setMarketplaceRequiredError] = useState(false);
  const [deliveryQuantityRequiredError, setDeliveryQuantityRequiredError] = useState(false);

  const handleSubmit = () => {
    const productValid = +delivery.Product !== 0;
    if (!productValid) {
      setProductRequiredError(true);
    }
    const employeeValid = +delivery.Employee !== 0;
    if (!employeeValid) {
      setEmployeeRequiredError(true);
    }
    const deliveryQuantityValid = delivery.DeliveryQuantity !== "";
    if (!deliveryQuantityValid) {
      console.log("quantity invalid");
      setDeliveryQuantityRequiredError(true);
    }
    const delivererValid = +delivery.Deliverer !== 0;
    if (!delivererValid) {
      setDelivererRequiredError(true);
    }
    const marketplaceValid = +delivery.Marketplace !== 0;
    if (!marketplaceValid) {
      setMarketplaceRequiredError(true);
    }

    const formValid = !uniqueError && productValid && employeeValid && deliveryQuantityValid && delivererValid && marketplaceValid;

    if (formValid) {
      let newDelivery: IDeliveryPost = {
        DeliveryQuantity: +delivery.DeliveryQuantity,
        ProductID: +delivery.Product,
        EmployeeID: +delivery.Employee,
        DelivererID: +delivery.Deliverer,
        MarketplaceID: +delivery.Marketplace,
      };
      createDelivery(newDelivery);
    } else {
    }
  };

  /*const handleUniqueError = (valueID: number, valueTitle: string) => {
    const existingDelivery = deliveriesDTO.find(
      (b) => valueID === b.Deliverer.DelivererID && valueTitle === b.DeliveryQuantity
    );

    if (existingDelivery !== undefined) {
      setUniqueError(true);
    } else {
      setUniqueError(false);
    }
  };*/

  const handleChange = (e: any, result: any) => {
    const { name, value } = result;

    if (name === "Product") {
      /*if (delivery.DeliveryQuantity !== "") {
        handleUniqueError(value, book.Title);
      }*/
      setProductRequiredError(false);
    }
    if (name === "Employee") {
      setEmployeeRequiredError(false);
    }
    if (name === "Deliverer") {
        setDelivererRequiredError(false);
    }
    if (name === "Marketplace") {
        setMarketplaceRequiredError(false);
      }
    setDelivery({
      ...delivery,
      [name]: value,
    });
  };
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "DeliveryQuantity") {
      if (value.length > 255) {
        setErrorDeliveryQuantity(true);
      } else {
        setErrorDeliveryQuantity(false);
      }
      /*if (productRequiredError === false) {
        handleUniqueError(+delivery.Product, value);
      }*/
      if (value === "") {
        setDeliveryQuantityRequiredError(true);
      } else {
        setDeliveryQuantityRequiredError(false);
      }
    }

    setDelivery({ ...delivery, [name]: value });
  };

  const optionsProduct = Array.from(
    productNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsEmployee = Array.from(
    employeeNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsDeliverer = Array.from(
    delivererNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsMarketplace = Array.from(
    marketplaceNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="DeliveryQuantity *"
            placeholder="20"
            name="DeliveryQuantity"
            error={errorDeliveryQuantity}
          />
          {errorDeliveryQuantity && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="errorDeliveryQuantity is too long"
            />
          )}
          {deliveryQuantityRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add DeliveryQuantity"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>

        <Form.Field
          label="Product *"
          name="Product"
          fluid
          control={Dropdown}
          selection
          placeholder="Bread"
          value={delivery.Product}
          options={optionsProduct}
          onChange={handleChange}
        />
        {uniqueError && (
          <Label
            basic
            color="red"
            pointing
            content="Book with given title and writer already exists"
            style={{ marginBottom: 10 }}
          />
        )}
        {productRequiredError && (
          <Label
            basic
            color="red"
            pointing
            content="Please choose product"
            style={{ marginBottom: 10 }}
          />
        )}
        <Form.Field
          label="Employee *"
          name="Employee"
          fluid
          control={Dropdown}
          selection
          placeholder="Milos"
          value={delivery.Employee}
          options={optionsEmployee}
          onChange={handleChange}
        />

        {employeeRequiredError && (
          <Label
            basic
            color="red"
            pointing
            content="Please choose employee"
            style={{ marginBottom: 10 }}
          />
        )}

        <Form.Field
          label="Deliverer *"
          name="Deliverer"
          fluid
          control={Dropdown}
          selection
          placeholder="Marko"
          value={delivery.Deliverer}
          options={optionsDeliverer}
          onChange={handleChange}
        />

        {delivererRequiredError && (
          <Label
            basic
            color="red"
            pointing
            content="Please choose deliverer"
            style={{ marginBottom: 10 }}
          />
        )}

        <Form.Field
          label="Marketplace *"
          name="Marketplace"
          fluid
          control={Dropdown}
          selection
          placeholder="Marketplace 1"
          value={delivery.Marketplace}
          options={optionsMarketplace}
          onChange={handleChange}
        />

        {marketplaceRequiredError && (
          <Label
            basic
            color="red"
            pointing
            content="Please choose marketplace"
            style={{ marginBottom: 10 }}
          />
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            loading={submitting}
            style={{ width: "50%", marginRight: 10 }}
            positive
            type="submit"
            content="Save"
            disabled={
              uniqueError ||
              errorDeliveryQuantity ||
              productRequiredError ||
              employeeRequiredError ||
              deliveryQuantityRequiredError ||
              marketplaceRequiredError ||
              delivererRequiredError
            }
          />
          {/*     <Button
            onClick={() => cancelCreateFormOpen()}
            style={{ width: "50%" }}
            type="button"
            content="Cancel"
          /> */}
        </div>
      </Form>
    </Segment>
  );
};

export default observer(CreateDeliveryForm);
