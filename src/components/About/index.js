import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import report from './report.png';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  image: {
    maxWidth: '90%',
  },
});

const Section = ({ title, children }) => (
  <React.Fragment>
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="textPrimary"
      gutterBottom
    >
      {title}
    </Typography>
    <Typography variant="h6" align="center" color="textSecondary" paragraph>
      {children}
    </Typography>
  </React.Fragment>
);

const About = props => {
  const { classes } = props;

  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Section title="About this">
          This is just a small SPA using react + redux as an exercise. It uses{' '}
          <a href="https://material-ui.com">MaterialUi</a> as components
          library. <br />
          The boilerplate has been created using create-react-app. It tries to
          follow all the good practices of an SPA, scoring relatively high on{' '}
          <a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es">
            Lighthouse
          </a>
          <img src={report} alt="lighthouse report" className={classes.image} />
        </Section>
        <Section title={'About the author'}>
          This has been created by <b>Daniel Rodriguez Rivero</b>. I'm a full
          stack JavaScript developer who enjoys trying and learning new things.
          If you want to know more about me, you can go to{' '}
          <a href="https://danielo515.github.io">danielorodriguez.com</a>
        </Section>
        <Section title={'About the music'}>
          This is just a proof of concept. I do not own any of the songs here.
          All of them have been downloaded from{' '}
          <a href="https://www.bensound.com.">https://www.bensound.com</a>.
          <br />
          They provide a great library of music with Creative Commons License.
          If you want to download the music please go to bensound.
        </Section>
      </div>
    </div>
  );
};

export default withStyles(styles)(About);
