import React from 'react';
import { Container } from '@material-ui/core';

import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about">
      <Container>
        <div className="aboutWebsite">
          <h1 className="aboutHeader">About This Website</h1>
          <h3 className="aboutSubheader">Where is the data sourced from?</h3>
          <p className="answerStart">
            Global data is sourced directly from daily reports by the&nbsp;
              <a
              href="https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide"
              className="aLink"
            >
              European Centre for Disease Prevention and Control
              </a>
            &nbsp;and spot-checked using various data sources, including data from local authorities like
            Italy's ministry of health and daily situation reports from the&nbsp;
              <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports" className="aLink">
              World Health Organization
              </a>
          </p>
          <p>
            U.S. state data is sourced from&nbsp;
            <a href="https://covidtracking.com/about-tracker/" className="aLink">
              The COVID Tracking Project
            </a>
            , which relies on data from U.S.
          state/district/territory public health authorities
          </p>
          <ul>
            <li>
              Data sourcing algorithms by&nbsp;
              <a href="https://github.com/owahltinez" className="aLink">
                owahltinez
              </a>
              &nbsp;and&nbsp;
              <a href="https://github.com/dmamalis" className="aLink">
                dmamalis
              </a>
              &nbsp;are in&nbsp;
              <a href="https://github.com/open-covid-19/data" className="aLink">
                this GitHub repository
              </a>
            </li>
            <li>
              Source code for this website is&nbsp;
              <a href="https://github.com/saadmas/coronavirus-tracker" className="aLink">
                here
              </a>
            </li>
            <li>
              <em>Please note that the data is not updated in real-time, as the reports are posted once per day</em>
            </li>
          </ul>
          <h3 className="aboutSubheader">Why build this website?</h3>
          <p className="answerStart">
            Most data on COVID-19 has one or more of the following characteristics:
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
        <hr className="sectionLineBreak" />
        <div className="aboutCoronavirus">
          <h1 className="aboutHeader">About COVID-19</h1>
          <h3 className="aboutSubheader">What is a novel coronavirus?</h3>
          <p className="answerStart">
            It is a zoonotic (transmissible from animals to humans) disease that is
            novel because it has not been studied before amongst
            the common coronaviruses that produce mild symptoms in all beings of the population.
            Patients diagnosed with COVID-19 will have to take necessary preventative precautions in comparison to patients with common
            coronaviruses as health systems and scientists are studying the novel virus to come up with effective treatment.
          </p>
          <h3 className="aboutSubheader">What is the source of the virus?</h3>
          <p className="answerStart">
            According to the U.S. CDC, coronaviruses are a large family of viruses.
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
          <p className="answerStart">
            The first infections were linked to a live animal market, but the virus is now spreading from person-to-person.
            It’s important to note that person-to-person spread can happen on a continuum.
            Some viruses are highly contagious (like measles), while other viruses are less so.
            The virus that causes COVID-19 seems to be spreading easily and sustainably in the community in some
            affected geographic areas. (“community spread”)
          </p>
          <p>
            So far, COVID-19 surface life is:
          <ul>
              <li>3 days on plastic and stainless steel</li>
              <li>4 hours on copper</li>
              <li>24 hours on cardboard</li>
            </ul>
          </p>
          <h3 className="aboutSubheader">What is community spread?</h3>
          <p className="answerStart">
            Community spread means people have been infected with the virus in an area,
            including some who are not sure how or where they became infected.
          </p>
          <h3 className="aboutSubheader">How can you protect yourself?</h3>
          <p className="protectYourself answerStart">
            Visit the &nbsp;
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html" className="aLink">
              CDC COVID-19 Prevention and Treatment page
          </a>
            &nbsp;to learn about how to protect yourself from respiratory illnesses, like COVID-19.
          </p>
          <hr className="sectionLineBreak" />
          <div className="furtherInfo">
            <h1 className="furtherInfoHeader">Additional Resources</h1>
            <ul className="furtherInfoList">
              <li>
                <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" className="aLink">
                  World Health Organization
              </a>
              </li>
              <li>
                <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" className="aLink">
                  U.S. Centers for Disease Control and Prevention
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
