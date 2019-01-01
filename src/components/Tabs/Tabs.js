import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/add";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    // flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    flexGrow: 1
  },
  header: {
    display: "flex",
    flexDirection: "row"
  }
});

const handleChange = cb => (event, value) => {
  cb(value);
};

function ScrollableTabs(props) {
  const { current, tabs, classes, onChange, onAdd } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        classes={{ root: classes.header }}
      >
        <Tabs
          value={current}
          onChange={handleChange(onChange)}
          classes={{ root: classes.tabs }}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          {tabs.map((tab, idx) => (
            <Tab label={tab.label} key={idx} />
          ))}
        </Tabs>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onAdd}
        >
          <AddIcon />
        </IconButton>
      </AppBar>
    </div>
  );
}

ScrollableTabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  onAdd: PropTypes.func
};

ScrollableTabs.defaultProps = {
  tabs: []
};

export default withStyles(styles)(ScrollableTabs);
