import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {changeVariable} from "../../actions";
import {variablePresets} from "../../config";
import Grid from "@mui/material/Grid";
import React from "react";
import styled from "styled-components";
import { colors } from '../../config';

const GreenLinkButton = styled(Button)`
  color: ${colors.forest};
  text-transform: capitalize;
`;

const LargeIcon = styled.img`
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  height: 60px;
  width: 60px;
`;

const IndicatorDetails = ({ selectedDetails, setSelectedDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const getLogo = (categoryName) => <>
        {
            (categoryName === 'Air Pollution' || categoryName === 'Air Quality') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_factory.svg'} />
        }
        {
            (categoryName === 'Demographic') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_kid.svg'} />
        }
        {
            (categoryName === 'Ecology & Greenness' || categoryName === 'Ecology and Greenness') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_tree.svg'} />
        }
        {
            (categoryName === 'Social') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_people.svg'} />
        }
        {
            (categoryName === 'Health') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_heart.svg'} />
        }
        {
            (categoryName === 'Environment') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_flood.svg'} />
        }
        {
            (categoryName === 'Built Environment') &&
            <LargeIcon alt="" src={'/icons/index-builder/logo_traffic.svg'} />
        }
        {!categoryName && <pre>{JSON.stringify(selectedDetails?.categoryName)}</pre>}
    </>

    return (
        <>
            <GreenLinkButton onClick={() => setSelectedDetails(undefined)}>&larr; Back to instructions</GreenLinkButton>
            <div>
                {getLogo(selectedDetails?.categoryName)}
            </div>
            <Typography variant="h5" gutterBottom>
                {selectedDetails?.name}
            </Typography>
            <div style={{ paddingBottom: '2rem' }}>
                <GreenLinkButton onClick={() => history.push(`/data#:~:text=${selectedDetails?.name}`)}>More &rarr;</GreenLinkButton>
                <GreenLinkButton style={{ paddingLeft: '10rem' }} onClick={() => {
                    history.push('/map');
                    setTimeout(() => {
                        dispatch(changeVariable(variablePresets[selectedDetails.name]));
                    }, 1500);
                }}>Map &rarr;</GreenLinkButton>
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

export default IndicatorDetails;
