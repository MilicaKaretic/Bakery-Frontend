import { IPurchase } from "../models/Purchase/purchase";
import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IPurchaseDTO } from "../models/Purchase/purchaseDto";
import agent from "../api/agent";
import { IPurchasePost } from "../models/Purchase/purchasePost";

class PurchaseStore {
  @observable purchasesRegistry = new Map();
  @observable purchasesDTO: IPurchaseDTO[] = [];
  @observable loadingInitial = false;
  @observable materialNameRecord = new Map<number, string>();
  @observable supplierNameRecord = new Map<number, string>();
  @observable employeeNameRecord = new Map<number, string>();
  @observable purchase: IPurchaseDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

  @action loadPurchases = () => {
    this.loadingInitial = true;
    agent.Purchases.list()
      .then(([purchasesResult, employeesResult, materialsResult, suppliersResult]) => {
        if (
          purchasesResult.status === "fulfilled" &&
          materialsResult.status === "fulfilled" &&
          employeesResult.status === "fulfilled" &&
          suppliersResult.status === "fulfilled"
        ) {
          this.materialNameRecord = new Map(
            materialsResult.value.data.map(({ MaterialID, MaterialName }) => [
              MaterialID,
              MaterialName,
            ])
          );
          this.employeeNameRecord = new Map(
            employeesResult.value.data.map(({ EmployeeID, EmployeeName }) => [
              EmployeeID,
              EmployeeName,
            ])
          );
          this.supplierNameRecord = new Map(
            suppliersResult.value.data.map(({ SupplierID, SupplierName }) => [
              SupplierID,
              SupplierName,
            ])
          );

          const purchases = purchasesResult.value.data.map(
            ({ MaterialID, EmployeeID, SupplierID, ...purchase }) => ({
              ...purchase,
              Material: {
                MaterialID: MaterialID,
                MaterialName: this.materialNameRecord.get(MaterialID as number)!,
              },
              Employee: {
                EmployeeID: EmployeeID,
                EmployeeName: this.employeeNameRecord.get(EmployeeID as number)!,
              },
              Supplier: {
                SupplierID: SupplierID,
                SupplierName: this.supplierNameRecord.get(SupplierID as number)!,
              },
            })
          );
          purchases.forEach((purchase) => {
            purchase.PurchaseDate = purchase.PurchaseDate.split("T")[0];

      })

          this.purchasesDTO = purchases;
        } else if (
          purchasesResult.status === "fulfilled" &&
          materialsResult.status === "rejected"
        ) {
          //TODO
        } else if (
          purchasesResult.status === "rejected" &&
          materialsResult.status === "fulfilled"
        ) {
          //TODO
        } else if (
          purchasesResult.status === "rejected" &&
          materialsResult.status === "rejected"
        ) {
          //TODO
          console.log("try again later");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action loadPurchase = async (id: number) => {
    let purchase = this.getPurchase(id);
    if (purchase) {
      this.purchase = purchase;
    } else {
      this.loadingInitial = true;
      try {
        const purchase: IPurchase = await agent.Purchases.details(id);
        const newPurchase = {
          PurchaseID: purchase?.PurchaseID,
          Quantity: purchase?.Quantity,
          PurchaseDate: purchase?.PurchaseDate,
          Material: {
            MaterialID: purchase?.MaterialID,
            MaterialName: this.materialNameRecord.get(purchase?.MaterialID as number)!,
          },
          Employee: {
            EmployeeID: purchase.EmployeeID,
            EmployeeName: this.employeeNameRecord.get(purchase.EmployeeID as number)!,
          },
          Supplier: {
            SupplierID: purchase.SupplierID,
            SupplierName: this.supplierNameRecord.get(purchase.SupplierID as number)!,
          },
        };

        this.purchase = newPurchase;
        this.loadingInitial = false;
      } catch (err) {
        console.log(err);
        this.loadingInitial = false;
      }
    }
  };

  getPurchase = (id: number) => {
    return this.purchasesDTO.find((d) => d.PurchaseID === id);
  };

  @action createPurchase = async (purchase: IPurchasePost) => {
    this.submitting = true;
    try {
      await agent.Purchases.create(purchase);
      this.loadPurchases();
      this.createMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.purchase = undefined;
  };

  @action openEditForm = (id: number) => {
    this.purchase = this.purchasesDTO.find((d) => d.PurchaseID === id);
    this.editMode = true;
  };

  @action cancelSelectedPurchase = () => {
    this.purchase = undefined;
  };
  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectPurchase = (id: number) => {
    this.purchase = this.purchasesDTO.find((d) => d.PurchaseID === id);
    this.editMode = false;
    this.createMode = false;
  };

  @action editPurchase = async (purchase: IPurchase) => {
    this.submitting = true;
    try {
      await agent.Purchases.update(purchase);
      this.loadPurchases();
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action deletePurchase = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Purchases.delete(id);
      this.loadPurchases();
      this.submitting = false;
      this.target = "";
    } catch (err) {
      this.submitting = false;
      this.target = "";
      console.log(err);
    }
  };
}

export default createContext(new PurchaseStore());
