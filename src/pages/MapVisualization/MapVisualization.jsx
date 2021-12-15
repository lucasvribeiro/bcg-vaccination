import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Popover } from "antd";

import "./MapVisualization.css";

const MapVisualization = () => {
  const [uf, setUf] = useState(useParams().uf);
  const [year, setYear] = useState(useParams().year);
  const [data, setData] = useState();
  const [map, setMap] = useState();
  const [hoveredCity, setHoveredCity] = useState();

  useEffect(() => {
    setData(
      require(`../../services/data-json/${uf}.json`).data.filter(
        (data) => data.ano === year
      )
    );

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
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    document.onmouseover = function (e) {
      e = e || window.event;

      console.log(e.offsetX);

      const popup = document.getElementById("popup");

      if (popup) {
        popup.style.top = `${e.offsetY + 20}px`;
        popup.style.left = `${e.offsetX + 20}px`;
      }

      setHoveredCity(data.filter((d) => d.id_munic === e.target.id)[0]);
    };

    if (map) {
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
  }, [map, data]);

  return (
    <>
      <div>{map && <div dangerouslySetInnerHTML={{ __html: map }} />}</div>
      {hoveredCity && (
        <div className="popup" id="popup">
          {hoveredCity.nomemun} - {hoveredCity.cob_vac_bcg}
        </div>
      )}
    </>
  );
};

export default MapVisualization;
