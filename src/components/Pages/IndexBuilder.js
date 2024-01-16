import React, {useState} from 'react';

import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {
    Card,
    CardContent,
    ToggleButton,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Divider
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import {Cell, Pie, PieChart} from "recharts";
import {FaHashtag} from "@react-icons/all-files/fa/FaHashtag";
import {FaMousePointer} from "@react-icons/all-files/fa/FaMousePointer";

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const GREEN = 'rgb(46, 125, 50)';
const WHITE = 'white';
const BLACK = 'black';
const LIGHTGREEN = 'rgb(151, 219, 79)';
const RED = 'rgb(228, 0, 43)';
const CYAN = 'rgb(65, 182, 230)';
const LIGHTBLUE = 'rgb(193, 235, 235)';
const BLUE = 'rgb(0, 88, 153)';
const MAGENTA = 'rgba(228, 0, 43, 0.6)';

const COLORS = [GREEN, LIGHTGREEN, CYAN, BLUE, LIGHTBLUE, MAGENTA, RED];
//const COLORS = ['#888888','#008888','#888800','#880088','#FF8888','#8888FF','#88FF88','#88FFFF','#FFFF88','#FFFFFF',];

const RADIAN = Math.PI / 180;


/** Given a set of possible indicators (separated into categories), allow user to select one or more indicators */
const IndicatorsPage = ({ categories, selections, setSelections }) => {

    // User's last-clicked tooltip icon
    const [selectedDetails, setSelectedDetails] = useState(undefined);

    const toggleSelection = (item) => {
        const localCopy = [...selections];

        //const value = 100 / (localCopy.length + 1)

        // or item.key for complex objects
        if (localCopy.includes(item)) {
            // Item is selected - de-select it
            const index = selections.indexOf(item);
            localCopy.splice(index, 1);
            setSelections(localCopy);
            console.log('Removed - selection is now: ', localCopy);
        } else {
            //item.value = value;
            //localCopy.forEach(i => i.value = value)
            const appended = localCopy.concat([item]);

            // Item is not selected - select it
            setSelections(appended);
            console.log('Added - selection is now: ', appended);
        }
    };

    const IndicatorsHelperText = () =>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h4" color="text.secondary" gutterBottom>
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
            </CardContent>
        </Card>

    const IndicatorsDetails = ({ item }) =>
        <>
            <Button onClick={() => setSelectedDetails(undefined)}>&larr; Back to instructions</Button>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item?.name}
            </Typography>
            <div>
                <Button>More &rarr;</Button>
                <Button>Map &rarr;</Button>
            </div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item?.details}
            </Typography>
            <Grid>
                <Grid item xs>
                    <Typography component="div">
                        {item?.description}
                    </Typography>
                </Grid>
            </Grid>
        </>


    const IndicatorsCategory = ({ selections, category }) =>
        <>
            <h2><i className={category?.icon}></i> {category?.name}</h2>
            {
                category?.indicators?.map((item) =>
                    <IndicatorsSelectableItem selections={selections} item={item} key={item.name}></IndicatorsSelectableItem>
                )
            }
            <Divider style={{ width: '20%', margin: '10px', fontWeight: 'bold' }}></Divider>
        </>

    const IndicatorsSelectableItem = ({ selections, item }) =>
        <ToggleButton style={{
            width: '8rem',
            height: '8rem',
            color: selections.includes(item) ? WHITE : BLACK,
            background: selections.includes(item) ? GREEN : WHITE,
            marginRight: '10px',
            padding: '0'
        }} onClick={() => toggleSelection(item)} value={item?.name}>
            <FaInfoCircle style={{ right: '-6.5rem', top: '-3rem', position: 'relative', cursor: 'pointer' }}
                          color={LIGHTGREEN}
                          onClick={(e) => setSelectedDetails(item) || e.stopPropagation()}></FaInfoCircle>
            <Grid container spacing={3}>
                <Grid style={{ textAlign: 'left' }} item xs>
                    {item?.name}
                </Grid>
            </Grid>
        </ToggleButton>


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {
                    !selectedDetails && <IndicatorsHelperText></IndicatorsHelperText>
                }
                {
                    selectedDetails && <IndicatorsDetails item={selectedDetails}></IndicatorsDetails>
                }
            </Grid>
            <Grid item xs>
                {
                    categories?.map((category) =>
                        <IndicatorsCategory selections={selections} category={category} key={category.name}></IndicatorsCategory>
                    )
                }
            </Grid>
        </Grid>
    );
}


