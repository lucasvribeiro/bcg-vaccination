import React, { useState, useEffect } from "react";

import StyledCard from "../../components/StyledCard/StyledCard";
import SelectUfAndYear from "../../components/SelectUfAndYear/SelectUfAndYear";

import ufsList from "../../services/ufs.json";

import "./InitialPage.css";

const yearsList = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

const InitialPage = () => {
  const [uf, setUf] = useState();
  const [year, setYear] = useState();

  useEffect(() => {
    console.log(uf);
  }, [uf]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledCard
        bordered={false}
        content={
          <SelectUfAndYear
            uf={uf}
            setUf={setUf}
            ufsList={ufsList}
            year={year}
            setYear={setYear}
            yearsList={yearsList}
          />
        }
      ></StyledCard>
    </div>
  );
};

export default InitialPage;
