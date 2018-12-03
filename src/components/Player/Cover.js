import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import placeholder from './placeholder.svg';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  media: {
    // object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});
// Make it pure component to avoid per second renderings if it were functional
export class Cover extends PureComponent {
  render() {
    const { title, cover, classes } = this.props;

    return (
      <CardMedia
        component="img"
        alt={title}
        className={classes.media}
        height="200"
        image={cover || placeholder}
        title={title || 'image'}
      />
    );
  }
}

Cover.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
};

export default withStyles(styles)(Cover);