/** Given a set of selected indicators, allow user to set a weight for each indicator */
const WeightsPage = ({ selections, setSelections }) => {
    const IconProps = { color: WHITE, background: MAGENTA };
    const IndexBuilderStepIcon = ({ color, stepNumber, background }) => {
        switch(stepNumber) {
            case 1: return (<div>
                <FaMousePointer style={{ color, background,paddingLeft: '6px', paddingRight: '4px' }} />
            </div>)
            case 2: return (<div>
                <FaHashtag style={{ color, background }} />
            </div>)
            default: return (<></>)
        }
    };
    const FirstIconProps = {...IconProps, stepNumber: 1};
    const SecondIconProps = {...IconProps, stepNumber: 2};

    const WeightsHelperText = () =>
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h4" color="text.secondary" gutterBottom>
                    Setting weights is <strong>important</strong>
                </Typography>
                <Typography component="div">
                    Here's how you can adjust the weights for the individual indicators when creating the index:
                </Typography>
                <Grid>
                    <Grid item xs={8}>
                        <Stepper orientation={'vertical'}>
                            <Step key={'weights-step1'} active={true}>
                                <StepLabel StepIconComponent={IndexBuilderStepIcon} StepIconProps={FirstIconProps}>
                                    <Typography variant="subtitle">
                                        Drag and move the horizontal separators to alter the weights. You can see the
                                        weights altering in percentage on the right, or
                                    </Typography>
                                </StepLabel>
                            </Step>
                            <Step key={'weights-step2'} active={true}>
                                <StepLabel StepIconComponent={IndexBuilderStepIcon} StepIconProps={SecondIconProps}>
                                    <Typography variant="subtitle">
                                        You can also change the weights by typing the percentage values in the input box
                                        next to the indicators.
                                    </Typography>
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    const min = 0;
    const max = 10;
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <WeightsHelperText></WeightsHelperText>
            </Grid>
            <Grid item xs>
                {
                    selections.map((selection, index) => {
                        return (
                            <div key={`div-${index}`}>
                                <h3 key={`label-${index}`}>{selection.name}</h3>

                                <TextField key={`input-${index}`}
                                           variant={'outlined'}
                                           size={'small'}
                                           type={'number'}
                                           value={selection.value}
                                           onChange={(event) => {
                                               // Parse text value
                                               let value = parseInt(event.target.value, 10);

                                               // Min / max boundaries
                                               if (value > max) {
                                                   value = max;
                                               } else if (value < min) {
                                                   value = min;
                                               }

                                               // Locate existing item
                                               const found = selections.find(s => s.name === selection.name);
                                               const index = selections.indexOf(found);

                                               // Update existing item
                                               const sels = [...selections];
                                               sels[index] = {...selection, value};
                                               setSelections(sels);
                                           }}></TextField>

                                <Slider
                                    key={`slider-${index}`}
                                    min={0}
                                    max={10}
                                    getAriaLabel={() => selection.name}
                                    valueLabelDisplay="auto"
                                    value={selection.value}
                                    onChange={(event, value) => {
                                        // Min / max boundaries
                                        if (value > max) {
                                            value = max;
                                        } else if (value < min) {
                                            value = min;
                                        }

                                        // Locate existing item
                                        const found = selections.find(s => s.name === selection.name);
                                        const index = selections.indexOf(found);

                                        // Update existing item
                                        const sels = [...selections];
                                        sels[index] = {...selection, value};
                                        setSelections(sels);
                                    }}
                                />
                            </div>
                        );
                    })
                }
            </Grid>
            <Grid item xs={2}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={selections}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {selections.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </Grid>

        </Grid>


    );
}


/** Paged wizard-like component to present indicators for selection + allow user to set the weights */
export default function IndexBuilder() {

    const [steps] = useState(['indicators', 'weights', 'summary']);
    const [currentStep, setCurrentStep] = useState(steps[0]);

    // User's category/indicator selections
    // TODO: Default selections?
    const [selections, setSelections] = useState([]);

    // User's weight selections for each indicator
    //const [weights, setWeights] = useState([]);

    // All choices that user can make for selections
    const [categories] = useState([
        {
            // Insert/populate known categories here
            name: 'Ecology and Greenness',
            icon: 'fa fas fa-tree',
            indicators: [
                { name: 'Community Sampled Plant Diversity', details: loremIpsum, value: 10 },
                { name: 'Tree Crown Density', details: loremIpsum, value: 10 },
                { name: 'Vegetation Index', details: loremIpsum, value: 10 },
            ]
        },
        {
            name: 'Demographic',
            icon: 'fa fas fa-users',
            indicators: [
                { name: 'Average Household Size', details: loremIpsum, value: 10 },
                { name: 'Percentage Children', details: loremIpsum, value: 10 },
                { name: 'Percentage Family Household', details: loremIpsum, value: 10 },
            ]
        },
        {
            name: 'Health',
            icon: 'fa fas fa-heartline',
            indicators: [
                { name: 'Adult Asthma Rate', details: loremIpsum, value: 10 },
                { name: 'Cancer Rate', details: loremIpsum, value: 10 },
                { name: 'Childhood Asthma ED Visits', details: loremIpsum, value: 10 },
            ]
        }
    ]);

    return (
        <>
            <Button onClick={() => setCurrentStep('indicators')}>Indicators</Button>
            <Button onClick={() => setCurrentStep('weights')}>Weights</Button>
            {
                currentStep === 'indicators' && <IndicatorsPage categories={categories} selections={selections} setSelections={setSelections}></IndicatorsPage>
            }
            {
                currentStep === 'weights' && <WeightsPage selections={selections} setSelections={setSelections}></WeightsPage>
            }

            <Grid>
                <Grid item>
                    <pre>{JSON.stringify(selections, null, 2)}</pre>
                </Grid>
            </Grid>
        </>
    );
};

