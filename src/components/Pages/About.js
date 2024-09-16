import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { Accordion, MemberGrid, NavBar, Footer } from '../../components';

const AboutPage = styled.div`
    background:white;
`
// const BioSection = styled.div`
//     padding:40px 0;
//     // text-align:center;
//     h3 {
//         margin:2em 0 1em 0;
//     }
// `

// ... other constants
const accordionContent = [
    {
        label: "West Humboldt Park Resource Map (2017)",
        content: (<>
                    <p>The West Humboldt Park Resource map was a community-engaged resource map highlighting assets in the neighborhood for a variety of organizations, people, and needs. It incorporated modern geospatial analytics to integrate data from multiple partners in a low-tech, easy to access way.
                    </p>
                    <p>The project was developed as a friendly collaboration out of the West Humboldt Park Health Coalition, a collective of community organizations, local businesses, health, and academic partners. Staff from West Humboldt Park Development Council, Our Lady of Angels, and the Northwestern Memorial Community Services group outlined the need and drove the concept. Lead developers are Marynia Kolak and Michael Steptoe. Student interns who have worked on this include Rachel Weisz (Northwestern University) and Gentry Nissen (Arizona State University). <a href="https://www.researchgate.net/profile/Marynia-Kolak/publication/336436397_Extending_Volunteered_Geographic_Information_VGI_with_Geospatial_Software_as_a_Service_Participatory_Asset_Mapping_Infrastructures_for_Urban_Health/links/5f4970d892851c6cfdf5af2a/Extending-Volunteered-Geographic-Information-VGI-with-Geospatial-Software-as-a-Service-Participatory-Asset-Mapping-Infrastructures-for-Urban-Health.pdf"> Learn more</a>.</p>
                </>)
        },

        {
        label: "US Covid Atlas (2020)",
        content: <p>
            The US Covid Atlas is a visualization tool led by HeRoP and the Center for Spatial Data Science that connects COVID case data with community indicaotrs across the United States from the beginning of the pandemic until today. The Atlas works to understand, archive, and represent the often unequal impact of the COVID-19 pandemic in the United States. <a href="https://uscovidatlas.org/">Learn more</a>.
        </p>
    },

        {
        label: "Opioid Environment Policy Scan (2021)",
        content: <p>The Opioid Environment Policy Scan (OEPS) is an open-source data warehouse to help characterize the multi-dimensional risk environment impacting opioid use and health outcomes across the United States. The OEPS provides access to data at multiple spatial scales - from U.S. states down to Census tracts - and is designed to support research seeking to study environments impacting and impacted by opioid use and opioid use disorder (OUD), inform public policy, and reduce harm in communities nationwide.
            This project was developed as part of the Lab's work with Justice Community Opioid Innovation Network (JCOIN), an NIH-HEAL Initiative, as part of the Methodology and Advanced Analytics Resource Center (MAARC). <a href="https://oeps.healthyregions.org/">Learn more</a>.
            </p>
    },

        {
        label: "Diversitree (2021)",
        content: <p>
            Diversitree is an MIT Senseable Cities Lab project that use tree inventory data to measure street tree diversity in eight global cities, comparing the city center with the outer areas of the city. Dylan Halpern helped develop and lead this project when he worked at Senseable. <a href="https://senseable.mit.edu/diversitree/">Learn more</a>.
        </p>
    },

        {
        label: "Respiratory Health Association Collaboration (2020)",
        content: <p>
            The Respiratory Health Association (RHA) is a nonprofit organization that provides respiratory care services to the general public. HeRoP partnered with the RHA, along with te support of the Joyce Foundation, Chicago Transit Authority (CTA), and Chicago Department of Public Health,
            to develop a web map application to help communities understand the health implications of the electrification of CTA buses. <a href="https://resphealth.org/wp-content/uploads/2020/09/CTA-Electrification-Health-Benefits-Report.pdf">Learn more</a>.
        </p>
    },

        {
        label: "Chicago Tree Tool (2022)",
        content: (<>
                    <p>
                    Before<i translate="no"> ChiVes</i>, HeRoP worked in joint partnership with the Chicago Department of Public Health to develop the <b> <a href="https://abc7chicago.com/chicago-trees-climate-change-tree-planting-lidar-scanner/11202738/?fbclid=IwAR0UxJhaeu_vMfES7H0owokO4y2ASs3uzZAGCYrWzfMpwS4rUiAB7kULLi0">Community Tree Equity Tool</a></b> as
                    an extension of ongoing work on understanding <a href="https://healthyregions.org/research/open-airq/" target="_blank" rel="noopener noreferrer">air quality in Chicago</a>. The Tree Tool Research Pilot was developed using
                     <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">Carto</a> to facilitate rapid development and prototyping. This tool followed years of iterative process and design and dozens of previous dashboard iterations, highlighting the winding process of agile application development. The final tool went through dozens of additional rounds of refinement and editing across multiple city and community stakeholders.
                    </p>
                    <p>In the Research Pilot Stage, The HeRoP team was led by Marynia Kolak, MS, MFA, PhD (Associate Director of Health Informatics) and supported by research assistants Isaac Kamber, Lorenz Menendez, Yuming Liu, and Jizhou Wang, with previous analytic work by graduate
                    student Haowen Shang, and ongoing collaboration with Center for Spatial Data Science Academic Director, Luc Anselin, PhD, Executive Director, Julia Koschinsky, PhD, as well as Raed Mansour, MS and Dave Graham at the Chicago Department of Public Health. Dozens of additional, invaluable public, private, and community stakeholders impacted the success of the Tree Tool application: follow the City of Chicago for more details coming soon!
                    </p>
                    <p>
                    This work was part of a Partnership for Healthy Cities, a global network of cities committed to saving lives by preventing noncommunicable diseases (NCDs) and injuries, supported by Bloomberg Philanthropies in partnership with the World Health Organization and Vital Strategies.
                    </p>
                </>
                )
    }
]

