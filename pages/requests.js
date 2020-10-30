import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  Checkbox,
  Grid,
  Divider,
  FormControlLabel,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { CheckCircle, ExpandMore } from '@material-ui/icons';
import {
  Alert, Timeline, TimelineItem, TimelineSeparator, TimelineContent, TimelineOppositeContent, TimelineDot, TimelineConnector,
} from '@material-ui/lab';
import Navbar from '../components/shared/dashboard/Navbar/index';

Requests.defaultProps = {
  title: 'Bridge1',
  status: 200,
  url: 'https://bridgeapi.dev/event/8726933',
  time: 796,
  size: 1.17,
  date: '17-10-2013',
  length: 6615,
};

const getAlert = (props) => {
  const { status } = props;
  switch (true) {
    case status <= 199:
      return (
        <Alert severity="info">
          {status}
          {' '}
          - Information response
        </Alert>
      );
    case status <= 299:
      return (
        <Alert severity="success">
          {status}
          {' '}
          - Successful response
        </Alert>
      );
    case status <= 399:
      return (
        <Alert severity="warning">
          {status}
          {' '}
          - Redirection
        </Alert>
      );
    default:
      return (
        <Alert severity="error">
          {status}
          {' '}
          - Error response
        </Alert>
      );
  }
};

const requestItems = [
  {
    time: '',
    date: '',
    statusCode: '',
  },
  {
    time: '9:32 PM',
    date: '10/17/2020',
    statusCode: 200,
  },
];

while (requestItems.length < 30) {
  requestItems.push({
    time: '9:37 PM',
    date: '10/17/2020',
    statusCode: 302,
  });
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  accordion: {
    marginBottom: '2em',
  },
  accordionDetails: {
    borderTop: '1px',
  },
  accordionSummary: {
    height: '4em',
  },
  timeline: {
    marginRight: '2em',
  },
  cardTitle: {
    fontWeight: 900,
    fontSize: '1.3em',
  },
});

