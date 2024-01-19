import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {colors, dataDescriptions, variablePresets} from "../../config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Divider, Step, StepLabel, Stepper, ToggleButton} from "@mui/material";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import Button from "@mui/material/Button";
import {changeVariable} from "../../actions";
import DebugInfo from "./DebugInfo";

const IndicatorsHelperText = ({ selections }) =>
    <>
        <Typography variant="h4" gutterBottom>
            Let's create your <strong>Custom Index</strong>
        </Typography>
        <Typography component="div">
            Creating your custom index in 3 easy steps:
        </Typography>
        <Grid>
            <Grid item xs={8}>
                <Stepper orientation={'vertical'}>
                    <Step key={'indicator-step1'} active={true}>
                        <StepLabel>
                            <Typography variant="subtitle">
                                Select the indicators from the options on the right. If you want to know more
                                about each indicator, click on the tooltip <FaInfoCircle></FaInfoCircle> icon
                                to learn more about it.
                            </Typography>
                        </StepLabel>
                    </Step>
                    <Step key={'indicator-step2'} active={true}>
                        <StepLabel>
                            <Typography variant="subtitle">
                                In the next step, set importance for each indicator you've selected to create
                                an index that is tailored to your needs.
                            </Typography>
                        </StepLabel>
                    </Step>
                    <Step key={'indicator-step3'} active={true}>
                        <StepLabel>
                            <Typography variant="subtitle">
                                Preview the summary of the selected indicators with their weights and the map
                                preview with your selected criteria.
                            </Typography>
                        </StepLabel>
                    </Step>
                </Stepper>
            </Grid>
        </Grid>
        <DebugInfo data={selections}></DebugInfo>
    </>

const IndicatorsDetails = ({ selectedDetails, setSelectedDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <Button onClick={() => setSelectedDetails(undefined)}>&larr; Back to instructions</Button>
            {
                /*
                TODO: How do we place the correct icon?
                <i className={category?.icon}></i>
                */
            }
            <Typography variant="h5" gutterBottom>
                {selectedDetails?.name}
            </Typography>
            <div>
                <Button onClick={() => history.push('/data')}>More &rarr;</Button>
                <Button onClick={() => {
                    history.push('/map');
                    setTimeout(() => {
                        dispatch(changeVariable(variablePresets[selectedDetails.name]));
                    }, 1500);
                }}>Map &rarr;</Button>
            </div>
            <Grid>
                <Grid item xs={9}>
                    <Typography variant={'caption'}>
                        {selectedDetails?.description}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
    }


const IndicatorsCategory = ({ variableName, index }) => {
    return(
        <>
            {
                index > 0 && <Divider style={{width: '20%', margin: '10px', fontWeight: 'bold'}}></Divider>
            }
            <h2>
                {
                    /*
                    TODO: How do we place the correct icon?
                    <i className={category?.icon}></i>
                    */
                }
                {variableName.split("HEADER::")[1]}
            </h2>
        </>
    );
}

/** Renders a list of toggle buttons that allow each variable/indicator to be selected */
// NOTE: There is no equivalent of getSnapshotBeforeUpdate using React hooks, so we are forced to use a Class component here
class IndicatorsList extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Did we select or de-select an item?
        // Capture the scroll position so we can adjust scroll later.
        if (this.props.selections.length !== prevProps.selections.length) {
            const { scrollTop, scrollHeight } = this.listRef.current;
            return scrollHeight - scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just selected or de-selected an item.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }
    }

    render() {
        return (
            <div style={{ overflowY: 'auto', maxHeight: '70vh' }} ref={this.listRef}>
                {Object.keys(variablePresets).map((variable, i) => (
                    variable.includes("HEADER::")
                        ? <IndicatorsCategory key={`list-header-${i}`}
                                              variableName={variable}
                                              index={i}></IndicatorsCategory>
                        : <IndicatorsSelectableItem key={'variable-selectable-item-' + variable}
                                                    selections={this.props.selections}
                                                    variableName={variable}
                                                    setSelectedDetails={this.props.setSelectedDetails}
                                                    toggleSelection={this.props.toggleSelection}
                                                    style={{margin: '10px'}}></IndicatorsSelectableItem>
                ))}
            </div>
        );
    }
}

/** Renders a toggle button that allow the given variable/indicator to be selected */
const IndicatorsSelectableItem = ({ selections, variableName, toggleSelection, setSelectedDetails }) =>
    <ToggleButton style={{
        width: '8rem',
        height: '8rem',
        color: selections.find(i => i.name === variableName) ? colors.white : colors.forest,
        background: selections.find(i => i.name === variableName) ? colors.forest : colors.white,
        borderColor: colors.forest,
        borderWidth: '2px',
        marginTop: '10px',
        marginRight: '10px',
        padding: '0'
    }} onClick={() => toggleSelection(variableName)} value={variableName}>
        <FaInfoCircle style={{ zIndex: 99, right: '-6.5rem', top: '-3rem', position: 'relative', cursor: 'pointer' }}
                      color={colors.green}
                      onClick={(e) => {
                          setSelectedDetails({
                              name: variableName,
                              description: dataDescriptions[variableName],
                              value: 5
                          });
                          e.stopPropagation();
                          e.preventDefault();
                      }}></FaInfoCircle>
        <Grid container spacing={3}>
            <Grid style={{ textAlign: 'left' }} item xs>
                <Typography variant={'body2'}>{variableName}</Typography>
            </Grid>
        </Grid>
    </ToggleButton>

/** Given a set of possible indicators (separated into categories), allow user to select one or more indicators */
const IndicatorsStep = ({ selections, setSelections, setCurrentStep }) => {
    // User's last-clicked tooltip icon
    const [selectedDetails, setSelectedDetails] = useState(undefined);

    const toggleSelection = (variableName) => {
        const localCopy = [...selections];

        // Check if item is selected
        const existing = localCopy.find(i => i.name === variableName);
        if (existing) {
            // Item is selected - de-select it
            const index = selections.indexOf(existing);
            localCopy.splice(index, 1);
            setSelections(localCopy);
        } else {
            // Item is not selected - select it
            setSelections(localCopy.concat([{
                name: variableName,
                description: dataDescriptions[variableName],
                value: 5
            }]));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {
                    !selectedDetails && <>
                        <Button disabled={true}>&larr; Back</Button>
                        <Button disabled={selections.length === 0} onClick={() => setCurrentStep('weights')}>Next &rarr;</Button>

                        <IndicatorsHelperText></IndicatorsHelperText>
                    </>
                }
                {
                    selectedDetails && <IndicatorsDetails selectedDetails={selectedDetails} setSelectedDetails={setSelectedDetails}></IndicatorsDetails>
                }
            </Grid>
            <Grid item xs style={{ paddingTop: '8vh' }}>
                <IndicatorsList selections={selections}
                                toggleSelection={toggleSelection}
                                setSelectedDetails={setSelectedDetails}></IndicatorsList>
            </Grid>
        </Grid>
    );
}

export default IndicatorsStep;
