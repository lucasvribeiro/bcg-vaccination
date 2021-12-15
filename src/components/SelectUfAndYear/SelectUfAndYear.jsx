import React from "react";
import { Link } from "react-router-dom";
import { Select, Button } from "antd";
import styled from "styled-components";

const { Option } = Select;

const MySelect = styled(Select)`
  width: 100%;
  margin-bottom: 24px;
`;

const SelectUfAndYear = (props) => {
  return (
    <>
      <div style={{marginBottom: '24px'}}>
        <h2> Selecione o Estado (UF):</h2>

        <MySelect
          showSearch
          size="large"
          placeholder="Estado"
          onChange={props.setUf}
        >
          {props.ufsList.UF.map((uf) => {
            return (
              <Option value={uf.abbr} key={uf.abbr}>
                {uf.abbr} - {uf.name}
              </Option>
            );
          })}
        </MySelect>

        <h2> Selecione o Ano:</h2>
        <MySelect size="large" placeholder="Ano" onChange={props.setYear}>
          {props.yearsList.map((year) => {
            return (
              <Option value={year} key={year}>
                {year}
              </Option>
            );
          })}
        </MySelect>
      </div>

      <Link to={{pathname: `/map/${props.uf}/${props.year}`, teste: 'aa'}}>
        <Button type="primary" size="large">
          Visualizar Mapa
        </Button>
      </Link>
    </>
  );
};

export default SelectUfAndYear;
