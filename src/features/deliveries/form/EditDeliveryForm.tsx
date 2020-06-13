import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IDeliveryDTO } from "../../../app/models/Delivery/deliveryDto";
import DeliveryStore from "../../../app/stores/deliveryStore";
import { observer } from "mobx-react-lite";
interface IProps {
  delivery: IDeliveryDTO;
}

const EditDeliveryForm: React.FC<IProps> = ({ delivery: initialFormState }) => {
  const deliveryStore = useContext(DeliveryStore);
  const {
    productNameRecord,
    employeeNameRecord,
    delivererNameRecord,
    delivererSurnameRecord,
    employeeSurnameRecord,
    marketplaceNameRecord,
    editDelivery,
    submitting,
    deliveriesDTO,
  } = deliveryStore;

  const [delivery, setDelivery] = useState<IDeliveryDTO>(initialFormState);
  const [errorDeliveryQuantity, setErrorDeliveryQuantity] = useState(false);
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
    const deliveryQuantityValid = delivery.DeliveryQuantity !== 0;
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

    const formValid =  productValid && employeeValid && deliveryQuantityValid && delivererValid && marketplaceValid;

    if (formValid) {
      editDelivery({
        DeliveryID: +delivery.DeliveryID,
        DeliveryQuantity: +delivery.DeliveryQuantity as number,
        ProductID: +delivery.Product.ProductID,
        EmployeeID: +delivery.Employee.EmployeeID,
        DelivererID: +delivery.Deliverer.DelivererID,
        MarketplaceID: +delivery.Marketplace.MarketplaceID,
      });
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "DeliveryQuantity") {
      if (value.length > 255) {
        setErrorDeliveryQuantity(true);
      } else {
        setErrorDeliveryQuantity(false);
      }
      if (value === "") {
        setDeliveryQuantityRequiredError(true);
      } else {
        setDeliveryQuantityRequiredError(false);
      }
    }
    setDelivery({ ...delivery, [name]: value });
  };

  const handleChangeProduct = (e: any, result: any) => {
    const { value } = result;
    setProductRequiredError(false);

    setDelivery({
      ...delivery,
      Product: { ProductID: value, ProductName:value },
    });
  };
  const handleChangeEmployee = (e: any, result: any) => {
    const { value } = result;

    setEmployeeRequiredError(false);

    setDelivery({
      ...delivery,
      Employee: { EmployeeID: value, EmployeeName:value, EmployeeSurname:value },
    });
  };
  const handleChangeDeliverer = (e: any, result: any) => {
    const { value } = result;

    setDelivererRequiredError(false);

    setDelivery({
      ...delivery,
      Deliverer: { DelivererID: value, DelivererName: value, DelivererSurname:value},
    });
  };
  const handleChangeMarketplace = (e: any, result: any) => {
    const { value } = result;

    setMarketplaceRequiredError(false);

    setDelivery({
      ...delivery,
      Marketplace: { MarketplaceID: value },
    });
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
            placeholder="40"
            value={delivery?.DeliveryQuantity}
            name="DeliveryQuantity"
            error={errorDeliveryQuantity}
          />
          {errorDeliveryQuantity && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Delivery Quantity is too long"
            />
          )}
          {deliveryQuantityRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Delivery Quantity"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        {}
        
        <Form.Field
          label="Product *"
          name="Product"
          fluid
          control={Dropdown}
          selection
          placeholder="Product"
          options={optionsProduct}
          onChange={handleChangeProduct}
          defaultValue={delivery.Product.ProductID}
        />
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
          placeholder="Employee"
          options={optionsEmployee}
          onChange={handleChangeEmployee}
          defaultValue={delivery.Employee.EmployeeID}
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
          placeholder="Deliverer"
          options={optionsDeliverer}
          onChange={handleChangeDeliverer}
          defaultValue={delivery.Deliverer.DelivererID}
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
          placeholder="Marketplace"
          options={optionsMarketplace}
          onChange={handleChangeMarketplace}
          defaultValue={delivery.Marketplace.MarketplaceID}
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
              errorDeliveryQuantity ||
              productRequiredError ||
              employeeRequiredError ||
              deliveryQuantityRequiredError ||
              delivererRequiredError ||
              marketplaceRequiredError
            }
          />
          {}
        </div>
      </Form>
    </Segment>
  );
};

export default observer(EditDeliveryForm);
