import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Col, Container, Row,Button } from "react-bootstrap";
export default function StockEdit() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    sector: "",
    exchange_id: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/stock/${params.id.toString()}`
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
    const editedstock = {
      name: form.name,
      code: form.code,
      description: form.description,
      sector: form.sector,
      exchange_id: form.exchange_id,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/stock/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedstock),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/stocks");
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
      <h3>Update Stock</h3>
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
          <label htmlFor="code">Code</label>
          <input
            type="text"
            className="form-control"
            id="code"
            value={form.code}
            onChange={(e) => updateForm({ code: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Sector</label>
          <input
            type="text"
            className="form-control"
            id="sector"
            value={form.sector}
            onChange={(e) => updateForm({ sector: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Exchange ID</label>
          <input
            type="text"
            className="form-control"
            id="exchange_id"
            value={form.exchange_id}
            onChange={(e) => updateForm({ exchange_id: e.target.value })}
          />
        </div><br></br>
        <div className="form-group">
          <input
            type="submit"
            value="Update Stock"
            className="btn btn-primary"
          />
        </div>
      </form></Col></Row></Container>
    </div>
  );
}