export default function Requests(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container spacing={5} direction="row">
        <Grid
          item
          direction="column"
          xs={1.5}
          style={{ 'overflow-y': 'scroll' }}
        >
          <List>
            {requestItems.map((obj) => (
              <>
                <ListItem divider>
                  <ListItemText>
                    <Typography
                      variant="body2"
                      align={obj.time ? 'right' : 'center'}
                    >
                      {!obj.time && 'Ongoing'}
                      {obj.time
                        && `${obj.time} - ${obj.date} ${obj.statusCode}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </>
            ))}
          </List>
        </Grid>
        {/* <Grid item direction="column" xs={1}>
          Timeline
        </Grid> */}
        <Grid item direction="column" xs={8}>
          {getAlert(props)}
          <Typography align="center" variant="body2">
            Send your events here:
          </Typography>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold', marginBottom: '1em' }}
          >
            {props.url}
          </Typography>

          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  9:30 am
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <p>SOMETHING HERE</p>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Eat
                  </Typography>
                  <Typography>Because you need strength</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  10:00 am
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <p>SOMETHING HERE</p>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Code
                  </Typography>
                  <Typography>Because it&apos;s awesome!</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  <p>Some Icon here</p>
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Sleep
                  </Typography>
                  <Typography>Because you need rest</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <p>More stuff here</p>
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Repeat
                  </Typography>
                  <Typography>Because this is the life you love!</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>

          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              className={classes.accordionSummary}
            >
              <Grid container direction="column">
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  Response
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Response from the outbound service
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Typography>HEADERS:</Typography>
                <Typography>
                  Data:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Type:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Length:
                  {' '}
                  {props.length}
                </Typography>
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                </Typography>
                <Box>(Code editor)</Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              className={classes.accordionSummary}
            >
              <Grid container direction="column">
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  Outbound
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Sent to the outbound service
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Typography>HEADERS:</Typography>
                <Typography>
                  Data:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Type:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Length:
                  {' '}
                  {props.length}
                </Typography>
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                </Typography>
                <Box>(Code editor)</Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              className={classes.accordionSummary}
            >
              <Grid container direction="column">
                <Typography variant="body1" align="center">
                  ---------------------------------------------------------------------------------------------
                  {'   Show failed attempts   '}
                  ---------------------------------------------------------------------------------------------
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Typography>HEADERS:</Typography>
                <Typography>
                  Data:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Type:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Length:
                  {' '}
                  {props.length}
                </Typography>
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                </Typography>
                <Box>(Code editor)</Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              className={classes.accordionSummary}
            >
              <Grid container direction="column">
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  Inbound
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Received from the inbound service
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Typography>HEADERS:</Typography>
                <Typography>
                  Data:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Type:
                  {' '}
                  {props.date}
                </Typography>
                <Typography>
                  Content-Length:
                  {' '}
                  {props.length}
                </Typography>
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                </Typography>
                <Box>(Code editor)</Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}

// ------------- Original

// function Requests(props) {
//   const [selectedRequest, setSelectedRequest] = React.useState(0);

//   const classes = useStyles();

//   return (
//     <>
//       <Navbar />
//       <Grid container spacing={6} direction="row">
//         <Grid item direction="column" xs={2} style={{ 'overflow-y': 'scroll' }}>
//           <List>
//             {requestItems.map((obj) => (
//               <>
//                 <ListItem divider>
//                   <ListItemText>
//                     <Typography
//                       variant="body2"
//                       align={obj.time ? 'right' : 'center'}
//                     >
//                       {!obj.time && 'Ongoing'}
//                       {obj.time &&
//                         `${obj.time} - ${obj.date} ${obj.statusCode}`}
//                     </Typography>
//                   </ListItemText>
//                 </ListItem>
//               </>
//             ))}
//           </List>
//         </Grid>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMore />}
//             aria-label="Expand"
//             aria-controls="additional-actions1-content"
//             id="additional-actions1-header"
//           >
//             <FormControlLabel
//               aria-label="Acknowledge"
//               onClick={(event) => event.stopPropagation()}
//               onFocus={(event) => event.stopPropagation()}
//               label="I acknowledge that I should stop the click event propagation"
//             />
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography color="textSecondary">
//               The click event of the nested action will propagate up and expand
//               the accordion unless you explicitly stop it.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMore />}
//             aria-label="Expand"
//             aria-controls="additional-actions2-content"
//             id="additional-actions2-header"
//           >
//             <FormControlLabel
//               aria-label="Acknowledge"
//               onClick={(event) => event.stopPropagation()}
//               onFocus={(event) => event.stopPropagation()}
//               label="I acknowledge that I should stop the focus event propagation"
//             />
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography color="textSecondary">
//               The focus event of the nested action will propagate up and also
//               focus the accordion unless you explicitly stop it.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMore />}
//             aria-label="Expand"
//             aria-controls="additional-actions3-content"
//             id="additional-actions3-header"
//           >
//             <FormControlLabel
//               aria-label="Acknowledge"
//               onClick={(event) => event.stopPropagation()}
//               onFocus={(event) => event.stopPropagation()}
//               label="I acknowledge that I should provide an aria-label on each action that I add"
//             />
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography color="textSecondary">
//               If you forget to put an aria-label on the nested action, the label
//               of the action will also be included in the label of the parent
//               button that controls the accordion expansion.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       </Grid>
//     </>

/// -------------

// <>
//   <Navbar />
//   <Grid container spacing={6} direction="row">
//     <Grid item direction="column" xs={2} style={{ 'overflow-y': 'scroll' }}>
//       <List>
//         {requestItems.map((obj) => (
//           <>
//             <ListItem divider>
//               <ListItemText>
//                 <Typography
//                   variant="body2"
//                   align={obj.time ? 'right' : 'center'}
//                 >
//                   {!obj.time && 'Ongoing'}
//                   {obj.time
//                       && `${obj.time} - ${obj.date} ${obj.statusCode}`}
//                 </Typography>
//               </ListItemText>
//             </ListItem>
//           </>
//         ))}
//       </List>
//     </Grid>
//     <Grid container item direction="column" xs={10}>
//       <Card
//         style={{
//           padding: '1em',
//           color: '#1E4620',
//           backgroundColor: '#EDF7ED',
//         }}
//       >
//         <Grid container item direction="row">
//           {/* TODO: Replace with Alert component */}
//           <CheckCircle style={{ marginRight: '1em' }} />
//           <Typography>200 OK - The latest request has succeeded</Typography>
//         </Grid>
//       </Card>
//       <Typography align="center" variant="body2">
//         Send your events here:
//       </Typography>
//       <Typography
//         align="center"
//         variant="h6"
//         style={{ fontWeight: 'bold', marginBottom: '1em' }}
//       >
//         {props.url}
//       </Typography>
//       <Grid container item direction="row">
//         <Typography xs={2} className={classes.timeline}>
//           5:32PM
//         </Typography>
//         <Grid xs={10} container item direction="column">
//           <Paper style={{ paddingLeft: '2em' }}>
//             <Grid container item direction="row" justify="space-between">
//               <Grid item direction="column">
//                 <Typography className={classes.cardTitle}>
//                   Response
//                 </Typography>
//                 <Typography className={classes.microCopy}>
//                   Response from the outbound service
//                 </Typography>
//               </Grid>
//               <RemoveCircle
//                 style={{ marginTop: '0.5em', marginRight: '0.5em' }}
//               />
//             </Grid>
//             <Divider />
//             <Typography
//               align="center"
//               variant="body1"
//               style={{ fontWeight: 600, marginBottom: '1em' }}
//             >
//               Status:
//               {' '}
//               {props.status}
//               {' '}
//               Time:
//               {' '}
//               {props.time}
//               {' '}
//               ms Size:
//               {' '}
//               {props.size}
//               {' '}
//               KB
//             </Typography>
//             <Typography>HEADERS:</Typography>
//             <Typography>
//               Data:
//               {' '}
//               {props.date}
//             </Typography>
//             <Typography>
//               Content-Type:
//               {' '}
//               {props.date}
//             </Typography>
//             <Typography>
//               Content-Length:
//               {' '}
//               {props.length}
//             </Typography>
//             <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
//               PAYLOAD:
//             </Typography>
//             <Box>(Code editor)</Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// </>
//   );
// }

// export default Requests;
