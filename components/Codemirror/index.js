// Disables no-param-reassign because we need to mutate the values obj
/* eslint-disable no-param-reassign */
// Disables global-require because CodeMirror 5 doesn't support import syntax
/* eslint-disable global-require */
import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CM } from 'react-codemirror2';

import Loader from '../Loader';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/fold/foldgutter.css';

function CodeMirror({
  formKey, isEditView, readOnly, values, data, id,
}) {
  const defaultCode = '{\n'
    + '  "hello": "world",\n'
    + '  "accessPayload": "$payload.message",\n'
    + '  "accessNestedPayload": "$payload.nested.message"\n'
    + '}';
  const defaultTestCode = '{\n'
    + '  "hello": "world",\n'
    + '  "message": "Hello World",\n'
    + '  "nested": {\n'
    + '    "message": "Hello World"\n'
    + '  }\n'
    + '}';

  const codeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [code, setCode] = useState(formKey === 'testPayloadCode' ? defaultTestCode : defaultCode);

  const handleKeyPress = (e) => {
    if (e.key === 'F11') {
      // eslint-disable-next-line no-shadow
      setFullScreen((fullScreen) => !fullScreen);
      e.preventDefault();
    }
  };

  const fetchData = () => {
    if (formKey && isEditView) {
      // Editing Bridge - For fetching payload & test payload code
      setCode(values[formKey]);
    } else if (isEditView) {
      // ie: editing bridge, for latest request editor
      // Sets the fetch data for editor as form doesn't hold latest request
      // fetch data
      // set editor data
      // TODO: Need endpoint that accepts bridge_id and returns
      // inbound payload of latest payload
      const state = JSON.stringify(data, null, 2) || '// My latest request';
      setCode(state);
    } else if (formKey) {
      // New Bridge - For payload & test payload editors
      // Sets the default for form, editor state is already at default
      values[formKey] = code;
    } else {
      // New Bridge - For latest request editor
      // Sets latest request editor to default helper text
      setCode('// Your latest inbound request will show here after one occurs.');
    }
  };

  // Requring these at the top level throws a
  // `ReferenceError: navigator is not defined` because
  // `navigator` is a react DOM thing and is not avaiable on the server
  const loadCodeMirrorAssets = () => {
    fetchData();
    // TODO: Can't get code folding to work
    // Enable code folding
    // require('codemirror/addon/fold/foldcode');
    // require('codemirror/addon/fold/foldgutter');
    // require('codemirror/addon/fold/brace-fold');

    // Must bind jsonlint to window for lint support
    window.jsonlint = require('jsonlint');
    // Base Linting
    require('codemirror/addon/lint/lint');
    // JSON Linting
    require('codemirror/addon/lint/json-lint');

    // Automatically make a closing bracket
    require('codemirror/addon/edit/closebrackets');
    // Add a squiggly for trailing whitespace
    require('codemirror/addon/edit/trailingspace');
    // Highlight the current set of brackets
    require('codemirror/addon/edit/matchbrackets');

    // Highlight current line
    require('codemirror/addon/selection/active-line');

    // F11 fullscreen mode
    require('codemirror/addon/display/fullscreen');

    // Set the language - Includes JS & JSON
    require('codemirror/mode/javascript/javascript');

    // Add event listener for fullscreen mode
    codeRef.current.addEventListener('keydown', handleKeyPress);

    // And prevent all this from happening again
    setMounted(true);
  };

  useEffect(() => {
    if (!mounted) {
      // Make async - Prevent blocking the main thread
      setTimeout(loadCodeMirrorAssets, 0);
    }
  }, []);

  return (
    <div ref={codeRef} id={id} style={{ zIndex: fullScreen ? 1200 : 5, position: 'relative' }}>
      {mounted
        ? (
          <CM
            value={code}
            options={{
              mode: {
                name: 'application/json',
                statementIndent: 2,
              },
              theme: 'material',
              lineNumbers: true,
              lint: true,
              tabSize: 4,
              autocomplete: true,
              lineWrapping: true,
              indentWithTabs: false,
              matchBrackets: true,
              showTrailingSpace: true,
              styleActiveLine: true,
              foldGutter: true,
              gutters: ['CodeMirror-lint-markers'],
              fullScreen,
              readOnly,
            }}
            onChange={(_, __, value) => {
              if (formKey) {
                values[formKey] = value;
              }
            }}
          />
        ) : (
          <Loader />
        )}
    </div>
  );
}

export default CodeMirror;

CodeMirror.propTypes = {
  readOnly: PropTypes.bool,
  isEditView: PropTypes.bool.isRequired,
  formKey: PropTypes.string,
  values: PropTypes.shape({
    payloadCode: PropTypes.string,
    testPayloadCode: PropTypes.string,
  }),
  data: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
};

CodeMirror.defaultProps = {
  readOnly: false,
  formKey: '',
  values: {
    payloadCode: '',
    testPayloadCode: '',
  },
  data: {},
};
