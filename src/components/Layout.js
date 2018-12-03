import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    position: "relative"
  },

  icon: {
    marginRight: theme.spacing.unit * 2
  },

  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },

  barControls: {
    width: "50%",
    position: "absolute",
    right: theme.spacing.unit * 3
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

function Layout(props) {
  const { classes, appName, appIcon: AppIcon, toolbar } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <AppIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            {appName}
          </Typography>
          <div className={classes.barControls}>{toolbar}</div>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {props.children}
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Made By Danielo Rodriguez using Material-U
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  toolbar: PropTypes.node
};

export default withStyles(styles)(Layout);
