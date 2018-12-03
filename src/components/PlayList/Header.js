import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";

import { withStyles } from "@material-ui/core/styles";

const styles = ({ palette, spacing }) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center"
  },
  formControl: {
    margin: spacing.unit,
    minWidth: 120
  },
  label: {
    color: palette.primary.contrastText
  }
});

class Header extends PureComponent {
  onSort = e => {
    this.props.onSortChange(e.target.value);
  };
  render() {
    const { props } = this;
    const { sortBy = "", classes } = props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar classes={{ root: classes.toolbar }} color="primary">
            <FormControl className={classes.formControl} variant="filled">
              <InputLabel
                classes={{ root: classes.label, filled: classes.label }}
              >
                Sort by
              </InputLabel>
              <Select
                value={sortBy}
                onChange={this.onSort}
                name="sort-by"
                input={<FilledInput name="sortBy" />}
              >
                <MenuItem value="">--</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  sortBy: PropTypes.string,
  onSortChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
