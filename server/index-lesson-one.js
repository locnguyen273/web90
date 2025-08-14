import http from "http";
import url from "url";

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // thiết kế header phản hồi theo định dạng json
  res.setHeader("Content-Type", "application/json");

  switch (true) {
    case pathname === "/customers" && method === "GET": {
      res.end(JSON.stringify(customers));
      break;
    }
    case pathname.startsWith("/customers") &&
      !pathname.includes("orders") &&
      method === "GET": {
      const paths = pathname.split("/");
      const customerId = paths[2];
      const foundCustomer = customers.find(
        (customer) => customer.id === customerId
      );
      if (foundCustomer) {
        res.end(JSON.stringify(foundCustomer));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Customer not found" }));
      }
      break;
    }
    case pathname.startsWith("/customers") &&
      pathname.includes("orders") &&
      method === "GET": {
      const paths = pathname.split("/");
      const customerId = paths[2];

      // trả về tất cả đơn hàng đã order dựa vào customerId
      const listOrderByCustomerId = orders.filter((order) => order.customerId === customerId);
      res.end(JSON.stringify(listOrderByCustomerId));
      break;
    }

    case pathname.startsWith("/orders/") && pathname.includes("high-value") && method === "GET": {
      const foundOrders = orders.filter(order => order.totalPrice >= 10000000);
      res.end(JSON.stringify(foundOrders));
      break;
    }

    case pathname === "/products" && method === "GET": {
      const minPrice = parsedUrl.query.minPrice ? Number(parsedUrl.query.minPrice) : null;
      const maxPrice = parsedUrl.query.maxPrice ? Number(parsedUrl.query.maxPrice) : null;

      let filteredProducts = products;
      if(minPrice !== null && maxPrice !== null) {
        filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
      }
      res.end(JSON.stringify(filteredProducts));
      break;
    }

    //TH: không thấy bất kì route nào
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not found" }));
  }
});