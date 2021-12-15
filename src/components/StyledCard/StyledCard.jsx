import { Card } from "antd";
import styled from "styled-components";

import "./StyledCard.css";

const MyCard = styled(Card)`
  background-color: #fff;
  width: 90vw;
  max-width: 600px;
  height: 65vh;
  max-height: 600px;
  border-radius: 8px;
  -webkit-box-shadow: 3px 6px 25px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 6px 25px -5px rgba(0, 0, 0, 0.2);
  padding: 36px;

  @media only screen and (max-width: 600px) {
     {
      padding: 12px;
    }
  }
`;

const StyledCard = (props) => {
  return <MyCard>{props.content}</MyCard>;
};

export default StyledCard;
