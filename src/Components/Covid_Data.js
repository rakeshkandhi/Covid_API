import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Covid_Data.css";

const Covid_Data = () => {
  const [data, setData] = useState([]);
  // getting the input from the search bar
  const [search, setSearch] = useState("");
  const getCovidData = async () => {
    const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    const resultData = await res.json();
    console.log(resultData.data.regional);
    setData(resultData.data.regional);
  };

  useEffect(() => {
    getCovidData();
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="main">
        <div class="nav" className="area">
          Covid API
        </div>
        <input
          className="input"
          type="text"
          placeholder="   Search State "
          value={search}
          onChange={handleChange}
        />
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {data &&
            data
              .filter((item) => item.loc.includes(search))
              .map((coin) => {
                return (
                  <div class="col">
                    <div class="card border-info mb-3 shadow p-3 mb-5">
                      <span class="card-title">{coin.loc}</span>
                      <p class="card-text">
                        <span className="confirm">Total Confirmed Cases </span>:{" "}
                        <b>{coin.totalConfirmed}</b>
                      </p>
                      <p class="card-text">
                        <span className="death">Total Deaths </span>:{" "}
                        <b>{coin.deaths}</b>
                      </p>
                      <p class="card-text">
                        <span className="safe">Discharged</span>:{" "}
                        <b>{coin.discharged}</b>
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Covid_Data;
