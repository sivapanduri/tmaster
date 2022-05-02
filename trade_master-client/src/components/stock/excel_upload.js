import React,{ useState } from "react";
import { useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import * as XLSX from "xlsx";

export default function ExcelUpload()  {
    const [form, setForm] = useState({eod_date : "",
    stock_id : "",
    open : "",
    high : "",
    low : "",
    last : "",
    technical_rating : "",
    oscillators_rating : "",
    moving_averages_rating : "",
    
      });
      const navigate = useNavigate();
  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
     // const [jsondata] = convertToJson(data);
        var lines = data.split("\n");
      
      for(var i = 1; i < lines.length; i++) {         
        const currentline = lines[i].split(","); 
        const eod_data = {eod_date :  new Date(),
        stock_id :currentline[0],
        open : currentline[6],
        high :currentline[7],
        low : currentline[8],
        last : currentline[9],
        technical_rating : currentline[3],
        oscillators_rating : currentline[4],
        moving_averages_rating :currentline[5]}
        const stock_data={name: currentline[1],
        code: currentline[0],
        description: currentline[1],
        sector: currentline[2],
        exchange_id: "NSE",}
        fetchStock(stock_data)
        addEODdata(eod_data)
       
    }   

    navigate("/eodstockdata");
    async function fetchStock(stock_data) {
      const code = stock_data.code
      console.log(code)
      const response = await fetch(
        `http://localhost:5000/stock_exists/${stock_data.code}`
      );

      
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        addStock(stock_data)
        return;
      }


     
    }
      async function addEODdata(eod_data) {
        e.preventDefault();
      
        // When a post request is sent to the create url, we'll add a new record to the database.
        
      
        await fetch("http://localhost:5000/eod_stock_data/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eod_data),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
      }

      async function addStock(stock_data){
        e.preventDefault();
        await fetch("http://localhost:5000/stock/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(stock_data),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

      }
      
    };

    reader.readAsBinaryString(file);
    function convertToJson(csv) {
        var lines = csv.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
    
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(",");
    
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
    
          result.push(obj);
        }
    
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
      };
  }; 

  return (
    <div>
      <Container className="mt-5">
      <Row>
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
      <input type="file" onChange={onChange} /></Col></Row></Container>
    </div>
  );
}