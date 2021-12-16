import React, { useState, useEffect } from "react";
import { Select } from "antd";
import styled from "styled-components";
import { LeftCircleOutlined } from "@ant-design/icons/lib/icons";
import { Spin } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import SideMenu from "../../components/SideMenu/SideMenu";

import ufsList from "../../services/ufs.json";

import "./MapVisualization.css";

const { Option } = Select;

const MySelect = styled(Select)`
  width: 100%;
  margin-bottom: 24px;
`;

const MapVisualization = () => {
  const [data, setData] = useState();
  const [map, setMap] = useState();
  const [hoveredCity, setHoveredCity] = useState();
  const [loading, setLoading] = useState(true);

  const uf = useParams().uf;
  const year = useParams().year;

  function getDataFromJson() {
    setData(
      require(`../../services/data-json/${uf}.json`).data.filter(
        (data) => data.ano === year.toString()
      )
    );
  }

  function getMapFromApi() {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${uf}?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=municipio`
      )
      .then((res) => {
        setMap(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fillMapColors() {
    for (let i = 0; i < data.length; i++) {
      let city = document.getElementById(data[i].id_munic);
      let bcgValue = data[i].cob_vac_bcg;

      if (bcgValue < 10) city.classList.add("map-color-10");
      else if (bcgValue < 20) city.classList.add("map-color-20");
      else if (bcgValue < 30) city.classList.add("map-color-30");
      else if (bcgValue < 40) city.classList.add("map-color-40");
      else if (bcgValue < 50) city.classList.add("map-color-50");
      else if (bcgValue < 60) city.classList.add("map-color-60");
      else if (bcgValue < 70) city.classList.add("map-color-70");
      else if (bcgValue < 80) city.classList.add("map-color-80");
      else if (bcgValue < 90) city.classList.add("map-color-90");
      else city.classList.add("map-color-100");
    }

    setLoading(false);
  }

  function handleCityHover(e) {
    if (data) {
      const popup = document.getElementById("popup");
      const hoveredCity = data.filter((d) => d.id_munic === e.target.id)[0];

      if (hoveredCity) {
        // Remove if there is a previous city hovered.
        const previous = document.getElementsByClassName("selected-city")[0];
        if (previous) previous.classList.remove("selected-city");

        e.target.classList.add("selected-city");
        var rect = e.target.getBoundingClientRect();
        console.log(rect.top, rect.left);

        if (e.view.screen.availWidth < 900) {
          if (rect.top + 180 > e.view.screen.availHeight) {
            popup.style.top = `${rect.top - 20}px`;
          } else {
            popup.style.top = `${rect.top + 160}px`;
          }
        } else {
          if (rect.top + 280 > e.view.screen.availHeight) {
            popup.style.top = `${rect.top - 70}px`;
          } else {
            popup.style.top = `${rect.top + 15}px`;
          }
        }

        if (e.view.screen.availWidth < 900) {
          if (rect.left + 180 > e.view.screen.availWidth) {
            popup.style.left = `${rect.left - 160}px`;
          } else {
            popup.style.left = `${rect.left + 10}px`;
          }
        } else {
          if (rect.left + 360 > e.view.screen.availWidth) {
            popup.style.left = `${rect.left - 220}px`;
          } else {
            popup.style.left = `${rect.left + 60}px`;
          }
        }

        popup.classList.add("visible");
        setHoveredCity(hoveredCity);
        console.log(hoveredCity);
      } else {
        popup.classList.remove("visible");
        const previous = document.getElementsByClassName("selected-city")[0];
        if (previous) previous.classList.remove("selected-city");
      }
    }
  }

  function handleSelectChanged(e) {
    const city = document.getElementById(
      data.filter((d) => d.nomemun === e)[0].id_munic
    );

    var event = new MouseEvent("mouseover", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    city.dispatchEvent(event);
  }

  useEffect(() => {
    getDataFromJson();
    getMapFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (map) fillMapColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <Spin spinning={loading} size="large">
      <div className="map-page">
        <SideMenu
          year={year}
          uf={uf}
          title={
            <>
              <Link to={"/initial"}>
                <LeftCircleOutlined /> &nbsp;&nbsp;
              </Link>
              {uf} - {ufsList.UF.filter((iterUF) => iterUF.abbr === uf)[0].name}{" "}
              | {year}
            </>
          }
          content={
            <>
              <p style={{ fontSize: "1rem" }}>
                Selecione um Município para Visualizar:
              </p>

              <MySelect
                showSearch
                size="large"
                placeholder="Município"
                onChange={handleSelectChanged}
              >
                {data &&
                  data.map((city) => {
                    return (
                      <Option value={city.nomemun} key={city.id_munic}>
                        {city.nomemun}
                      </Option>
                    );
                  })}
              </MySelect>
            </>
          }
        />

        <div className="map-container">
          <h2 className="map-title">
            Mapa coroplético de vacinação BCG em:{" "}
            {ufsList.UF.filter((iterUF) => iterUF.abbr === uf)[0].name} no ano
            de {year}.
          </h2>
          {map && (
            <div
              style={{ textAlign: "center" }}
              onMouseOver={handleCityHover}
              dangerouslySetInnerHTML={{ __html: map }}
            />
          )}
        </div>

        <div className="popup" id="popup">
          <p className="popup-title">{hoveredCity?.nomemun}</p>
          <p className="popup-content">
            {Number(hoveredCity?.cob_vac_bcg).toFixed(2)}%
          </p>
        </div>
      </div>
    </Spin>
  );
};

export default MapVisualization;
