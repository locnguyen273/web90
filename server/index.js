import express from "express";
import { v4 as uuidv4 } from "uuid";
import { customers, orders, products } from "./data.js";

const app = express();
app.use(express.json());

// phương thức get với base API http://localhost:8080/hello
// 4 phương thúc chính là GET, POST, PUT, DELETE
app.get("/hello", (req, res) => {
  res.send({ message: "hello mindx" });
});

// bài 1 viết api trả về danh sách customers
app.get("/customers", (req, res) => {
  const listCustomer = customers;
  res.send({
    data: listCustomer.length > 0 ? listCustomer : [],
    total: listCustomer.length,
  });
});

// viết api get customer detail
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const foundCustomerDetail = customers.find((customer) => customer.id === id);
  if (foundCustomerDetail) {
    res.send({ data: foundCustomerDetail }); // trong cái response api sẽ trả về { data: ..., message: ..., status: true/ false }
  } else res.status(404).send({ message: "Customer not found !!!" });
});

// viết api lấy danh sách đơn hàng của 1 khách hàng cụ thể endpoint: /customers/:customerId/orders
app.get("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;
  const foundListOrder = orders.filter(
    (orders) => orders.customerId === customerId
  );
  res.send({ data: foundListOrder });
});

app.get("/orders/high-value", (req, res) => {
  const foundOrderHigh = orders.filter((order) => order.totalPrice >= 10000000);
  res.send({ data: foundOrderHigh });
});

app.get("/products", (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const minPriceValue = minPrice ? Number(minPrice) : null;
  const maxPriceValue = maxPrice ? Number(maxPrice) : null;
  let listProduct = [];
  if (!!minPrice && !!maxPrice) {
    listProduct = products.filter(
      (pro) => pro.price >= minPriceValue && pro.price <= maxPriceValue
    );
  } else if (!!minPriceValue) {
    listProduct = products.filter((pro) => pro.price >= minPriceValue);
  } else if (!!maxPriceValue) {
    listProduct = products.filter((pro) => pro.price <= maxPriceValue);
  }
  res.send({ data: listProduct });
});

// viết api thêm customer mới
app.post("/customers", (req, res) => {
  const { email, name, age } = req.body;
  const foundCustomer = customers.find((cus) => cus.email === email);
  if (foundCustomer) {
    res.status(404).send({ message: "Customer is existed" });
  } else {
    const newCustomer = { id: uuidv4(), email, name, age };
    // const newListCustomer = [...customers, { id: uuidv4(), email, name, age }];
    res.status(201).send({ data: newCustomer });
  }
});

app.listen(8080, () => {
  console.log(`Server is running at port 8080 !!!`);
});
