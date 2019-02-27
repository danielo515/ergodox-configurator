import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

const Actions = ({ actions, classes }) => {
  return (
    <div className={classes.root}>
      {actions.map((action, idx) => (
        <button key={idx} onClick={action.method}>
          {action.label}
        </button>
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
