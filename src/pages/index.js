import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Helmet from "react-helmet";

import Keyboard from "../components/Keyboard";
import Actions from "../components/Keyboard/Actions";
import Layout from "../components/Keyboard/Layout";
import editKey from "../components/EditForm";
import ExportDialog from "../components/ExportDialog";
import Tabs from "../components/Tabs";

import { actions as keyboardActions } from "../modules/keyboard/reducer";
import {
  selectKeyOptions,
  selectModifierOptions,
  keyCodes
} from "../modules/keyboard/keyDefinitions";
import { actions as uiActions } from "../modules/ui";
import ImportDialog from "../components/ImportDialog";

const EditForm = editKey(keyCodes);

const mapStateToProps = state => ({
  ...state.keyboard,
  ...state.ui
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(keyboardActions, dispatch),
  ui: bindActionCreators(uiActions, dispatch)
});

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
      exportClose,
      importLayout,
      exported,
      importDialogOpen,
      ui,
      setKey
    } = this.props;
    return (
      <Fragment>
        <Helmet>
          {/* General tags */}
          <title>Ergodox layout editor</title>
          <meta name="description" content="Configure your ergodox layouts" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <html lang="en" />
        </Helmet>
        <Layout
          top={<Tabs />}
          bottom={
            <Actions
              actions={[
                { method: exportLayout, label: "Export" },
                { method: ui.openImport, label: "Import" }
              ]}
            />
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
          modifierOptions={selectModifierOptions}
        />
        <ExportDialog open={exportIsOpen} close={exportClose} text={exported} />
        <ImportDialog
          open={importDialogOpen}
          onClose={ui.closeImport}
          onSubmit={importLayout}
        />
      </Fragment>
    );
  }
}

const KeyboardPageConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardPage);

export default () => <KeyboardPageConnected />;
