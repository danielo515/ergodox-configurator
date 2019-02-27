import React, { PureComponent } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {
    maxWidth: "70%"
  },
  DialogContent: {
    width: "100%"
  }
};

class BasicDialog extends PureComponent {
  static defaultProps = {
    open: false,
    text: null,
    title: null,
    actions: null
  };

  static propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
    title: PropTypes.string,
    actions: PropTypes.node,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onEntered: PropTypes.func
  };

  render() {
    const {
      open,
      onClose,
      classes,
      text,
      onEntered,
      title,
      actions,
      children
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        onEntered={onEntered}
        aria-labelledby="edit-key"
        classes={{ paper: classes.paper }}
      >
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        <DialogContent classes={{ root: classes.DialogContent }}>
          {text && <DialogContentText>{text}</DialogContentText>}
          {children}
        </DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    );
  }
}

export default withStyles(styles)(BasicDialog);
