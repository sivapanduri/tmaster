import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Container, Row,Button } from "react-bootstrap";
export default function AddUser() {
 const [form, setForm] = useState({
   name: "",
   email: "",
   password: "",
   role: "",
 });
 const navigate = useNavigate();
 
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
   const newUser = { ...form };
 
   await fetch("http://localhost:5000/user/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newUser),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "",
   email: "",
   password: "",
   role: "" });
   navigate("/users");
 }
 
 // This following section will display the form that takes the input from the user.
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
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="code">Email</label>
         <input
           type="text"
           className="form-control"
           id="code"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="code">Password</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="code">Role</label>
         <input
           type="text"
           className="form-control"
           id="sector"
           value={form.role}
           onChange={(e) => updateForm({ role: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Insert User"
           className="btn btn-primary"
         />
       </div>
     </form></Col></Row></Container>
   </div>
 );
}