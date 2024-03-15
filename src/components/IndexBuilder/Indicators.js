import React from "react";
import {colors, dataDescriptions, variablePresets} from "../../config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Divider, ToggleButton} from "@mui/material";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {SLIDER_DEFAULT} from "./Weights";

const css = `
    .MuiGrid-container.MuiGrid-root {
        margin: 10px;
    }
    
    .MuiGrid-item {
        padding-left: 0 !important;
    }
    
    .filter-black {
        filter: invert(0%) sepia(18%) saturate(0%) hue-rotate(222deg) brightness(0%) contrast(100%);
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 1rem;
        vertical-align: middle;
    }
    
    .kid-icon {
        height: 2rem;
        width: 2rem;
    }
`

const palegreen = '#B9D19F';

const IndicatorsCategory = ({ variableName, selections, index }) => {
    const categoryName = variableName.split("HEADER::")[1];

    const getLogo = (categoryName) => <>
        {
            (categoryName === 'Air Pollution' || categoryName === 'Air Quality') &&
            <img alt="" src={'/icons/index-builder/logo_factory.svg'} className={'filter-black'} />
        }
        {
            (categoryName === 'Demographic') &&
            <img alt="" src={'/icons/index-builder/logo_kid.svg'} className={'filter-black kid-icon'} />
        }
        {
            (categoryName === 'Ecology & Greenness' || categoryName === 'Ecology and Greenness') &&
            <img alt="" src={'/icons/index-builder/logo_tree.svg'} className={'filter-black'} />
        }
        {
            (categoryName === 'Social') &&
            <img alt="" src={'/icons/index-builder/logo_people.svg'} className={'filter-black'} />
        }
        {
            (categoryName === 'Health') &&
            <img alt="" src={'/icons/index-builder/logo_heart.svg'} className={'filter-black'} />
        }
        {
            (categoryName === 'Environment') &&
            <img alt="" src={'/icons/index-builder/logo_flood.svg'} className={'filter-black'} />
        }
        {
            (categoryName === 'Built Environment') &&
            <img alt="" src={'/icons/index-builder/logo_traffic.svg'} className={'filter-black'} />
        }
    </>

    const logo = getLogo(categoryName);
    const { length } = selections.filter(sel => {
        console.log(`Checking if ${sel.name} is in ${categoryName}: ${sel.categoryName === categoryName}`);
        return sel.categoryName === categoryName;
    });

    return(
        <>
            {
                index > 0 && <Divider style={{width: '20%', margin: '10px', fontWeight: 'bold'}}></Divider>
            }
            <h2>
                {logo} {categoryName}

                <span style={{ color: colors.forest, fontSize: '10pt', float: 'right', paddingTop: '0.5rem', paddingRight: '1rem' }}>
                    {length} SELECTED
                </span>
            </h2>
        </>
    );
}

/** Renders a toggle button that allow the given variable/indicator to be selected */
const IndicatorsSelectableItem = ({ categoryName, selections, variableName, toggleSelection, setSelectedDetails }) =>
    <ToggleButton style={{
        width: '9rem',
        height: '9rem',
        color: selections.find(i => i.name === variableName) ? colors.white : colors.forest,
        background: selections.find(i => i.name === variableName) ? colors.forest : colors.white,
        borderColor: selections.find(i => i.name === variableName) ? colors.forest : palegreen,
        borderWidth: '2px',
        marginTop: '1rem',
        marginRight: '1rem',
        padding: '0',
        textTransform: 'capitalize',
        position: 'relative',
        alignItems: 'flex-end',
    }} onClick={() => toggleSelection(variableName, categoryName)} value={variableName}>
        <FaInfoCircle style={{ zIndex: 99, right: '1rem', top: '1rem', position: 'absolute', cursor: 'pointer', height: '24px', width: '24px'  }}
                      color={palegreen}
                      onClick={(e) => {
                          setSelectedDetails({
                              name: variableName,
                              categoryName: categoryName,
                              description: dataDescriptions[variableName],
                              value: SLIDER_DEFAULT
                          });
                          e.stopPropagation();
                          e.preventDefault();
                      }}></FaInfoCircle>

        <style>{css}</style>
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

    toggleSelection(variableName, categoryName) {
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
                categoryName: variablePresets[variableName]?.listGroup,
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
                                              selections={this.props.selections}
                                              index={i}></IndicatorsCategory>
                        : <IndicatorsSelectableItem key={'variable-selectable-item-' + variable}
                                                    categoryName={variable.listGroup}
                                                    selections={this.props.selections}
                                                    variableName={variable}
                                                    setSelectedDetails={this.props.setSelectedDetails}
                                                    toggleSelection={() => this.toggleSelection(variable, variable.listGroup)}>
                        </IndicatorsSelectableItem>
                ))}
            </div>
        );
    }
}

export default IndicatorsList;
