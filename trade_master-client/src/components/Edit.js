import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Col, Container, Row,Button } from "react-bootstrap";
import axios from "axios";
 const Edit = ()=> {
 const [form, setForm] = useState({
   name: "",
   code: "",
   status: "",
   records: []
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   alert("hi");
   e.preventDefault();
   const editedValues = {
     name: form.name,
     code: form.code,
     status: form.status,
   };
 console.log("editedvalues",editedValues)
   // This will send a post request to update the data in the database.
   try{
  const res= await axios.post(`http://localhost:5000/update/${params.id}`, editedValues)
     console.log(res.message);
   navigate("/");
   }catch(error){
     console.log(error.message)
   }
 }
 
 // This following section will display the form that takes input from the user to update the data.
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
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="code">Code: </label>
         <input
           type="text"
           className="form-control"
           id="code"
           value={form.code}
           onChange={(e) => updateForm({ code: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="statusOptions"
             id="statusActive"
             value="Active"
             checked={form.status === "Active"}
             onChange={(e) => updateForm({ status: e.target.value })}
           />
           <label htmlFor="statusActive" className="form-check-label">Active</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="statusOptions"
             id="statusInactive"
             value="Inactive"
             checked={form.status === "Inactive"}
             onChange={(e) => updateForm({ status: e.target.value })}
           />
           <label htmlFor="statusInActive" className="form-check-label">Inactive</label>
         </div>
        
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
     </Col>
     </Row>
     </Container>
   </div>
 );
}
export default Edit;