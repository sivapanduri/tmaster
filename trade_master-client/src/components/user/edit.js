import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Col, Container, Row,Button } from "react-bootstrap";
export default function UserEdit() {
  const [form, setForm] = useState({
    name: "",
   email: "",
   password: "",
   role: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/user/${params.id.toString()}`
      );

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
    e.preventDefault();
    const editeduser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/user/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editeduser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/users");
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
      <h3>Update User</h3>
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
           value="Update User"
           className="btn btn-primary"
         />
       </div>
     </form></Col></Row></Container>
    </div>
  );
}