export default function About(){
    return (
       <AboutPage>
           <NavBar />
           <ContentContainer>
               <h1>About</h1>
               <hr/>
                <p>ChiVes is a <b>data collaborative</b> and <b>community mapping application</b> that brings data on Chicago's environment together at the
                neighborhood level. It's a partnership of researchers, community organizations, and civic groups. It's been used for teaching
                about the basics of mapping and spatial analysis, as well as learning about air quality patterns in Chicago.</p>
                <p>With ChiVes, we harmonize & standardize environmental data across dozens of sources to make it accessible for 
                    full exploration, alongside a growing list of resources on the Chicago Environment, cultivated by a community of curators.</p>


                <h3>Citation & Release Information</h3>
                
                <p>You can cite all versions by using the DOI <a href="https://zenodo.org/records/8212065">10.5281/zenodo.8212064</a>. This DOI represents all stable versions released, and will always resolve to the latest one.
                To cite the current and stable release of Chives (v3.0), use the following:</p>
                <ul>
                    <li>...</li>
                </ul>
        
                <p> The earliest version of Chives (v0.5) can be found at <a href="https://zenodo.org/records/6359814">OpenAire</a>, 
               though we recommend using the above citation instead.</p>
    
               
                <hr/>
                <h2>Get Involved </h2>
                <p>Organizations and individuals can participate in<span translate="no"> ChiVes </span>in multiple ways:</p>
                <ul>
                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdu5zCJcvLXp8eY0p3jLuCWPKSuGHjrw2auO3BsD57ssH4_wA/viewform">Data Collaborative.</a> Integrate your data directly. Members agree that the final, integrated data will meet Collaborative standards. </li>
                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd2gHSB7OKCKEBhB0weIM7ZsRBomVOAl7QhDHOeXu5B7ih_bQ/viewform">Resource Guide.</a> Share your web-based or print media resource on the Chicago environment. Resources must meet<span translate="no"> ChiVes </span>standards. </li>
                    <li><a href="https://github.com/healthyregions/chicago-environment-explorer">Web Development.</a> Developers and code-enthusiasts can fork the<span translate="no"> ChiVes </span>website, make changes, and submit for review.</li>
                </ul>
                <p>View our <a href="https://docs.google.com/document/d/12lwkCAXxI9eW4Mdf6gaeR6LCsaNI3E0E6xvi7dqXr9k/edit?usp=sharing">Standards and Submission Guidelines</a>. These guidelines are evaluated on a regular basis by members of the Data Collaborative.</p>
                <p>  <a href="/contact">Contact</a> us with any questions, or post an issue on <a href="https://github.com/healthyregions/chicago-environment-explorer/issues">Github.</a></p>


                <hr/>
                <h2>Background</h2>
                <p>The ChiVes project is managed by the Healthy Regions & Policies Lab team at University of Illinois at Urbana-Champaign (UIUC), in collaboration  
                    with multiple partners and colleagues (see the <a href="/team">Team</a> page for more details). From 2022-2024, DePaul University received a NASA grant to collaborate with UIUC and multiple community organizations
                    to expand ChiVes further and make it more accessible. Organizations included Grow Greater Englewood, Instituto del Progreso Latino, the People's Response Network,
                    Mujeres for Espacios Verdes (Women For Green Spaces), Grow Greater Englewood, and the office of the 25th Ward. Engineering support included expanding 
                    to work with the National Center for Supercomputing Applications (<a href="https://ncsa.illinois.edu">NCSA</a>) at Illinois. With this expanding network of contributors,
                    the ChiVes application's direction and long-term development is increasingly shared as a collective or community.
                <br /><br />
                The original<span translate="no"> ChiVes </span>application was formalized at the University of Chicago in early 2022, but was built on multiple former projects from Healthy Regions & Policies Lab members, 
                incorporating data, resources, materials, and lessons learned. Much of the data currently integrated within<span translate="no"> ChiVes </span>was gathered, calculated, and standardized from 2018-2021,
                when the HEROP Lab was housed at the Center for Spatial Data Science at the University of Chicago. The current application was refactored in 2022 by <a href="https://dylanhalpern.com/">Dylan Halpern</a>, adopting a new web architecture. Explore some of the original projects that inspired<span translate="no"> ChiVes </span>below:</p>
                <Accordion entries={accordionContent} initialTab={-1} />
           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}
