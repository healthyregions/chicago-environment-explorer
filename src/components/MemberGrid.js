import styled from 'styled-components';
import { Grid } from '@mui/material';
    
const TeamBio = styled(Grid)`
    display:flex;
    h4 {
    font-family: 'Lora', sans-serif;
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 600;
    font-stretch: normal;
    margin-bottom:6px;
    }
    h5 {

    font-family: 'Robot', sans-serif;
    font-size: 14px;
    line-height: 1;
    font-weight: 300;
    font-stretch: normal;
    margin-bottom:20px;
    }
    h6 {

    font-family: 'Lora', sans-serif;
    font-size: 13px;
    line-height: 1;
    font-weight: 600;
    font-stretch: normal;
    margin-bottom:10px;
    }
    img {
        max-width:10em;
        padding-bottom:2em;
        height:100%;    
        align-self: flex-start;
    }
    span {
        padding-left:1em;
    }
`

const CoreMemberBio = ({member, columns}) => 
    <TeamBio item xs={12} {...columns}>
        <img src={`${process.env.PUBLIC_URL}/img/people/${member.img}`} alt={`${member.name}`}/>
        <span>
            <h4>{member.name}</h4>
            <h6>{member.degrees}</h6>
            <h5>{member.title}</h5>
            {!!member.bio && <p>{member.bio}</p>}
        </span>
    </TeamBio>

export default function MemberGrid({members, columns}){
    return <Grid container spacing={2}>
        {members.map(member => <CoreMemberBio member={member} columns={columns} />)}
    </Grid>
}