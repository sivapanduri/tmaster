import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Container, Row,Button } from "react-bootstrap";
export default function AddPortfolio() {
 const [form, setForm] = useState({
   user_id:"",
   code: "",
   buy_quantity: "",
   buy_price: "",
   buy_date:"",
   sell_quantity: "",
   sell_price: "",
   sell_date: "",
 });
 const navigate = useNavigate();
 const [stocks, setStocks] = useState([]);
 useEffect(() => {
  async function getStocks() {
    const response = await fetch(`http://localhost:5000/stock/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const stocks = await response.json();
    setStocks(stocks);
  }

  getStocks();

  return;
}, [stocks.length]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPortfolio = { ...form };
 
   await fetch("http://localhost:5000/portfolio/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPortfolio),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ user_id:"",
   code: "",
   buy_quantity: "",
   buy_price: "",
   buy_date:"",
   sell_quantity: "",
   sell_price: "",
   sell_date: "",});
   navigate("/portfolios");
 }
 
 // This following section will display the form that takes the input from the portfolio.
 return (
   <div>
       <Container id="container">
      <Row>
        <Col
          lg={5}
          md={6}
          sm={12}
          className="p-5 m-auto shadow-sm rounded-lg .ml-3"
        >
     <h3>Add Portfolio Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Code</label>
         <select onChange={(e) => updateForm({ code: e.target.value })}> 
      <option value="⬇️ Select a Stock ⬇️"> -- Select a Stock -- </option>
            {/* Mapping through each stock object in our stocks array
          and returning an option element with the appropriate attributes / values.
         */}
     {stocks.map((stock) => <option key={stock.code} value={stock.code}>{stock.name}</option>)}
    </select>
         
       </div>
       <div className="form-group">
         <label htmlFor="bprice">Buy Price</label>
         <input
           type="number"
           className="form-control"
           id="bprice"
           value={form.buy_price}
           onChange={(e) => updateForm({ buy_price: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="bqty">Buy Qty</label>
         <input
           type="number"
           className="form-control"
           id="bqty"
           value={form.buy_quantity}
           onChange={(e) => updateForm({ buy_quantity: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="bprice">Sell Price</label>
         <input
           type="number"
           className="form-control"
           id="sprice"
           value={form.sell_price}
           onChange={(e) => updateForm({ sell_price: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="sqty">Sell Qty</label>
         <input
           type="number"
           className="form-control"
           id="sqty"
           value={form.sell_quantity}
           onChange={(e) => updateForm({ sell_quantity: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="bdate">Buy Date</label>
         <input
           type="text"
           className="form-control"
           id="bdate"
           value={form.buy_date}
           onChange={(e) => updateForm({ buy_date: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="sdate">Sell Date</label>
         <input
           type="text"
           className="form-control"
           id="sdate"
           value={form.sell_date}
           onChange={(e) => updateForm({ sell_date: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Add Stock"
           className="btn btn-primary"
         />
       </div>
     </form></Col></Row></Container>
   </div>
 );
}