import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Paper from '@material-ui/core/Paper';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import './serviceDetails.css';

// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//     font:"normal normal normal 16px/24px 'Montserrat-Regular'",
//   },
//   active: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   completed: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   line: {
//     borderColor: '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//     font:"normal normal normal 16px/24px 'Montserrat-Regular'",
//   },
// })(StepConnector);

// const useQontoStepIconStyles = makeStyles({
//   root: {
//     color: '#eaeaf0',
//     display: 'flex',
//     height: 22,
//     alignItems: 'center',
//     font:"normal normal normal 16px/24px 'Montserrat-Regular'",
//   },
//   active: {
//     color: '#784af4',
//   },
//   circle: {
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: 'currentColor',
//     font:"normal normal normal 16px/24px 'Montserrat-Regular'",
//   },
//   completed: {
//     color: '#784af4',
//     zIndex: 1,
//     fontSize: 18,
//   },
// });

// function QontoStepIcon(props: StepIconProps) {
//   const classes = useQontoStepIconStyles();
//   const { active, completed } = props;

//   return (
//     <div
//       className={clsx(classes.root, {
//         [classes.active]: active,
//       })}
//       style={{font:"normal normal normal 16px/24px 'Montserrat-Regular'"}}
//     >
//       {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//     </div>
//   );
// }

const ColorlibConnector = withStyles({

  alternativeLabel: {
    top: 13,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 'auto',
    border: 0,
    borderTop: "2px dotted #C8C8C8",
    backgroundColor: 'transparent',
    font: "normal normal normal 16px/24px 'Montserrat-Regular'",
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    font: "normal normal normal 16px/24px 'Montserrat-Regular'",
  },
  active: {
    background: '#1acc8d',
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Check />,
    2: <Check />,
    3: <Check />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
      style={{ font: "normal normal normal 16px/24px 'Montserrat-Regular'" }}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    JobTitle: {
      font: "normal normal 24px/24px 'Montserrat-Medium'",
      color: "#000000",
      letterSpacing: "0px",
      textAlign: 'center',
      paddingTop: '30px'
    },
    StepLabelText: {
      font: "normal normal normal 16px/24px 'Montserrat-Regular'",
      color: '#333333',
      fontSize: "12px",
      letterSpacing: '0px',
      textAlign: 'center'
    },
  }),
);

function getSteps() {
  return ['ORDER PLACED', 'OG EXPERT ASSIGNED', 'OG EXPERT ON THE WAY', 'ORDER IN PROGRESS', 'ORDER COMPLETEDs'];
}

// function getStepContent(step: number) {
//   switch (step) {
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     case 3:
//       return 'ORDER IN PROGRESS';
//     case 4:
//       return 'ORDER COMPLETEDs';
//     default:
//       return 'Unknown step';
//   }
// }

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(parseInt(props.activeStep));
  console.log(123,props.activeStep)
  const steps = getSteps();

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <Paper style={{ boxShadow: '0', borderBottom: '1px solid #ddd' }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon} className={classes.StepLabelText}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </div>
  );
}