import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// import { customers, orders, products } from "./data.js";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "data.json");

// Hàm đọc file data.json
const readData = () => {
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
};

// Hàm ghi file data.json
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

// phương thức get với base API http://localhost:8080/hello
// 4 phương thúc chính là GET, POST, PUT, DELETE
app.get("/hello", (req, res) => {
  res.send({ message: "hello mindx" });
});

// bài 1 viết api trả về danh sách customers
app.get("/customers", (req, res) => {
  let data = readData();
  const listCustomer = data.customers;
  res.send({
    data: listCustomer.length > 0 ? listCustomer : [],
    total: listCustomer.length,
  });
});

// viết api get customer detail
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  let data = readData();
  const foundCustomerDetail = data.customers.find((customer) => customer.id === id);
  if (foundCustomerDetail) {
    res.send({ data: foundCustomerDetail }); // trong cái response api sẽ trả về { data: ..., message: ..., status: true/ false }
  } else res.status(404).send({ message: "Customer not found !!!" });
});

// viết api lấy danh sách đơn hàng của 1 khách hàng cụ thể endpoint: /customers/:customerId/orders
app.get("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;
  let data = readData();
  const foundListOrder = data.orders.filter((orders) => orders.customerId === customerId);
  res.send({ data: foundListOrder });
});

app.get("/orders/high-value", (req, res) => {
  let data = readData();
  const foundOrderHigh = data.orders.filter((order) => order.totalPrice >= 10000000);
  res.send({ data: foundOrderHigh });
});

app.get("/products", (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const minPriceValue = minPrice ? Number(minPrice) : null;
  const maxPriceValue = maxPrice ? Number(maxPrice) : null;
  let data = readData();
  let listProduct = [];
  if (!!minPrice && !!maxPrice) {
    listProduct = data.products.filter(
      (pro) => pro.price >= minPriceValue && pro.price <= maxPriceValue
    );
  } else if (!!minPriceValue) {
    listProduct = data.products.filter((pro) => pro.price >= minPriceValue);
  } else if (!!maxPriceValue) {
    listProduct = data.products.filter((pro) => pro.price <= maxPriceValue);
  }
  res.send({ data: listProduct });
});

// viết api thêm customer mới
app.post("/customers", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) return res.status(400).send({ message: "Thiếu thông tin name, email hoặc age" });
  let data = readData();

  // Kiểm tra email trùng
  const emailExists = data.customers.some(
    (customer) => customer.email.toLowerCase() === email.toLowerCase()
  );
  if (emailExists) return res.status(400).send({ message: "Email đã tồn tại" });

  let newId;
  do {
    newId = uuidv4();
  } while (data.customers.some((c) => c.id === newId));
  const newCustomer = { id: newId, name, email, age };
  data.customers.push(newCustomer);
  writeData(data);
  res.status(201).json(newCustomer);
});

app.post("/orders", (req, res) => {
  const { customerId, productId, quantity } = req.body;
  const orderId = uuidv4();
  if (!customerId || !productId || !quantity) {
    return res.status(400).send({ message: "Thiếu thông tin customerId, productId hoặc quantity" });
  }

  let data = readData();

  const customer = data.customers.find((c) => c.id === customerId);
  if (!customer) return res.status(404).send({ message: "Customer không tồn tại" });

  const product = data.products.find((p) => p.id === productId);
  if (!product) return res.status(404).send({ message: "Product không tồn tại" });

  // Kiểm tra số lượng hợp lệ
  if (quantity <= 0 || quantity > product.quantity) {
    return res.status(400).send({ message: "Số lượng không hợp lệ hoặc vượt quá tồn kho" });
  }

  // Kiểm tra orderId không trùng
  const orderExists = data.orders.some((o) => o.id === orderId);
  if (orderExists) {
    return res.status(400).send({ error: "OrderId đã tồn tại" });
  }

  const totalPrice = product.price * quantity;

  // Tạo đơn hàng mới
  const newOrder = {
    id: orderId,
    customerId,
    productId,
    quantity,
    totalPrice,
  };
  data.orders.push(newOrder);
  product.quantity -= quantity;
  writeData(data);
  res.status(201).send(newOrder);
});

app.put("/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).send({ message: "Số lượng phải lớn hơn 0" });
  }
  let data = readData();
  const order = data.orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).send({ message: "Không tìm thấy đơn hàng" });
  }

  const product = data.products.find(p => p.id === order.productId);
  if (!product) {
    return res.status(404).send({ message: "Sản phẩm trong đơn hàng không tồn tại" });
  }

  const availableStock = product.quantity + order.quantity;
  if (quantity > availableStock) {
    return res.status(400).send({ message: "Số lượng mới vượt quá tồn kho" });
  }

  product.quantity = availableStock - quantity;

  order.quantity = quantity;
  order.totalPrice = product.price * quantity;

  writeData(data);
  res.send(order);
});

app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  let data = readData();
  const index = data.customers.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).send({ message: "Không tìm thấy khách hàng" });
  data.customers.splice(index, 1);
  writeData(data);
  res.send({ message: "Xóa khách hàng thành công" });
});

app.listen(8080, () => {
  console.log(`Server is running at port 8080 !!!`);
});
