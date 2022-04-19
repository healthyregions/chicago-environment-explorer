import React from "react";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  height: "85vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function IframeSpeciesInfo({ name, open, setOpen }) {
  const handleClose = () => setOpen(false);
  const url = `https://www.catalogueoflife.org/data/search?facet=rank&facet=issue&facet=status&facet=nomStatus&facet=nameType&facet=field&facet=authorship&facet=extinct&facet=environment&limit=50&offset=0&q=${name}&sortBy=taxonomic`;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <iframe
          src={url}
          width="100%"
          height="100%"
          title={`Catalog of life entry - ${name}`}
        />
      </Box>
    </Modal>
  );
}

export default React.memo(IframeSpeciesInfo);
