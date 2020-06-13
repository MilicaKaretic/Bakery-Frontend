export interface IPurchaseDTO {
    PurchaseID: number;
    PurchaseDate: string;
    Quantity: number;
    Material: Material;
    Supplier: Supplier;
    Employee: Employee;
  }
  
  //export type Tuple = readonly [number, string];
  
  export type Material = {
    MaterialID: number;
    MaterialName: string;
  };
  export type Supplier = {
    SupplierID: number;
    SupplierName?: string;
    SupplierSurname?: string;
  };
  export type Employee = {
    EmployeeID: number;
    EmployeeName?: string;
    EmployeeSurname?: string;
  };
  