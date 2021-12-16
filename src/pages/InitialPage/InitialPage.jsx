import React, { useState } from "react";
import BackgroundSlider from "react-background-slider";

import StyledCard from "../../components/StyledCard/StyledCard";
import SelectUfAndYear from "../../components/SelectUfAndYear/SelectUfAndYear";

import background01 from "../../images/background-01.jpg";
import background02 from "../../images/background-02.jpg";
import background03 from "../../images/background-03.jpg";
import background04 from "../../images/background-04.jpg";

import vaccineImg from "../../images/vaccine.png";
import ufsList from "../../services/ufs.json";

import "./InitialPage.css";

const yearsList = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

const InitialPage = () => {
  const [uf, setUf] = useState();
  const [year, setYear] = useState();

  return (
    <div className="initial-page">
      <BackgroundSlider
        images={[background01, background02, background03, background04]}
        duration={8}
        transition={2}
      />

      <div className="header">
        <img src={vaccineImg} alt="Vaccine Icon" />
        <h1>&nbsp; Vacinação BCG no Brasil </h1>
      </div>

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
