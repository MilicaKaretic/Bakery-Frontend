import axios, { AxiosResponse } from "axios";
import { IDelivery } from "../models/Delivery/delivery";
import { IDeliveryPost } from "../models/Delivery/deliveryPost";
import { IEmployee } from "../models/Employee/employee";
import { IDeliverer } from "../models/Deliverer/deliverer";
import { IProduct } from "../models/Product/product";
import { IMarketplace } from "../models/Marketplace/marketplace";
import allSettled from "promise.allsettled";
import { history } from "../..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8081/api";

axios.interceptors.response.use(undefined, (err) => {
  const { status } = err.response;
  if (status === 404) {
    history.push("/notfound");
  }
  
  /*   if (status === 400 && config.method === "get") {
    history.push("/notfound");
  } */

  if (status === 500) {
    toast.error("Server error!");
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    fetch("http://localhost:8081/api/deliveries", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => ({ data: res.json() })),
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

export default {
  Deliveries,
};
