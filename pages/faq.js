import { Container, Typography, makeStyles } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaqList } from '../public/static/faq/faq';
import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import React from 'react';
import Stars from '../components/Stars';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '100px 50px 100px 50px',
    [theme.breakpoints.only('xs')]: {
      padding: '80px 20px 80px 20px',
    },
    minHeight: '100vh',
  },
  title: {
    marginTop: 20,
    marginBottom: 60,
  },
  question: {
    fontSize: 20,
    fontWeight: 600,
  },
}));

export default function Faq() {
  const classes = useStyles();

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
        <FaqDisplay data={FaqList} />
      </Container>
      <Footer />
    </div>
  );

  function FaqDisplay({ data }) {
    return (
      <>
        {data.map((content) => (
          <QnaDisplay question={content.q} answer={content.a} />
        ))}
      </>
    );
  }

  function QnaDisplay({ question, answer }) {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.question}>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
}
