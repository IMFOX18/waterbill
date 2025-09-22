const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// dữ liệu mẫu
let bills = [
  { id: 1, name: "Hộ A - Căn 101", amount: 250000, status: "unpaid" },
  { id: 2, name: "Hộ B - Căn 102", amount: 300000, status: "unpaid" },
  { id: 3, name: "Hộ C - Căn 103", amount: 150000, status: "paid" }
];

// lấy danh sách hóa đơn
app.get("/bills", (req, res) => {
  res.json(bills);
});

// người dân báo đã chuyển
app.post("/pay/:id", (req, res) => {
  const id = parseInt(req.params.id);
  bills = bills.map(b => b.id === id ? { ...b, status: "pending" } : b);
  res.json({ message: "Đã báo chuyển khoản" });
});

// admin xác nhận đã nhận tiền
app.post("/confirm/:id", (req, res) => {
  const id = parseInt(req.params.id);
  bills = bills.map(b => b.id === id ? { ...b, status: "paid" } : b);
  res.json({ message: "Đã xác nhận thanh toán" });
});

// cổng chạy trên Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy ở cổng ${PORT}`));
