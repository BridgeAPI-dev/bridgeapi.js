/* eslint-disable global-require */
import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { JSHINT } from 'jshint';
import { UnControlled as CM } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/fold/foldgutter.css';

function CodeMirror({ inputCode, readOnly = false }) {
  const codeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'F11') {
      // eslint-disable-next-line no-shadow
      setFullScreen((fullScreen) => !fullScreen);
      e.preventDefault();
    }
  };

  // Requring these at the top level throws a
  // `ReferenceError: navigator is not defined` because
  // `navigator` is a react DOM thing and is not avaiable on the server
  const loadCodeMirrorAssets = () => {
    if (!mounted) {
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
    }
  };

  useEffect(() => {
    // Prevent blocking the main thread
    setTimeout(loadCodeMirrorAssets, 0);
  }, []);

  const code = inputCode
    || '// Javascript Object Syntax\n'
      + 'Please ensure everything stays within the payload object\n'
      + '// While your cursor is in editor, press F11 for fullscreen mode\n'
      + 'var payload = {\n'
      + '  hello: "world",\n'
      + '  acessEnvVars: $env.MY_KEY,\n'
      + '  accessPayload: $payload.message,\n'
      + '}';

  return (
    <div ref={codeRef} style={{ zIndex: fullScreen ? 1200 : 5, position: 'relative' }}>
      {mounted
      && (
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
        />
      )}
    </div>
  );
}

export default CodeMirror;

CodeMirror.propTypes = {
  readOnly: PropTypes.bool,
  inputCode: PropTypes.string,
};

CodeMirror.defaultProps = {
  readOnly: false,
  inputCode: '',
};
