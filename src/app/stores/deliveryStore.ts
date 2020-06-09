import { IDelivery } from "./../models/Delivery/delivery";
import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IDeliveryDTO } from "../models/Delivery/deliveryDto";
import agent from "../api/agent";
import { IDeliveryPost } from "../models/Delivery/deliveryPost";

class DeliveryStore {
  @observable deliveriesRegistry = new Map();
  @observable deliveriesDTO: IDeliveryDTO[] = [];
  @observable loadingInitial = false;
  @observable productNameRecord = new Map<number, string>();
  @observable marketplaceNameRecord = new Map<number, string>();
  @observable delivererNameRecord = new Map<number, string>();
  @observable employeeNameRecord = new Map<number, string>();
  @observable delivery: IDeliveryDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

  @action loadDeliveries = () => {
    this.loadingInitial = true;
    agent.Deliveries.list()
      .then(([deliveriesResult, employeesResult, productsResult, deliverersResult, marketplacesResult]) => {
        if (
          deliveriesResult.status === "fulfilled" &&
          productsResult.status === "fulfilled" &&
          marketplacesResult.status === "fulfilled" &&
          employeesResult.status === "fulfilled" &&
          deliverersResult.status === "fulfilled"
        ) {
          this.productNameRecord = new Map(
            productsResult.value.data.map(({ ProductID, ProductName }) => [
              ProductID,
              ProductName,
            ])
          );
          this.marketplaceNameRecord = new Map(
            marketplacesResult.value.data.map(({ MarketplaceID, MarketplaceName }) => [
              MarketplaceID,
              MarketplaceName,
            ])
          );
          this.employeeNameRecord = new Map(
            employeesResult.value.data.map(({ EmployeeID, EmployeeName }) => [
              EmployeeID,
              EmployeeName,
            ])
          );
          this.delivererNameRecord = new Map(
            deliverersResult.value.data.map(({ DelivererID, DelivererName }) => [
              DelivererID,
              DelivererName,
            ])
          );

          const deliveries = deliveriesResult.value.data.map(
            ({ ProductID, MarketplaceID, EmployeeID, DelivererID, ...delivery }) => ({
              ...delivery,
              Product: {
                ProductID: ProductID,
                ProductName: this.productNameRecord.get(ProductID as number)!,
              },
              Marketplace: {
                MarketplaceID: MarketplaceID,
                MarketplaceName: this.marketplaceNameRecord.get(MarketplaceID as number)!,
              },
              Employee: {
                EmployeeID: EmployeeID,
                EmployeeName: this.employeeNameRecord.get(EmployeeID as number)!,
              },
              Deliverer: {
                DelivererID: DelivererID,
                DelivererName: this.delivererNameRecord.get(DelivererID as number)!,
              },
            })
          );

          this.deliveriesDTO = deliveries;
        } else if (
          deliveriesResult.status === "fulfilled" &&
          productsResult.status === "rejected"
        ) {
          //TODO
        } else if (
          deliveriesResult.status === "rejected" &&
          productsResult.status === "fulfilled"
        ) {
          //TODO
        } else if (
          deliveriesResult.status === "rejected" &&
          productsResult.status === "rejected"
        ) {
          //TODO
          console.log("try again later");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action loadDelivery = async (id: number) => {
    let delivery = this.getDelivery(id);
    if (delivery) {
      this.delivery = delivery;
    } else {
      this.loadingInitial = true;
      try {
        const delivery: IDelivery = await agent.Deliveries.details(id);
        const newDelivery = {
          DeliveryID: delivery?.DeliveryID,
          DeliveryQuantity: delivery?.DeliveryQuantity,
          Product: {
            ProductID: delivery?.ProductID,
            ProductName: this.productNameRecord.get(delivery?.ProductID as number)!,
          },
          Marketplace: {
            MarketplaceID: delivery.MarketplaceID,
            MarketplaceName: this.marketplaceNameRecord.get(delivery.MarketplaceID as number)!,
          },
          Employee: {
            EmployeeID: delivery.EmployeeID,
            EmployeeName: this.employeeNameRecord.get(delivery.EmployeeID as number)!,
          },
          Deliverer: {
            DelivererID: delivery.DelivererID,
            DelivererName: this.delivererNameRecord.get(delivery.DelivererID as number)!,
          },
        };

        this.delivery = newDelivery;
        this.loadingInitial = false;
      } catch (err) {
        console.log(err);
        this.loadingInitial = false;
      }
    }
  };

  getDelivery = (id: number) => {
    return this.deliveriesDTO.find((d) => d.DeliveryID === id);
  };

  @action createDelivery = async (delivery: IDeliveryPost) => {
    this.submitting = true;
    try {
      await agent.Deliveries.create(delivery);
      this.loadDeliveries();
      this.createMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.delivery = undefined;
  };

  @action openEditForm = (id: number) => {
    this.delivery = this.deliveriesDTO.find((d) => d.DeliveryID === id);
    this.editMode = true;
  };

  @action cancelSelectedDelivery = () => {
    this.delivery = undefined;
  };
  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectDelivery = (id: number) => {
    this.delivery = this.deliveriesDTO.find((d) => d.DeliveryID === id);
    this.editMode = false;
    this.createMode = false;
  };

  @action editDelivery = async (delivery: IDelivery) => {
    this.submitting = true;
    try {
      await agent.Deliveries.update(delivery);
      this.loadDeliveries();
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action deleteDelivery = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Deliveries.delete(id);
      this.loadDeliveries();
      this.submitting = false;
      this.target = "";
    } catch (err) {
      this.submitting = false;
      this.target = "";
      console.log(err);
    }
  };
}

export default createContext(new DeliveryStore());
