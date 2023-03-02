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
    {
      q: 'Am I expected to have prior technical experience in order to apply?',
      a: 'Nope! What we mainly look for is genuine interest in the team and what we do. We teach our new members everything they need to know.'
    },
    {
      q: 'Do you only accept certain majors?',
      a: 'Once again, nope! A related major is one way to show interest in what we do, but there are many ways to show interest, regardless of major.',
    },
    {
      q: 'I’m unsure which subteam to apply to. Do I have to pick a subteam in order to apply?',
      a: 'No worries! In our application you can indicate both your first and second choice subteam, and your application will be reviewed by both subteams!',
    },
    {
      q: 'What do you guys do on a day-to-day basis?',
      a: 'How much flexibility is there in roles? If I’m on one subteam, can I still be somewhat involved with another?',
    },
  ];

  return (
    <div className={classes.root}>
      <Head title='FAQ | Cornell Rocketry Team' />
      <Header />
      <Stars height={600} />
      <datafetching />
      <Container maxWidth='lg' className={classes.content}>
        <Typography variant='h2' className={classes.title}>
          FAQ
        </Typography>
        <FaqDisplay
          data={questionsAndAnswers}
        />
      </Container>
      <Footer />
    </div>
  );
  function FaqDisplay({ data }) {
    return (
      <>
        {data.map((content, index) => (
          <QnaDisplay
            index={index}
            qs={content.q}
            ans={content.a}
          />
        ))}
      </>
    );
  }

  function QnaDisplay({ index, qs, ans }) {
    return (
      <Accordion expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelbh-content"
          id="panelbh-header"
        >
          <Typography className={classes.heading}></Typography>
          <Typography className={classes.secondaryHeading}>
            {qs}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {ans}
          </Typography>
        </AccordionDetails>
      </Accordion>

    );
  };
}

