export interface IDeliveryDTO {
    DeliveryID: number;
    DeliveryQuantity: number;
    Product: Product;
    Deliverer: Deliverer;
    Marketplace: Marketplace;
    Employee: Employee;
  }
  
  //export type Tuple = readonly [number, string];
  
  export type Product = {
    ProductID: number;
    ProductName: string;
  };
  export type Deliverer = {
    DelivererID: number;
    DelivererName?: string;
    DelivererSurname?: string;
  };
  export type Marketplace = {
    MarketplaceID: number;
    MarketplaceName?: string;
  };
  export type Employee = {
    EmployeeID: number;
    EmployeeName?: string;
    EmployeeSurname?:string;
  };
  