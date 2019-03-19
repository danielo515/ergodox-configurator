import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center"
  },
    button: {
        margin: `0 ${theme.spacing.unit/2}rem`
    }
});

const Actions = ({ actions, classes }) => {
  return (
      <div className={classes.root}>
          {actions.map((action, idx) => (
              <Button variant="outlined" className={classes.button} key={idx} onClick={action.method}>
                  {action.label}
              </Button>
          ))}
      </div>
  );
};

Actions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      method: PropTypes.func,
      label: PropTypes.string
    })
  )
};

Actions.defaultProps = {
  actions: []
};

export default withStyles(styles)(Actions);
