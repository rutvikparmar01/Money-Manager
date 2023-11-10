const experess = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = experess();
app.use(experess.json());
app.use(cors())
mongoose.connect("mongodb://localhost:27017/myapp" ,{ useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api/auth", require("./router/auth.js"));
app.use("/api/collection", require("./router/collection.js"));
app.use("/api/Debit",require("./router/debit.js"))

app.listen(3000, () => {
  console.log("connectet");
});
