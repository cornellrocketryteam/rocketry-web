import { useRef, useEffect, useState } from 'react';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Box,
} from '@material-ui/core';
import Header from '../components/layout/Header';
import Stars from '../components/Stars';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '100px 50px 200px 50px',
    [theme.breakpoints.only('xs')]: {
      padding: '80px 20px 80px 20px',
    },
  },
  title: {
    marginTop: 20,
    marginBottom: 60,
  },
  questionHeading: {
    fontSize: 22,
    fontWeight: 600,
  },
}));

export default function Faq() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const questionsAndAnswers = [
    [
      'Am I expected to have prior technical experience in order to apply?',
      'Nope! What we mainly look for is genuine interest in the team and what we do. We teach our new members everything they need to know.',
    ],
    [
      'Do you only accept certain majors?',
      'Once again, nope! A related major is one way to show interest in what we do, but there are many ways to show interest, regardless of major.',
    ],
    [
      'I’m unsure which subteam to apply to. Do I have to pick a subteam in order to apply?',
      'No worries! In our application you can indicate both your first and second choice subteam, and your application will be reviewed by both subteams!',
    ],
    [
      'What do you guys do on a day-to-day basis?',
      'How much flexibility is there in roles? If I’m on one subteam, can I still be somewhat involved with another?',
    ],
  ];

  return (
    <div className={classes.root}>
      <Head title='FAQ | Cornell Rocketry Team' />
      <Header />
      <Stars height={600} />
      <Container maxWidth='lg' className={classes.content}>
        <Typography variant='h2' className={classes.title}>
          FAQ
        </Typography>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography className={classes.questionHeading}>
              Am I expected to have prior technical experience in order to
              apply?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nope! What we mainly look for is genuine interest in the team and
              what we do. We teach our new members everything they need to know.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2bh-content'
            id='panel2bh-header'
          >
            <Typography className={classes.questionHeading}>
              Do you only accept certain majors?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Once again, nope! A related major is one way to show interest in
              what we do, but there are many ways to show interest, regardless
              of major.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3bh-content'
            id='panel3bh-header'
          >
            <Typography className={classes.questionHeading}>
              I’m unsure which subteam to apply to. Do I have to pick a subteam
              in order to apply?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No worries! In our application you can indicate both your first
              and second choice subteam, and your application will be reviewed
              by both subteams!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel4bh-content'
            id='panel4bh-header'
          >
            <Typography className={classes.questionHeading}>
              *Question 4*
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>*Answer 4*</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Footer />
    </div>
  );
}
