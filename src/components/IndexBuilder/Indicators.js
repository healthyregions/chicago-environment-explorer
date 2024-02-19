import React from "react";
import {colors, dataDescriptions, variablePresets} from "../../config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Divider, ToggleButton} from "@mui/material";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {SLIDER_DEFAULT} from "./Weights";

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
                              value: SLIDER_DEFAULT
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

    toggleSelection(variableName) {
        const localCopy = [...this.props.selections];

        // Check if item is selected
        const existing = localCopy.find(i => i.name === variableName);
        if (existing) {
            // Item is selected - de-select it
            const index = this.props.selections.indexOf(existing);
            localCopy.splice(index, 1);
            this.props.setSelections(localCopy);
        } else {
            // Item is not selected - select it
            this.props.setSelections(localCopy.concat([{
                name: variableName,
                description: dataDescriptions[variableName],
                value: SLIDER_DEFAULT
            }]));
        }
    };

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
                                                    toggleSelection={() => this.toggleSelection(variable)}
                                                    style={{margin: '10px'}}></IndicatorsSelectableItem>
                ))}
            </div>
        );
    }
}

export default IndicatorsList;
