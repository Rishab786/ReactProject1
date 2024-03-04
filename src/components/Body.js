import React, { useState, useRef } from "react";

const Body = () => {
  let listOfIems = JSON.parse(localStorage.getItem("ProductList"));
  const productId = useRef();
  const sellingPrice = useRef();
  const productName = useRef();

  const [productList, setProductList] = useState(listOfIems);
  const sum = productList.reduce((acc, obj) => {
    let val = Number(obj.price);
    return (acc += val);
  }, 0);
  const addBtnHandler = (e) => {
    e.preventDefault();
    const obj = {
      name: productName.current.value,
      price: sellingPrice.current.value,
      id: productId.current.value,
    };
    productList.push(obj);
    localStorage.setItem("ProductList", JSON.stringify(productList));
    console.log(productList)
    productName.current.value = "";
    sellingPrice.current.value = "";
    productId.current.value = "";
    setProductList(productList);
     
  };
  const delHandler = (e) => {
    const productId = e.id;
    const newList = productList.filter((obj) => {
      return obj.id != productId;
    });

    localStorage.removeItem("ProductList");
    localStorage.setItem("ProductList", JSON.stringify(newList));
    setProductList(newList);
  };
  return (
    <div>
      <form>
        <label>
          Product ID: <input type="number" ref={productId} />
        </label>
        <label>
          Selling Price: <input type="number" ref={sellingPrice} />
        </label>
        <label>
          Product Name: <input type="text" ref={productName} />
        </label>
        <button onClick={addBtnHandler}>Add</button>
      </form>
      {productList.map((obj, index) => {
        return (
          <p key={index}>
            {obj.id} {obj.name} {obj.price}{" "}
            <button
              onClick={() => {
                return delHandler(obj);
              }}
            >
              Delete
            </button>
          </p>
        );
      })}

      <p>Total sum is :{sum}</p>
    </div>
  );
};

export default Body;
