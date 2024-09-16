import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { colors } from '../../config';

const ContactFormContainer = styled.form`
    &.locked{
        user-select:none;
        pointer-events:none;
        opacity:0.5;
    }
    padding:2rem;
    margin:20px 0;
`

const InputBlock = styled.div`
    padding:0.5rem 0;
    padding-top:${props => props.fullWidth ? '2rem' : '0.5rem'};
    display:block;
    #message {
        width:100%;
    }
    .MuiInputBase-root, .MuiFormControl-root, .MuiFormLabel-root {
        min-width:75%;
        width:${props => props.fullWidth ? '100%' : 'auto'};
        font-family: 'Roboto', sans-serif;
        @media (max-width: 960px) {
            width:100%;
        }
    }
    .MuiInputBase-multiline {
        height: 12.4rem;
    }
    button#submit-form {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1.75px;
        margin-top: 0.69rem;
        line-height:3;
        text-align: center;
        text-transform:uppercase;
        background-color: #3D6017;
        color: ${colors.white};
        padding: 0 20px;
        // border-radius: .3rem;
        text-decoration:none;
        border:none;
        float:right;
        display:block;
        cursor:pointer;
        box-shadow:0px 0px 4px rgba(0,0,0,0);
        transition:250ms all;
        &:hover {
            box-shadow:2px 2px 4px rgba(0,0,0,0.35);
        }
        @media (max-width: 960px) {
            margin:0 auto;
            float:initial;
        }
    }
`

const SuccessMessage = styled.div`
    padding:20px;
    background:${colors.lightblue};
    position:relative;
    margin:2rem 0;
    p {
        color:white;
        font-weight:bold;
        margin-right:2rem;
    }
    button {
        position:absolute;
        right:0.5rem;
        top:0.5rem;
        background:none;
        border:none;
        color:white;
        font-size:1.5rem;
        font-weight:bold;
        cursor:pointer;
    }

`

export default function ContactForm(){

    const googleFormUrl = `${process.env.REACT_APP_EMAIL_FORM_URL}`
    const slackFormUrl = `${process.env.REACT_APP_SLACK_FORM_SUBMISSION_URL}`

    const [formData, setFormData] = useState({
        'Category': 'General',
        'Contact_Name': '',
        'Contact_Email': '',
        'Contact_Phone': '_',
        'Message': ''
    })

    const [formErrors, setFormErrors] = useState({
        'Contact_Name': false,
        'Contact_Email': false,
        'Message': false
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const generateURL = async (data, googleFormUrl) => {
        let returnURL = `${googleFormUrl}?Date=${encodeURIComponent(new Date().toISOString().slice(0,10))}`
        for (const property in data){
            returnURL += `&${encodeURIComponent(property)}=${encodeURIComponent(data[property])}`
        }
        return returnURL
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.Contact_Name === '' || formData.Contact_Email === '' || formData.Message === '') {
            if (formData.Contact_Name === '') setFormErrors(prev => ({...prev, 'Contact_Name':true}))
            if (formData.Contact_Email === '') setFormErrors(prev => ({...prev, 'Contact_Email':true}))
            if (formData.Message === '') setFormErrors(prev => ({...prev, 'Message':true}))
        } else {
            setIsSubmitting(true)
            setFormErrors({
                'Contact_Name': false,
                'Contact_Email': false,
                'Message': false})

            const gSheetURL = await generateURL(formData, googleFormUrl);
            await fetch(gSheetURL, { method: 'GET' });

            let slackText = `Submission from ${window.location.href}`
            slackText += `\n*Name:* ${formData.Contact_Name}`
            slackText += `\n*Email:* ${formData.Contact_Email}`
            slackText += `\n*Phone:* ${formData.Contact_Phone}`
            slackText += `\n*Message Category:* ${formData.Category}`
            slackText += `\n---\n${formData.Message}`
            await fetch(slackFormUrl, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: JSON.stringify({text: slackText})
            });

            setIsSubmitting(false)
            setSubmitted(true)
        }

    }

    const handleChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    const handleSelect = (e) => setFormData(prev => ({...prev, 'Category': e.target.value}))
    let netlifyAttrs = {'name': 'contact', 'data-netlify': 'true'}
    return <>
        {submitted &&
            <SuccessMessage>
                <p>
                    Thanks for your message! Our team will review your message and get back with you as soon as possible. We value your feedback and engagement as we work to improve the<span translate="no"> ChiVes </span>explorer!
                </p>
                <button onClick={() => setSubmitted(false)}>×</button>
            </SuccessMessage>
        }
        <ContactFormContainer {...netlifyAttrs} className={isSubmitting ? 'locked' : ''} onSubmit={handleSubmit}>
            <h2>Send us a message</h2>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <InputBlock>
                        <InputLabel id="Category">Message Type</InputLabel>
                        <Select
                            labelId="Category-label"
                            id="Category"
                            value={formData['Category']}
                            onChange={handleSelect}

                        >
                            <MenuItem value={'General'}>General</MenuItem>
                            <MenuItem value={'Bug'}>Bug Report or Error</MenuItem>
                            <MenuItem value={'DataQuestion'}>Data Question</MenuItem>
                            <MenuItem value={'FeatureRequest'}>Feature Request</MenuItem>
                            <MenuItem value={'TechOpenSource'}>Technical or Open Source Questions</MenuItem>
                            <MenuItem value={'Press'}>Press or Media</MenuItem>
                        </Select>
                    </InputBlock>

                    <InputBlock>
                        <TextField
                            required
                            id="Contact_Name"
                            name="Contact_Name"
                            label="Name (Required)"
                            placeholder="Your Name"
                            onChange={handleChange}
                            error={formErrors['Contact_Name']}
                            helperText={formErrors['Contact_Name'] && 'Please enter your name'}
                                />
                    </InputBlock>

                    <InputBlock>
                        <TextField
                            required
                            id="Contact_Email"
                            type="email"
                            name="Contact_Email"
                            label="Email (Required)"
                            placeholder="greetings@you.com"
                            onChange={handleChange}
                            error={formErrors['Contact_Email']}
                            helperText={formErrors['Contact_Email'] && 'Please enter your email'}
                            />
                    </InputBlock>

                    <InputBlock>
                        <TextField label="Phone (Optional)" id="Contact_Phone" type="tel" name="Contact_Phone" placeholder="111-876-5309" onChange={handleChange} />
                    </InputBlock>
                </Grid>
                <Grid item xs={12} md={8}>
                    <InputBlock fullWidth={true}>
                        <TextField
                            id="message"
                            label="Message"
                            multiline
                            rows={6}
                            placeholder="Your message..."
                            variant="outlined"
                            name="Message"
                            onChange={handleChange}
                            error={formErrors['Message']}
                            helperText={formErrors['Message'] && 'Please enter a message'}
                            />
                    </InputBlock>
                    <InputBlock>
                        <button type="submit" id="submit-form">Submit</button>
                    </InputBlock>
                </Grid>
            </Grid>
        </ContactFormContainer>
    </>
}
