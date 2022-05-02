import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import StockEdit from "./components/stock/edit";
import UserEdit from "./components/user/edit";
import Edit from "./components/Edit";
import Create from "./components/Create";
import StockList from "./components/stock/stockList";
import AddStock from "./components/stock/create";
import ExcelUpload from "./components/stock/excel_upload";
import EODStockList from "./components/stock/eod_stock_list";
import EODStockListEdit from "./components/stock/eodstocklistedit"
import UserList from "./components/user/userlist"
import AddUser from "./components/user/create"
import AddPortfolio from "./components/user/createportfolio"
import Portfolio from "./components/user/portfoliolist"
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/stock/edit/:id" element={<StockEdit />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
        <Route path="/eodstocklistedit/:id" element={<EODStockListEdit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/stocks" element={<StockList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/portfolios" element={<Portfolio />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/addportfolio" element={<AddPortfolio />} />
        <Route path="/addstock" element={<AddStock />} />
        <Route path="/excelupload" element={<ExcelUpload />} />
        <Route path="/eodstockdata" element={<EODStockList />} />
      </Routes>
    </div>
  );
};

export default App;
