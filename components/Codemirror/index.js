/* eslint-disable global-require */
import React, {
  useState, useRef, useEffect,
} from 'react';
import { JSHINT } from 'jshint';
import { UnControlled as CM } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/fold/foldgutter.css';

function CodeMirror({ inputCode }) {
  const codeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'F11') {
      setFullscreen((fullscreen) => !fullscreen);
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
      + '// Requires `var =` otherwise defaults to JSON mode\n'
      + 'var payload = {\n'
      + '  hello: "world",\n'
      + '  env: $keys.MY_KEY,\n'
      + '  payload: $payload.status,\n'
      + '}';

  return (
    <div ref={codeRef}>
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
          fullScreen: fullscreen,
        }}
        style={{ zIndex: 1200 }}
      />
      )}
    </div>
  );
}

export default CodeMirror;