import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "data.json");

const readData = () => {
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

// bài 1
app.get("/customers", (req, res) => {
  const data = readData();
  const customers = data?.customers;
  res.send({
    data: customers?.length > 0 ? customers : [],
    total: customers?.length,
  });
});

// bài 2
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const customers = data?.customers;
  const customerExisted = customers.find((customer) => customer.id === id);
  if (customerExisted) {
    res.send({
      data: customerExisted,
    });
  } else {
    res.send({
      message: "Customer not found",
    });
  }
});

// bài 3 /customers/:customerId/orders
app.get("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;
  const data = readData();
  const listOrdersFound = data?.orders.filter(
    (order) => order.customerId === customerId
  );
  res.send({ data: listOrdersFound });
});

// bài 4
app.get("/orders/high-value", (req, res) => {
  const data = readData();
  const listOrderHighValue = data?.orders.filter(
    (order) => order.totalPrice >= 10000000
  );
  res.send({ data: listOrderHighValue });
});

// bài 5
app.get("/products", (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const minPriceValue = minPrice ? Number(minPrice) : null;
  const maxPriceValue = maxPrice ? Number(maxPrice) : null;
  const data = readData();
  let listProduct = [];
  if (!!minPrice && !!maxPrice) {
    listProduct = data?.products.filter(
      (pro) => pro.price >= minPriceValue && pro.price <= maxPriceValue
    );
  } else if (!!minPriceValue) {
    listProduct = data?.products.filter((pro) => pro.price >= minPriceValue);
  } else if (!!maxPriceValue) {
    listProduct = data?.products.filter((pro) => pro.price <= maxPriceValue);
  }
  res.send({ data: listProduct });
});

// bài 6 thêm mới khách hàng
app.post("/customers", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    res
      .status(404)
      .send({ message: "Vui lòng nhập đủ thông tin email, name, age" });

  let data = readData();
  const emailExisted = data?.customers.some(
    (customer) => customer.email.toLowerCase() === email.toLowerCase()
  );
  if (emailExisted) {
    res.status(400).send({ message: "Email đã tồn tại." });
  } else {
    const newCustomer = { id: uuidv4(), name, email, age };
    data.customers.push(newCustomer);
    writeData(data);
    res.status(201).send({ data: newCustomer });
  }
});

// bài 7 tạo mới 1 đơn hàng
app.post("/orders", (req, res) => {
  const { customerId, productId, quantity } = req.body;
  const orderId = uuidv4();
  if (!customerId || !productId || !quantity)
    res.status(404).send({
      message: "Vui lòng nhập đủ thông tin customerId, productId, quantity",
    });

  let data = readData();
  const customerExisted = data?.customers.find((cus) => cus.id === customerId);
  if (!customerExisted)
    res.status(404).send({ message: "Customer not found. " });

  const productExisted = data?.products.find((pro) => pro.id === productId);
  if (!productExisted) res.status(404).send({ message: "Product not found. " });

  const orderIdExisted = data?.orders.some((ord) => ord.id === orderId);
  if (!orderIdExisted) {
    const totalPrice = productExisted.price * quantity;
    // tạo đơn hàng mới
    const newOrder = {
      id: orderId,
      customerId,
      productId,
      quantity,
      totalPrice,
    };

    if (quantity <= 0 || quantity > productExisted.quantity) {
      res
        .status(400)
        .send({ message: "Số lượng không hợp lệ hoặc vượt quá tồn kho." });
    } else {
      data.orders.push(newOrder);
      productExisted.quantity -= quantity;
      writeData(data);
      res.status(201).send({ data: newOrder });
    }
  } else {
    res.status(400).send({ message: "Order đã tồn tại." });
  }
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
