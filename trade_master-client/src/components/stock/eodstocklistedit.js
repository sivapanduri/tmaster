import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Col, Container, Row, Button } from "react-bootstrap";
export default function StockEdit() {
  const [form, setForm] = useState({
     eod_date:"",
    stock_id: "",
    open: "",
    high: "",
    low: "",
    last: "",
    technical_rating: "",
    oscillators_rating: "",
    moving_averages_rating: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/eod_stock_data/${params.id.toString()}`
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
    const editedeodstock = {
        eod_date:form.eod_date,
      stock_id: form.stock_id,
      open: form.open,
      high: form.high,
      low: form.low,
      last: form.last,
      technical_rating: form.technical_rating,
      oscillators_rating: form.oscillators_rating,
      moving_averages_rating: form.moving_averages_rating,
    };
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/eod_stock_data/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedeodstock),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/eodstockdata");
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
            <h3>Update EOD Stock</h3>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="code">EOD_Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="eod_date"
                  value={form.eod_date}
                  onChange={(e) => updateForm({eod_date: e.target.value })}
               readOnly/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Stock_id</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock_id"
                  value={form.stock_id}
                  onChange={(e) => updateForm({ stock_id: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">OPen</label>
                <input
                  type="text"
                  className="form-control"
                  id="open"
                  value={form.open}
                  onChange={(e) => updateForm({ open: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">High</label>
                <input
                  type="text"
                  className="form-control"
                  id="high"
                  value={form.high}
                  onChange={(e) => updateForm({ high: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Low</label>
                <input
                  type="text"
                  className="form-control"
                  id="low"
                  value={form.low}
                  onChange={(e) => updateForm({ low: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">last</label>
                <input
                  type="text"
                  className="form-control"
                  id="last"
                  value={form.last}
                  onChange={(e) => updateForm({ last: e.target.value })}
                />
              </div>
            
              <div className="form-group">
                <label htmlFor="code">Technical_Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="technical_rating"
                  value={form.technical_rating}
                  onChange={(e) =>
                    updateForm({ technical_rating: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Oscillators_Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="oscillators_rating"
                  value={form.oscillators_rating}
                  onChange={(e) =>
                    updateForm({ oscillators_rating: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Moving_Averages_Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="movie_averages_rating"
                  value={form.moving_averages_rating}
                  onChange={(e) =>
                    updateForm({ moving_averages_rating: e.target.value })
                  }
                />
              </div>
              <br></br>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update EOD Stock"
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
