// Disables no-param-reassign because we need to mutate the values obj
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { JSHINT } from 'jshint';
import { UnControlled as CM } from 'react-codemirror2';
import Loader from '../Loader';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/fold/foldgutter.css';

function CodeMirror({
  formKey, isEditView, readOnly, values,
}) {
  const codeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [code, setCode] = useState(
    '// Javascript Object Syntax\n'
      + '// Please ensure everything stays within the payload object\n'
      + '// While your cursor is in editor, press F11 for fullscreen mode\n'
      + 'var payload = {\n'
      + '  hello: "world",\n'
      + '  acessEnvVars: $env.MY_KEY,\n'
      + '  accessPayload: $payload.message,\n'
      + '}',
  );

  const handleKeyPress = (e) => {
    if (e.key === 'F11') {
      // eslint-disable-next-line no-shadow
      setFullScreen((fullScreen) => !fullScreen);
      e.preventDefault();
    }
  };

  const fetchData = () => {
    if (formKey && isEditView) {
      // ie: editing bridge, for payload & test payload editors
      // Sets the fetch data for form and editor
      // fetch data
      // set form data
      // set editor code
      values[formKey] = 'hello world'; // res.data.code
      setCode(values[formKey]);
    } else if (isEditView) {
      // ie: editing bridge, for latest request editor
      // Sets the fetch data for editor as form doesn't hold latest request
      // fetch data
      // set editor data
      const data = '// My latest request';
      setCode(data);
    } else if (formKey) {
      // ie: new bridge, for payload & test payload editors
      // Sets the default for form, editor state is already at default
      values[formKey] = code; // res.data.code
    } else {
      // ie: new bridge, for latest request
      // Sets latest request editor to default helper text
      setCode('// Your latest inbound request will show here after one occurs.');
    }
  };

  // Requring these at the top level throws a
  // `ReferenceError: navigator is not defined` because
  // `navigator` is a react DOM thing and is not avaiable on the server
  const loadCodeMirrorAssets = () => {
    fetchData();
    // Enable code folding - WIP: Can't get to work
    require('codemirror/addon/fold/foldcode');
    require('codemirror/addon/fold/foldgutter');
    require('codemirror/addon/fold/brace-fold');
    // Must bind JSHINT to window for lint support
    window.JSHINT = JSHINT;
    // Base Linting
    require('codemirror/addon/lint/lint');
    // JS & JSON Linting
    require('codemirror/addon/lint/javascript-lint');

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
      setTimeout(loadCodeMirrorAssets, 2500);
    }
  }, []);

  return (
    <div ref={codeRef} style={{ zIndex: fullScreen ? 1200 : 5, position: 'relative' }}>
      {mounted
        ? (
          <CM
            value={code}
            options={{
              mode: {
                name: 'javascript',
                statementIndent: 2,
              },
              theme: 'material',
              lineNumbers: true,
              lint: true,
              tabSize: 2,
              autocomplete: true,
              lineWrapping: true,
              indentWithTabs: false,
              matchBrackets: true,
              showTrailingSpace: true,
              styleActiveLine: true,
              foldGutter: true,
              fullScreen,
              readOnly,
            }}
            onChange={(editor, data, value) => {
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
    outboundURL: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    retries: PropTypes.string.isRequired,
    delay: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    envVars: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

CodeMirror.defaultProps = {
  readOnly: false,
  formKey: '',
};
