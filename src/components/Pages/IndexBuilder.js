import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {DataPanel, Legend, MapSection, VariablePanel} from "../index";

import IndicatorsList from "../IndexBuilder/Indicators";
import IndicatorDetails from "../IndexBuilder/IndicatorDetails";
import IndexBuilderFooter from "../IndexBuilder/IndexBuilderFooter";
import {WeightsSliders, WeightsPieChart} from "../IndexBuilder/Weights";
import {IndicatorsHelperText, WeightsHelperText} from "../IndexBuilder/HelperText";

import {useDispatch, useSelector} from "react-redux";
import {defaultBounds} from "../Pages/Map";
import {colors} from "../../config";
import {FaArrowCircleLeft} from "@react-icons/all-files/fa/FaArrowCircleLeft";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {setPanelState} from "../../actions";

// TODO: Convert style={{ }} to styled-components

const FloatingPanel = styled.h1`
  font-weight: normal;
  position: fixed;
  margin: 0;
  padding: 5px;
  z-index: 1;
  width: 375px;
  border: 1px solid ${colors.green};
  background-color: ${colors.white};
  box-shadow: rgba(43, 43, 43, 0.267) 3px 0px 5px;;
  min-width: 200px;
`;

const BoldedPinkText = styled.strong`
  color: ${colors.pink};
`

/** Paged wizard-like component to present indicators for selection + allow user to set the weights */
export default function IndexBuilder() {
    const history = useHistory();
    const dispatch = useDispatch();

    /** for example, see components/IndexBuilder/IndicatorsStep */
    const [steps] = useState(['indicators', 'weights', 'summary']);
    const [currentStep, setCurrentStep] = useState(steps[0]);

    // User's last-clicked tooltip icon
    const [selectedDetails, setSelectedDetails] = useState(undefined);

    // User's indicator/variable selections
    // TODO: Default selections?
    const [selections, setSelections] = useState([]);

    const mapParams = useSelector((state) => state.mapParams);

    dispatch(setPanelState({info: false}));

    return (
        <>
            { /*<NavBar showMapControls={true} bounds={defaultBounds} />*/ }

            <Grid container spacing={2} style={{ marginTop:'4vh', marginBottom:'10vh', paddingLeft: '15vw', paddingRight: '15vw' }}>
                <Grid item xs={6}>
                    {
                        currentStep === 'indicators' && !selectedDetails && <>
                            <h1 style={{ marginBottom: '2rem', fontWeight: 'normal' }}>
                                <FaArrowCircleLeft onClick={() => history.goBack()} style={{ verticalAlign: 'middle', marginRight: '1rem', color: colors.forest, cursor: 'pointer' }} />
                                1. Select Indicators
                            </h1>
                            <IndicatorsHelperText />
                        </>

                    }
                    {
                        currentStep === 'weights' && !selectedDetails && <>
                            <h1 style={{ marginBottom: '2rem', fontWeight: 'normal' }}>
                                <FaArrowCircleLeft onClick={() => setCurrentStep('indicators')} style={{ verticalAlign: 'middle', marginRight: '1rem', color: colors.forest, cursor: 'pointer' }} />
                                2. Choose Weights
                            </h1>
                            <WeightsHelperText />
                            <WeightsPieChart selections={selections} />
                        </>
                    }
                    {
                        !!selectedDetails && <>
                            <IndicatorDetails selectedDetails={selectedDetails}
                                              setSelectedDetails={setSelectedDetails} />
                            {
                                currentStep === 'weights' && <WeightsPieChart selections={selections}
                                                                              width={500}
                                                                              height={300} />
                            }
                        </>
                    }
                </Grid>
                <Grid item xs style={{ paddingTop: '8vh' }}>
                    {
                        currentStep === 'indicators' && <>
                            <IndicatorsList selections={selections}
                                            setSelections={setSelections}
                                            setCurrentStep={setCurrentStep}
                                            setSelectedDetails={setSelectedDetails} />
                        </>
                    }
                    {
                        currentStep === 'weights' && <>
                            <WeightsSliders selections={selections}
                                            setSelections={setSelections}
                                            setSelectedDetails={setSelectedDetails} />
                        </>
                    }
                </Grid>
            </Grid>

            {
                currentStep === 'summary' && <>
                    <FloatingPanel style={{ top: '25px', left: '20px' }}>
                        <FaArrowCircleLeft onClick={() => setCurrentStep('weights')} style={{ verticalAlign: 'middle', marginRight: '1rem', color: colors.forest, cursor: 'pointer' }} />
                        3. Summary & Map
                    </FloatingPanel>
                    <div id="mainContainer" style={{ position: 'fixed' }}>
                        <MapSection bounds={defaultBounds} showSearch={false} />
                        <Legend
                            variableName={`${mapParams.variableName} ${
                                mapParams.units ? `(${mapParams.units})` : ""
                            }`}
                            colorScale={mapParams.colorScale}
                            bins={mapParams.bins}
                        />
                        <FloatingPanel style={{ top: '75px', left: '20px', padding: '1rem 2rem' }}>
                            <Typography variant={'h6'} style={{ marginBottom: '1rem' }}>Custom Index</Typography>
                            <Typography variant={'body2'} style={{ marginBottom: '2rem' }}>
                                <p>The custom index you created has themes:</p>
                                <p>
                                    <BoldedPinkText>Ecology & Greenness</BoldedPinkText>,
                                    <BoldedPinkText> Demographic</BoldedPinkText>,
                                    <BoldedPinkText> Health</BoldedPinkText>, and
                                    <BoldedPinkText> Social</BoldedPinkText>.
                                    With an additional focus on social indicators, the custom index
                                    will be useful for house management and family planning policy makers.
                                </p>

                            </Typography>
                            <WeightsPieChart selections={selections}
                                             showLegend={false}
                                             cx={150}
                                             width={350}
                                             height={150} />
                        </FloatingPanel>

                        { /*<VariablePanel />*/ }
                        {/* <DataPanel /> */}
                        {/* <Popover /> */}
                    </div>
                </>
            }
            {
                currentStep !== 'summary' && <IndexBuilderFooter canNext={currentStep !== 'summary' && selections.length > 0}
                                                                 currentStep={currentStep}
                                                                 setCurrentStep={setCurrentStep}
                                                                 setSelections={setSelections}
                                                                 setSelectedDetails={setSelectedDetails} />
            }
        </>
    );
};

