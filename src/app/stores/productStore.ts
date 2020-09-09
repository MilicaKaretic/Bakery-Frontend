import { IProduct } from "./../models/Product/product";
import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IProductDTO } from "../models/Product/productDto";
import agent from "../api/agent";
import { IProductPost } from "../models/Product/productPost";

class ProductStore {
  @observable productsRegistry = new Map();
  @observable productsDTO: IProductDTO[] = [];
  @observable loadingInitial = false;
  @observable product: IProductDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

  @action loadProducts = () => {
    this.loadingInitial = true;
    agent.Products.list()
      .then((productsResult) => {
         
          const products = productsResult.map(
            ({...product }) => ({
              ...product,              
            })
          );
          this.productsDTO = products;
        
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action loadProduct = async (id: number) => {
    let product = this.getProduct(id);
    if (product) {
      this.product = product;
    } else {
      this.loadingInitial = true;
      try {
        const product: IProduct = await agent.Products.details(id);
        const newProduct = {
          ProductID: product?.ProductID,
          ProductName: product?.ProductName,
          ProductQuantity: product?.ProductQuantity,
          Available: product?.Available
        };

        this.product = newProduct;
        this.loadingInitial = false;
      } catch (err) {
        console.log(err);
        this.loadingInitial = false;
      }
    }
  };

  getProduct = (id: number) => {
    return this.productsDTO.find((d) => d.ProductID === id);
  };

  @action createProduct = async (product: IProductPost) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      this.loadProducts();
      this.createMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.product = undefined;
  };

  @action openEditForm = (id: number) => {
    this.product = this.productsDTO.find((d) => d.ProductID === id);
    this.editMode = true;
  };

  @action cancelSelectedProduct = () => {
    this.product = undefined;
  };
  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectProduct = (id: number) => {
    this.product = this.productsDTO.find((d) => d.ProductID === id);
    this.editMode = false;
    this.createMode = false;
  };

  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.update(product);
      this.loadProducts();
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action deleteProduct = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Products.delete(id);
      this.loadProducts();
      this.submitting = false;
      this.target = "";
    } catch (err) {
      this.submitting = false;
      this.target = "";
      console.log(err);
    }
  };
}

export default createContext(new ProductStore());
