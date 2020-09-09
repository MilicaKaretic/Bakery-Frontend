import axios, { AxiosResponse } from "axios";
import { IDelivery } from "../models/Delivery/delivery";
import { IDeliveryPost } from "../models/Delivery/deliveryPost";
import { IPurchasePost } from "../models/Purchase/purchasePost";
import { IProductPost } from "../models/Product/productPost";
import { IEmployeePost } from "../models/Employee/employeePost";
import { IEmployee } from "../models/Employee/employee";
import { IDeliverer } from "../models/Deliverer/deliverer";
import { IProduct } from "../models/Product/product";
import { IMarketplace } from "../models/Marketplace/marketplace";
import allSettled from "promise.allsettled";
import { history } from "../..";
import { toast } from "react-toastify";
import { IPurchase } from "../models/Purchase/purchase";
import { IMaterial } from "../models/Material/material";
import { ISupplier } from "../models/Supplier/supplier";

axios.defaults.baseURL = "http://localhost:8081/api";

axios.interceptors.response.use(undefined, (err) => {
  const { status } = err.response;
  if (status === 404) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error!");
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url,body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Deliveries = {
  list: () => {
    const deliveriesPath = "http://localhost:8081/api/deliveries";
    const employeesPath = "http://localhost:8081/api/employees";
    const productsPath = "http://localhost:8081/api/products";
    const marketplacesPath = "http://localhost:8081/api/marketplaces";
    const deliverersPath = "http://localhost:8081/api/deliverers";

    return allSettled([
      axios.get<IDelivery[]>(deliveriesPath),
      axios.get<IEmployee[]>(employeesPath),
      axios.get<IProduct[]>(productsPath),
      axios.get<IDeliverer[]>(deliverersPath),
      axios.get<IMarketplace[]>(marketplacesPath),
    ]);
  },
  details: (id: number) => requests.get(`/deliveries/${id}`),
  create: (delivery: IDeliveryPost) => requests.post("/deliveries", delivery),
  update: (delivery: IDelivery) =>
    requests.put(`/deliveries/${delivery.DeliveryID}`, {
      DeliveryQuantity: delivery.DeliveryQuantity,
      ProductID: delivery.ProductID,
      EmployeeID: delivery.EmployeeID,
      MarketplaceID: delivery.MarketplaceID,
      DelivererID: delivery.DelivererID,
    }),
  delete: (id: number) => requests.delete(`/deliveries/${id}`),
};

const Purchases = {
  list: () => {
    const purchasesPath = "http://localhost:8081/api/purchases";
    const employeesPath = "http://localhost:8081/api/employees";
    const materialsPath = "http://localhost:8081/api/materials";
    const suppliersPath = "http://localhost:8081/api/suppliers";

    return allSettled([
      axios.get<IPurchase[]>(purchasesPath),
      axios.get<IEmployee[]>(employeesPath),
      axios.get<IMaterial[]>(materialsPath),
      axios.get<ISupplier[]>(suppliersPath),
    ]);
  },
  details: (id: number) => requests.get(`/purchases/${id}`),
  create: (purchase: IPurchasePost) => requests.post("/purchases", purchase),
  update: (purchase: IPurchase) =>
    requests.put(`/purchases/${purchase.PurchaseID}`, {
      Quantity: purchase.Quantity,
      PurchaseDate: purchase.PurchaseDate,
      MaterialID: purchase.MaterialID,
      EmployeeID: purchase.EmployeeID,
      SupplierID: purchase.SupplierID,
    }),
  delete: (id: number) => requests.delete(`/purchases/${id}`),
};

const Employees = {
  list: () => {
    const employeesPath = "http://localhost:8081/api/employees";
    
    const employees: Promise<IEmployee[]>  = requests.get(employeesPath);
    return employees;
    
  },
  details: (id: number) => requests.get(`/employees/${id}`),
  create: (employee: IEmployeePost) => requests.post("/employees", employee),
  update: (employee: IEmployee) =>
    requests.put(`/employees/${employee.EmployeeID}`, {
      EmployeeName: employee.EmployeeName,
      EmployeeSurname: employee.EmployeeSurname,
      Username: employee.Username,
      Password: employee.Password,
    }),
  delete: (id: number) => requests.delete(`/employees/${id}`),
};

const Products = {
  list: () => {
    const productsPath = "http://localhost:8081/api/products";
    
    const products: Promise<IProduct[]>  = requests.get(productsPath);
    return products;
    
  },
  details: (id: number) => requests.get(`/products/${id}`),
  create: (product: IProductPost) => requests.post("/products", product),
  update: (product: IProduct) =>
    requests.put(`/products/${product.ProductID}`, {
      ProductName: product.ProductName,
      ProductQuantity: product.ProductQuantity,
      Available: product.Available,
    }),
  delete: (id: number) => requests.delete(`/products/${id}`),
};

let employee = "";
let pass = "";

const Login = {
  login: (Username: string, Password: string) => {
    employee = Username;
    pass = Password;
    return axios.get("http://localhost:8081/login", {
      params: {},
      withCredentials: false,
      headers: {
        username: Username,
        password: Password
      },
    });
  },
};

let employeeAdmin = "";
let passA = "";

const LoginAdmin = {
  loginAdmin: (Username: string, Password: string) => {
    employeeAdmin = Username;
    passA = Password;
    return axios.get("http://localhost:8081/loginAdmin", {
      params: {},
      withCredentials: false,
      headers: {
        username: Username,
        password: Password
      },
    });
  },
};

export default {
  Deliveries,
  Purchases,
  Employees,
  Login,
  LoginAdmin,
  Products
};
