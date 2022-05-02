import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = (props) => (
  <tr>
    <td>{props.portfolio.code}</td>
    <td>{props.portfolio.buy_price}</td>
    <td>{props.portfolio.buy_quantity}</td>
    <td>{props.portfolio.sell_price}</td>
    <td>{props.portfolio.sell_quantity}</td>
    <td>{props.portfolio.buy_data}</td>
    <td>{props.portfolio.sell_date}</td>
    <td>
      <Link className="btn btn-link" to={`/portfolio/edit/${props.portfolio._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deletePortfolio(props.portfolio._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);

  // This method fetches the portfolios from the database.
  useEffect(() => {
    async function getPortfolios() {
      const response = await fetch(`http://localhost:5000/portfolio/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const portfolios = await response.json();
      setPortfolios(portfolios);
    }

    getPortfolios();

    return;
  }, [portfolios.length]);

  // This method will delete a portfolio
  async function deletePortfolio(id) {
    await fetch(`http://localhost:5000/portfolio/delete/${id}`, {
      method: "DELETE",
    });

    const newPortfolios = portfolios.filter((el) => el._id !== id);
    setPortfolios(newPortfolios);
  }

  // This method will map out the portfolios on the table
  function portfolioList() {
    return portfolios.map((portfolio) => {
      return (
        <Portfolio
          portfolio={portfolio}
          deletePortfolio={() => deletePortfolio(portfolio._id)}
          key={portfolio._id}
        />
      );
    });
  }

  // This following section will display the table with the portfolios of individuals.
  return (
    <div>
      <h3>Portfolio List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Buy Price</th>
            <th>Buy Quantity</th>
            <th>Sell Price</th>
            <th>Sell Quantity</th>
            <th>Buy Date</th>
            <th>Sell Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{portfolioList()}</tbody>
      </table>
    </div>
  );
}
