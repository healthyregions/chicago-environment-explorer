import React, {useState} from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import styled from "styled-components";
import { colors } from "../config";

const AccordionContainer = styled(MuiAccordion)`
  &.MuiPaper-elevation1 {
    box-shadow: none;
    border: 1px solid white;
    transition: 250ms border;
    &.Mui-expanded {
      border: 1px solid green;
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    }
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)``;

const AccordionDetails = styled(MuiAccordionDetails)`
  flex-direction: column;
  p {
    display: block;
  }
`;
/**
 * Generates an accordion component
 * @param {array} entries - The list of entries in the accordion formatted as:
 * [
 *   {
 *     label: 'Label for tab',
 *     content: 'Content for tab'
 *   },
 * ...
 * ].
 * Content and label can be either strings or React Nodes/Components
 * @param {number} initialTab - The index order (0,1,2,...) of the initial open accordion panel.
 */
function Accordion({ entries = [], initialTab = -1 }) {
  const [openTab, setOpenTab] = useState(initialTab);

  return (
    <div>
      {entries.map((entry, index) => {
        const { label, content } = entry;
        return (
          <AccordionContainer
            expanded={openTab === index}
            onChange={() => setOpenTab((prev) => (prev === index ? -1 : index))}
          >
            <AccordionSummary
              aria-controls={`panel${label}-${index}d-content`}
              id={`panel${label}-${index}d-header`}
            >
              <h2>
                <b>{label}</b>
              </h2>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
          </AccordionContainer>
        );
      })}
    </div>
  );
}

export default React.memo(Accordion);