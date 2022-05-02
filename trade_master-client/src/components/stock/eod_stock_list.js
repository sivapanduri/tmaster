import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Stock = (props) => (
 <tr>
  <td>{props.eod_stock_data.eod_date}</td>
<td>{props.eod_stock_data.stock_id}</td>
<td>{props.eod_stock_data.open}</td>
<td>{props.eod_stock_data.high}</td>
<td>{props.eod_stock_data.low}</td>
<td>{props.eod_stock_data.last}</td>
<td>{props.eod_stock_data.technical_rating}</td>
<td>{props.eod_stock_data.oscillators_rating}</td>
<td>{props.eod_stock_data.moving_averages_rating}</td>

   <td>
     <Link className="btn btn-link" to={`/eodstocklistedit/${props.eod_stock_data._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteStock(props.eod_stock_data._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function EODStockList() {
 const [eod_stock_datas, setStocks] = useState([]);
 
 // This method fetches the eod_stock_datas from the database.
 useEffect(() => {
   async function getStocks() {
     const response = await fetch(`http://localhost:5000/eod_stock_data/`);
 
     if (!response.ok) { 
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const eod_stock_datas = await response.json();
     setStocks(eod_stock_datas);
   }
 
   getStocks();
 
   return;
 }, [eod_stock_datas.length]);
 
 // This method will delete a eod_stock_data
 async function deleteStock(id) {
   await fetch(`http://localhost:5000/eodstockdata/delete/${id}`, {
     method: "DELETE"
   });
 
   const newStocks = eod_stock_datas.filter((el) => el._id !== id);
   setStocks(newStocks);
 }
 
 // This method will map out the eod_stock_datas on the table
 function eod_stock_dataList() {
   return eod_stock_datas.map((eod_stock_data) => {
     return (
       <Stock
         eod_stock_data={eod_stock_data}
         deleteStock={() => deleteStock(eod_stock_data._id)}
         key={eod_stock_data._id}
       />
     );
   });
 }
 
 // This following section will display the table with the eod_stock_datas of individuals.
 return (
   <div>
     <h3>EOD List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
         <th>EOD_DATE</th>
<th>STOCK_ID</th>
<th>OPEN</th>
<th>HIGH</th>
<th>LOW</th>
<th>LAST</th>
<th>TECHNICAL_RATING</th>
<th>OSCILLATORS_RATING</th>
<th>MOVING_AVERAGES_RATING</th>

           <th>Action</th>
         </tr>
       </thead>
       <tbody>{eod_stock_dataList()}</tbody>
     </table>
   </div>
 );
}