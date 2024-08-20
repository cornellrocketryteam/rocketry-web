import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles((theme) => ({
  alumniPic: {
    marginTop: 20,
    marginBottom: 20,
    margin: 'auto',
    height: 200,
    width: 200,
  },
  alumniQuote: {
    marginTop: 20,
  },
  timelineControl: {
    transform: `scale(1.5)`,
    transition: '300ms ease',
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

function AlumniCarousel() {
  const classes = useStyles();

  const alumni = [
    {
      name: "Matt Schneider '21",
      pic: 'Matt Schneider.png',
      quote:
        "As an incoming freshman, Cornell Rocketry provided me the opportunity to work on challenging problems and be a part of something bigger than myself. Early on I focused my efforts on expressing my creative potential and honing my design instincts, but came to see an equally significant value in the friendships and mentorships gained along the way. The team gave me the chance to develop as a leader, learning in the moment from my mistakes and taking on more responsibilities along the way. Without a doubt, my time on Cornell Rocketry was THE formative experience of my time in college and I'm grateful to have been able to contribute.",
    },
    {
      name: "Deniz Tekant '22",
      pic: 'Deniz Tekant.jpg',
      quote:
        "CRT gave me some of the best memories during my 4 years at Cornell. As a freshman, I was lost and confused by the magnitude of clubs and organizations I could join. I was able to find both friendship and good learning experiences applicable towards the real world when I joined CRT's business sub team. Besides, who doesn't think rockets are cool?",
    },
    {
      name: "Ben Rotstein '24",
      pic: 'Ben Rotstein.jpg',
      quote:
        "The Cornell Rocketry Team was the most important single element of my Cornell experience. The team gave me an opportunity to learn and grow my applied engineering skills at a fast pace surrounded by people with similar interests. Being a part of the team taught me how to be a skilled leader and engineering team member, giving me confidence in my skills and transition to real companies. Beyond that, the team was my home for the years of my undergraduate degree, and provided me a network of close friends all over the country that I will always share the rocketry bond with.",
    },
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      {alumni.map((alum, index) => (
        <div key={index}>
          <Avatar
            className={classes.alumniPic}
            alt={alum.name}
            src={`/static/images/apply-page/alumni/${alum.pic}`}
          />
          <Typography variant='h6' align='center'>
            {alum.name}
          </Typography>
          <Typography variant='body1' className={classes.alumniQuote}>
            {alum.quote}
          </Typography>
        </div>
      ))}
    </Slider>
  );

  function PrevArrow({ className, onClick }) {
    return (
      <ChevronLeftIcon
        className={[className, classes.timelineControl].join(' ')}
        onClick={onClick}
      />
    );
  }
  function NextArrow({ className, onClick }) {
    return (
      <ChevronRightIcon
        className={[className, classes.timelineControl].join(' ')}
        onClick={onClick}
      />
    );
  }
}

export default AlumniCarousel;
