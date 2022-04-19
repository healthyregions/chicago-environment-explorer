import React from "react";
import styled from "styled-components";
// import { nicelyFormatNumber } from "../utils";

const colorScale = {
  Good: "#00e400",
  Moderate: "#ffde33",
  "Unhealthy for Sensitive Groups": "#ff9933",
  Unhealthy: "#ff4d4d",
  "Very Unhealthy": "#cc0033",
  Hazardous: "#660099",
};

const categorize = (pm25) => {
  if (pm25 < 50) {
    return "Good";
  } else if (pm25 < 100) {
    return "Moderate";
  } else if (pm25 < 150) {
    return "Unhealthy for Sensitive Groups";
  } else if (pm25 < 200) {
    return "Unhealthy";
  } else if (pm25 < 250) {
    return "Very Unhealthy";
  } else {
    return "Hazardous";
  }
};

const Pm25Text = styled.span`
    span {
        padding:.25em;
        color:white;
        font-weight: bold;
    }
`

export default function Pm25Report({ value = 0, label = "" }) {
  const category = categorize(value);
  const color = colorScale[category];

  return (
    <Pm25Text>
      <span style={{ backgroundColor: color }}>{category}</span>
      {" "}{!!value && typeof value === "number" && value.toFixed(1)}
    </Pm25Text>
  );
}
