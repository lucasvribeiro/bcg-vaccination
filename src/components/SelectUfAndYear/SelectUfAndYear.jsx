import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Select, Button } from "antd";
import styled from "styled-components";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Option } = Select;

const MySelect = styled(Select)`
  width: 100%;
  margin-bottom: 24px;
`;

const MyButton = styled(Button)`
  width: 100%;
  margin-top: 24px;
`;

const SelectUfAndYear = (props) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
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

      <Link to={`/map/${props.uf}/${props.year}`}>
        <MyButton
          type="primary"
          size="large"
          disabled={!props.uf || !props.year}
        >
          Visualizar Mapa <EnvironmentOutlined />
        </MyButton>
      </Link>
    </>
  );
};

SelectUfAndYear.propTypes = {
  ufsList: PropTypes.array.isRequired,
  yearsList: PropTypes.array.isRequired,
  uf: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  setUf: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
};

export default SelectUfAndYear;
