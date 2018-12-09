import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Helmet from "react-helmet";

import Keyboard from "../components/Keyboard";
import Actions from "../components/Keyboard/Actions";
import Layout from "../components/Keyboard/Layout";
import EditForm from "../components/EditForm";
import ExportDialog from "../components/ExportDialog";
import Tabs from "../components/Tabs";

import { actions as keyboardActions } from "../modules/keyboard/reducer";
import { selectKeyOptions } from "../modules/keyboard/keyDefinitions";

// if (process.env.NODE_ENV !== "production") {
//   const { whyDidYouUpdate } = require("why-did-you-update");
//   whyDidYouUpdate(React);
// }

const mapStateToProps = state => ({
  ...state.keyboard
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(keyboardActions, dispatch);

export class KeyboardPage extends Component {
  static propTypes = {
    prop: PropTypes.string
  };

  render() {
    const {
      editKey,
      layout,
      keys,
      exportLayout,
      editing,
      editingId,
      exportIsOpen,
      closeExport,
      exported,
      setKey
    } = this.props;
    return (
      <Fragment>
        <Helmet>
          {/* General tags */}
          <title>Ergodox layout editor</title>
          <meta name="description" content="Configure your ergodox layouts" />
          <html lang="en" />
        </Helmet>
        <Layout
          top={<Tabs />}
          bottom={
            <Actions actions={[{ method: exportLayout, label: "Export" }]} />
          }
        >
          <Keyboard
            onKeySelect={editKey}
            layout={layout.description}
            split={layout.split}
            keysData={keys}
          />
        </Layout>
        <EditForm
          open={editing}
          onClose={setKey}
          info={{ id: editingId }}
          keyOptions={selectKeyOptions}
        />
        <ExportDialog open={exportIsOpen} close={closeExport} text={exported} />
      </Fragment>
    );
  }
}

const KeyboardPageConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardPage);

export default () => <KeyboardPageConnected />;
