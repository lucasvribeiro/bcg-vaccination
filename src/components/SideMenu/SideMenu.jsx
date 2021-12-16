import React from "react";
import styled from "styled-components";

const MySideMenu = styled.div`
  width: 30vw;
  height: 100vh;
  -webkit-box-shadow: 3px 6px 25px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 6px 25px -5px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 900px) {
     {
      width: 100vw;
      height: fit-content;
    }
  }
`;

const SideMenuTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 24px;
`;

const SideMenuContent = styled.div`
  text-align: center;
  margin: 56px 24px 12px 24px;

  @media only screen and (max-width: 600px) {
     {
      margin: 24px 24px 12px 24px;
    }
  }
`;

const SideMenu = (props) => {
  return (
    <MySideMenu>
      <SideMenuTitle>{props.title}</SideMenuTitle>
      <SideMenuContent>{props.content}</SideMenuContent>
    </MySideMenu>
  );
};

export default SideMenu;
