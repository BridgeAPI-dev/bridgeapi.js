/* eslint-disable global-require */
import {
  Accordion, AccordionDetails, Container, Typography, makeStyles, AccordionSummary as MUIAccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { JSHINT } from 'jshint';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint.css';

import AccordionSummary from '../../AccordionSummary';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a6a6a4',
  },
  payloadContainer: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  inboundPayloadAccordion: {
    marginBottom: theme.spacing(2),
  },
}));

function Payload({ inputCode }) {
  const classes = useStyles();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    // Must bind JSHINT to window for lint support
    window.JSHINT = JSHINT;
    // Requring this at the top level causes
    // `ReferenceError: navigator is not defined` because
    // `navigator` is a react DOM thing and is not avaiable on the server
    require('codemirror/mode/javascript/javascript');
    require('codemirror/addon/lint/lint');
    require('codemirror/addon/lint/javascript-lint');
  }, []);

  const code = inputCode
    || '// Javascript Object Syntax\n'
      + '{\n  '
      + 'hello: "world"\n  '
      + 'env: $keys.MY_KEY\n  '
      + 'payload: $payload.status\n'
      + '}';

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        icon={<ExpandMoreIcon />}
        title="Payload"
        subtitle="Edit payload for outgoing request"
      />

      <AccordionDetails>
        <Container
          align="left"
          maxWidth={false}
          className={classes.payloadContainer}
        >
          <Accordion className={classes.inboundPayloadAccordion}>
            <MUIAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                View latest inbound payload
              </Typography>
            </MUIAccordionSummary>
            <AccordionDetails />
          </Accordion>

          <Typography>Edit outbound payload</Typography>
          {mounted
            && (
            <CodeMirror
              value={code}
              options={{
                mode: {
                  name: 'javascript',
                  json: false,
                  statementIndent: 2,
                  esversion: 6,
                },
                theme: 'material',
                lineNumbers: true,
                lint: true,
                tabSize: 2,
                autocomplete: true,
                lineWrapping: true,
                indentWithTabs: false,
              }}
              onChange={(editor, data, value) => {
                console.log(value);
              }}
            />
            )}

        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default Payload;
