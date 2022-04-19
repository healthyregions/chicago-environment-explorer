import React, { useState, useEffect } from "react";
import PolarSpeciesPlotInner from "./PolarSpeciesPlotInner";
import { ParentSize } from "@visx/responsive";
import rawData from "../data/speciesData.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90vw',
  height: '90vh',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PolarSpeciesPlot({ geoid, open, setOpen }) {
  const [data, setData] = useState({});

  const handleClose = () => {
      setData({});
      setOpen(false);
  };

  useEffect(() => {
    const geoidData = rawData[geoid];
    if (geoidData) {
      setData(geoidData[0]);
      setOpen(true);
    } else {
      setData({});
      setOpen(false);
    }
  }, [geoid]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ParentSize>
          {(parent) => (
            <PolarSpeciesPlotInner
              width={parent.width}
              height={parent.height}
              data={data}
            />
          )}
        </ParentSize>
      </Box>
    </Modal>
  );
}
