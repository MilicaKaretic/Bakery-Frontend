import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IPurchaseDTO } from "../../../app/models/Purchase/purchaseDto";
import PurchaseStore from "../../../app/stores/purchaseStore";
import { observer } from "mobx-react-lite";
interface IProps {
  purchase: IPurchaseDTO;
}

const EditPurchaseForm: React.FC<IProps> = ({ purchase: initialFormState }) => {
  const purchaseStore = useContext(PurchaseStore);
  const {
    materialNameRecord,
    employeeNameRecord,
    supplierNameRecord,
    editPurchase,
    submitting,
    purchasesDTO,
  } = purchaseStore;

  const [purchase, setPurchase] = useState<IPurchaseDTO>(initialFormState);
  const [errorPurchaseQuantity, setErrorPurchaseQuantity] = useState(false);
  const [errorPurchaseDate, setErrorPurchaseDate] = useState(false);
  const [materialRequiredError, setMaterialRequiredError] = useState(false);
  const [employeeRequiredError, setEmployeeRequiredError] = useState(false);
  const [supplierRequiredError, setSupplierRequiredError] = useState(false);
  const [purchaseQuantityRequiredError, setPurchaseQuantityRequiredError] = useState(false);
  const [purchaseDateRequiredError, setPurchaseDateRequiredError] = useState(false);

  const handleSubmit = () => {
    const materialValid = +purchase.Material.MaterialID !== 0;
    if (!materialValid) {
      setMaterialRequiredError(true);
    }
    const employeeValid = +purchase.Employee !== 0;
    if (!employeeValid) {
      setEmployeeRequiredError(true);
    }
    const purchaseQuantityValid = purchase.Quantity !== 0;
    if (!purchaseQuantityValid) {
      console.log("quantity invalid");
      setPurchaseQuantityRequiredError(true);
    }
    const purchaseDateValid = purchase.Quantity !== 0;
    if (!purchaseDateValid) {
      console.log("date invalid");
      setPurchaseDateRequiredError(true);
    }
    const supplierValid = +purchase.Supplier !== 0;
    if (!supplierValid) {
      setSupplierRequiredError(true);
    }

    const formValid =  materialValid && employeeValid && purchaseQuantityValid && supplierValid && purchaseDateValid;

    if (formValid) {
      editPurchase({
        PurchaseID: +purchase.PurchaseID,
        Quantity: +purchase.Quantity as number,
        PurchaseDate: purchase.PurchaseDate,
        MaterialID: +purchase.Material,
        EmployeeID: +purchase.Employee,
        SupplierID: +purchase.Supplier,
      });
    }
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

  const handleChangeMaterial = (e: any, result: any) => {
    const { value } = result;
    setMaterialRequiredError(false);

    setPurchase({
      ...purchase,
      Material: { MaterialID: value, MaterialName:value },
    });
  };
  const handleChangeEmployee = (e: any, result: any) => {
    const { value } = result;

    setEmployeeRequiredError(false);

    setPurchase({
      ...purchase,
      Employee: { EmployeeID: value },
    });
  };
  const handleChangeSupplier = (e: any, result: any) => {
    const { value } = result;

    setSupplierRequiredError(false);

    setPurchase({
      ...purchase,
      Supplier: { SupplierID: value },
    });
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
            placeholder="40"
            value={purchase?.Quantity}
            name="PurchaseQuantity"
            error={errorPurchaseQuantity}
          />
          {errorPurchaseQuantity && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Purchase Quantity is too long"
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
            placeholder="40"
            value={purchase?.PurchaseDate}
            name="PurchaseDate"
            error={errorPurchaseDate}
          />
          {errorPurchaseDate && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Purchase date is too long"
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
          placeholder="Material"
          options={optionsMaterial}
          onChange={handleChangeMaterial}
          defaultValue={purchase.Material.MaterialID}
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
          placeholder="Employee"
          options={optionsEmployee}
          onChange={handleChangeEmployee}
          defaultValue={purchase.Employee.EmployeeID}
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
          placeholder="Supplier"
          options={optionsSupplier}
          onChange={handleChangeSupplier}
          defaultValue={purchase.Supplier.SupplierID}
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
              supplierRequiredError
            }
          />
          {}
        </div>
      </Form>
    </Segment>
  );
};

export default observer(EditPurchaseForm);
