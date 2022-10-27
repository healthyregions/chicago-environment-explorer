import React, { useState, useEffect } from "react";
import PolarSpeciesPlotInner from "./PolarSpeciesPlotInner";
import { ParentSize } from "@visx/responsive";
import rawData from "../../data/speciesData.json";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

const MARGIN = '1em'

export default function PolarSpeciesPlot({ geoid, open, setOpen }) {
  const [data, setData] = useState({
    taxa: {},
    count: 0
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const geoidData = rawData[geoid];
    if (geoidData) {
      setData(geoidData);
      setOpen(true);
    } else {
      setData({
        taxa: {},
        count: 0
      });
      setOpen(false);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoid]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <span style={{ position: 'absolute', left: MARGIN, top: MARGIN }}>
          <h2>Species Taxonomy: Tract {geoid}</h2>
          <h3>Click on a taxonomy node to learn more</h3>
        </span>
        <ParentSize>
          {(parent) => (
            <PolarSpeciesPlotInner
              width={parent.width}
              height={parent.height}
              data={data.taxa}
              count={data.count}
            />
          )}
        </ParentSize>
        <Button
          onClick={handleClose}
          style={{ position: 'absolute', right: 0, top: 0, fontSize:'1.5rem' }}
          title="Close"
          color="success"
        >
          ×
        </Button>
        <p style={{ position: 'absolute', left: MARGIN, bottom: MARGIN, maxWidth: '35ch' }}>
          {data.count < 7 && <>
            ⚠️ This tract has a low number of species observations!
            Join your fellow Chicagoans on <a href="https://www.inaturalist.org/" target="_blank" rel="noopener noreferrer">iNaturalist</a>{" "}
            or <a href="https://budburst.org/" target="_blank" rel="noopener noreferrer">Budburst</a> to help record biodiversity in your neighborhood.
            <br /><br /><hr /><br />
          </>}
          Species taxonomy from <a href="https://www.catalogueoflife.org/" target="_blank" rel="noopener noreferrer">Catalogue of Life</a>.<br />
          Species Observations collected by <a href="https://www.inaturalist.org/" target="_blank" rel="noopener noreferrer">iNaturalist</a>{" "}
          and <a href="https://budburst.org/" target="_blank" rel="noopener noreferrer">Budburst</a> volunteers.
        </p>
      </Box>
    </Modal>
  );
}
