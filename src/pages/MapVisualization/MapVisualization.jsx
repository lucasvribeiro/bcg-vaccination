import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ufsList from "../../services/ufs.json";

import "./MapVisualization.css";

const MapVisualization = () => {
  const [data, setData] = useState();
  const [map, setMap] = useState();
  const [hoveredCity, setHoveredCity] = useState();

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
  }

  function handleCityHover(e) {
    if (data) {
      const popup = document.getElementById("popup");
      const hoveredCity = data.filter((d) => d.id_munic === e.target.id)[0];

      if (hoveredCity) {
        popup.style.top = `${e.pageY + 20}px`;
        popup.style.left = `${e.pageX + 20}px`;
        popup.classList.add("visible");

        setHoveredCity(data.filter((d) => d.id_munic === e.target.id)[0]);
      } else {
        popup.classList.remove("visible");
      }
    }
  }

  useEffect(() => {
    getDataFromJson();
    getMapFromApi();
  }, []);

  useEffect(() => {
    if (map) fillMapColors();
  }, [map]);

  return (
    <div className="map-page">
      <div className="side-menu">
        <p className="side-title">
          {uf} - {ufsList.UF.filter((iterUF) => iterUF.abbr === uf)[0].name} |{" "}
          {year}
        </p>
      </div>
      <div>
        <h2 className="map-title">
          Mapa coroplético de vacinação BCG no Estado do{" "}
          {ufsList.UF.filter((iterUF) => iterUF.abbr === uf)[0].name} em {year}.
        </h2>
        {map && (
          <div
            onMouseOver={handleCityHover}
            className="map-container"
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
  );
};

export default MapVisualization;
