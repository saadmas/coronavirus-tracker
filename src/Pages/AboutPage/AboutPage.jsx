import React from 'react';
import { Container } from '@material-ui/core';

import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about">
      <Container>
        <div className="aboutWebsite">
          <h2 className="aboutHeader">About This Website</h2>
          <h3 className="aboutSubheader">Where is the data sourced from?</h3>
          <p>
            The data is sourced directly from daily reports by the&nbsp;
            <a href="https://www.ecdc.europa.eu/en" className="aLink">
              European Centre for Disease Prevention and Control
            </a>
          </p>
          <p>
            Source code for this website is&nbsp;
            <a href="https://github.com/saadmas/coronavirus-tracker" className="aLink">
              here
            </a>
          </p>
          <em className="">
            Please note that the data is not updated in real-time, as the report is posted once per day
          </em>
          <h3 className="aboutSubheader">Why build this website?</h3>
          <p>
            Most data on coronavirus has one or more of the following characteristics:
            <ul>
              <li>Lacks reputable, verifiable data sources</li>
              <li>Has data visualizations that are static images - you can't interact with them!</li>
              <li>User experience is poor, clunky or overloaded</li>
            </ul>
            <p>
              This website was made with a few specific goals:
            <ul>
                <li>Rely on a reputable data source, one that users can easily verify for themselves</li>
                <li>Have simple but sleek data visualizations</li>
                <li>Present a minimal, focused user experience</li>
              </ul>
            </p>
          </p>
        </div>
        <div className="aboutCoronavirus">
          <h2 className="aboutHeader">About Coronavirus (via CDC)</h2>
          <h3 className="aboutSubheader">What is a novel coronavirus?</h3>
          <p>
            A novel coronavirus is a new coronavirus that has not been previously identified.
            The virus causing coronavirus disease 2019 (COVID-19), is not the same as the&nbsp;
          <a href="https://www.cdc.gov/coronavirus/types.html" className="aLink">
              coronaviruses
              that commonly circulate among humans&nbsp;
          </a>
            and cause mild illness, like the common cold.
            A diagnosis with coronavirus 229E, NL63, OC43, or HKU1 is not the same as a COVID-19 diagnosis.
            Patients with COVID-19 will be evaluated and cared for differently than patients with common coronavirus diagnosis.
          </p>
          <h3 className="aboutSubheader">What is the source of the virus?</h3>
          <p>
            Coronaviruses are a large family of viruses.
            Some cause illness in people, and others, such as canine and feline coronaviruses, only infect animals.
            Rarely, animal coronaviruses that infect animals have emerged to infect people and can spread between people.
            This is suspected to have occurred for the virus that causes COVID-19.
            Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS) are two other examples
            of coronaviruses that originated from animals and then spread to people.
            More information about the source and spread of COVID-19 is available on the&nbsp;
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/summary.html" className="aLink">
              Situation Summary: Source and Spread of the Virus
          </a>
          </p>
          <h3 className="aboutSubheader">How does the virus spread?</h3>
          <p>
            This virus was first detected in Wuhan City, Hubei Province, China.
            The first infections were linked to a live animal market, but the virus is now spreading from person-to-person.
            It’s important to note that person-to-person spread can happen on a continuum.
            Some viruses are highly contagious (like measles), while other viruses are less so.
            The virus that causes COVID-19 seems to be spreading easily and sustainably in the community (“community spread”) in some&nbsp;
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/transmission.html" className="aLink">
              affected
              geographic areas.
            </a>&nbsp;Community spread means people have been infected with the virus in an area,
          including some who are not sure how or where they became infected.
          Learn what is known about the spread of newly emerged coronaviruses.
          </p>
          <h3 className="aboutSubheader">What's behind the name COVID-19?</h3>
          <p>
            ‘CO’ stands for ‘corona,’ ‘VI’ for ‘virus,’ and ‘D’ for disease.
            There are many types of human coronaviruses including some that commonly cause
            mild upper-respiratory tract illnesses. COVID-19 is a new disease,
            caused by a novel (or new) coronavirus that has not previously been seen in humans.
            The name of this disease was selected following the World Health Organization (WHO) best practice
            for naming of new human infectious diseases.
          </p>
          <h3 className="aboutSubheader">Will warm weather stop the outbreak of COVID-19?</h3>
          <p>
            It is not yet known whether weather and temperature impact the spread of COVID-19.
            Some other viruses, like the common cold and flu, spread more during cold weather months but that does not mean
            it is impossible to become sick with these viruses during other months.
            At this time, it is not known whether the spread of COVID-19 will decrease when weather becomes warmer.
            There is much more to learn about the transmissibility, severity, and other features associated with COVID-19 and investigations
            are ongoing.
          </p>
          <h3 className="aboutSubheader">What is community spread?</h3>
          <p>
            Community spread means people have been infected with the virus in an area,
            including some who are not sure how or where they became infected.
          </p>
          <h3 className="aboutSubheader">How can you protect yourself?</h3>
          <p>
            Visit the&nbsp;
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html" className="aLink">
              COVID-19 Prevention and Treatment page
          </a>
            &nbsp;to learn about how to protect yourself from respiratory illnesses, like COVID-19.
          </p>
          <div className="furtherInfo">
            <h2 className="furtherInfoHeader">Further Information:</h2>
            <ul className="furtherInfoList">
              <li>
                <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" className="aLink">
                  World Health Organization
              </a>
              </li>
              <li>
                <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" className="aLink">
                  Centers for Disease Control and Prevention
              </a>
              </li>
              <li>
                <a href="https://www.ecdc.europa.eu/en/coronavirus" className="aLink">
                  European Centre for Disease Prevention and Control
              </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
