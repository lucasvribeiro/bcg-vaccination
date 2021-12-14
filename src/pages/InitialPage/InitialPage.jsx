import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Select, Button } from "antd";
import styled from "styled-components";

import ufsList from "../../services/ufs.json";

import "./InitialPage.css";

const { Option } = Select;

const yearsList = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

const CardTeste = styled(Card)`
  background-color: #fff;
  width: 90vw;
  max-width: 600px;
  height: 65vh;
  max-height: 600px;
  border-radius: 8px;
  -webkit-box-shadow: 3px 6px 25px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 6px 25px -5px rgba(0, 0, 0, 0.2);
  padding: 24px;
`;

const SelectTeste = styled(Select)`
  width: 100%;
  margin-bottom: 24px;
`;

const ButtonTeste = styled(Button)`
  width: 100%;
`;

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
      <CardTeste bordered={false}>
        <div>
          <h2> Selecione o Estado (UF):</h2>

          <SelectTeste
            showSearch
            size="large"
            placeholder="Estado"
            onChange={setUf}
          >
            {ufsList.UF.map((uf) => {
              return (
                <Option value={uf.abbr} key={uf.abbr}>
                  {uf.abbr} - {uf.name}
                </Option>
              );
            })}
          </SelectTeste>

          <h2> Selecione o Ano:</h2>
          <SelectTeste size="large" placeholder="Ano" onChange={setYear}>
            {yearsList.map((year) => {
              return (
                <Option value={year} key={year}>
                  {year}
                </Option>
              );
            })}
          </SelectTeste>
        </div>

        <Link to={`/map/${uf}/${year}`}>
          <ButtonTeste type="primary" size="large">
            Visualizar Mapa
          </ButtonTeste>
        </Link>
      </CardTeste>
      ,
    </div>
  );
};

export default InitialPage;
