import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IPurchasePost } from "../../../app/models/Purchase/purchasePost";
import PurchaseStore from "../../../app/stores/purchaseStore";
import { observer } from "mobx-react-lite";

const CreatePurchaseForm: React.FC = () => {
  const initializeForm = () => {
    return {
      Quantity: "",
      PurchaseDate: "",
      Material: "",
      Employee: "",
      Supplier: "",
      Marketplace: "",
    };
  };

  const purchaseStore = useContext(PurchaseStore);
  const {
    materialNameRecord,
    employeeNameRecord,
    supplierNameRecord,
    createPurchase,
    submitting,
    purchasesDTO,
  } = purchaseStore;

  const [purchase, setPurchase] = useState(initializeForm);
  const [errorPurchaseQuantity, setErrorPurchaseQuantity] = useState(false);
  const [errorPurchaseDate, setErrorPurchaseDate] = useState(false);
  const [uniqueError, setUniqueError] = useState(false);
  const [materialRequiredError, setMaterialRequiredError] = useState(false);
  const [employeeRequiredError, setEmployeeRequiredError] = useState(false);
  const [supplierRequiredError, setSupplierRequiredError] = useState(false);
  const [purchaseQuantityRequiredError, setPurchaseQuantityRequiredError] = useState(false);
  const [purchaseDateRequiredError, setPurchaseDateRequiredError] = useState(false);

  const handleSubmit = () => {
    const materialValid = +purchase.Material !== 0;
    if (!materialValid) {
      setMaterialRequiredError(true);
    }
    const employeeValid = +purchase.Employee !== 0;
    if (!employeeValid) {
      setEmployeeRequiredError(true);
    }
    const purchaseQuantityValid = purchase.Quantity !== "";
    if (!purchaseQuantityValid) {
      console.log("quantity invalid");
      setPurchaseQuantityRequiredError(true);
    }
    const purchaseDateValid = purchase.PurchaseDate !== "";
    if (!purchaseDateValid) {
      console.log("date invalid");
      setPurchaseDateRequiredError(true);
    }
    const supplierValid = +purchase.Supplier !== 0;
    if (!supplierValid) {
      setSupplierRequiredError(true);
    }


    const formValid = !uniqueError && materialValid && employeeValid && purchaseQuantityValid && supplierValid && purchaseDateValid;

    if (formValid) {
      let newPurchase: IPurchasePost = {
        Quantity: +purchase.Quantity,
        PurchaseDate: purchase.PurchaseDate,
        MaterialID: +purchase.Material,
        EmployeeID: +purchase.Employee,
        SupplierID: +purchase.Supplier,
      };
      createPurchase(newPurchase);
    } else {
    }
  };

  const handleChange = (e: any, result: any) => {
    const { name, value } = result;

    if (name === "Material") {
      setMaterialRequiredError(false);
    }
    if (name === "Employee") {
      setEmployeeRequiredError(false);
    }
    if (name === "Supplier") {
        setSupplierRequiredError(false);
    }
    setPurchase({
      ...purchase,
      [name]: value,
    });
  };
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "PurchaseQuantity") {
      if (value.length > 255) {
        setErrorPurchaseQuantity(true);
      } else {
        setErrorPurchaseQuantity(false);
      }
      if (value === "") {
        setPurchaseQuantityRequiredError(true);
      } else {
        setPurchaseQuantityRequiredError(false);
      }
    }

    setPurchase({ ...purchase, [name]: value });
  };

  const optionsMaterial = Array.from(
    materialNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsEmployee = Array.from(
    employeeNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsSupplier = Array.from(
    supplierNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="PurchaseQuantity *"
            placeholder="20"
            name="PurchaseQuantity"
            error={errorPurchaseQuantity}
          />
          {errorPurchaseQuantity && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Purchase Quantity is too big"
            />
          )}
          {purchaseQuantityRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Purchase Quantity"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>

        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="PurchaseDate *"
            placeholder="20"
            name="PurchaseDate"
            error={errorPurchaseDate}
          />
          {errorPurchaseDate && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Purchase date is too big"
            />
          )}
          {purchaseDateRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Purchase Date"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        <Form.Field
          label="Material *"
          name="Material"
          fluid
          control={Dropdown}
          selection
          placeholder="Bread"
          value={purchase.Material}
          options={optionsMaterial}
          onChange={handleChange}
        />
        {materialRequiredError && (
          <Label
            basic
            color="red"
            pointing
            content="Please choose material"
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
          value={purchase.Employee}
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
          label="Supplier *"
          name="Supplier"
          fluid
          control={Dropdown}
          selection
          placeholder="Marko"
          value={purchase.Supplier}
          options={optionsSupplier}
          onChange={handleChange}
        />

        {supplierRequiredError && (
          <Label
            basic
            color="red"
            pointing
            content="Please choose supplier"
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
              errorPurchaseQuantity ||
              materialRequiredError ||
              employeeRequiredError ||
              purchaseQuantityRequiredError ||
              supplierRequiredError ||
              purchaseDateRequiredError
            }
          />
        </div>
      </Form>
    </Segment>
  );
};

export default observer(CreatePurchaseForm);
