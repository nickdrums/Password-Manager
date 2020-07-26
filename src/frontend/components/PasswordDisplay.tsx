import React, { useState } from 'react';
import {
  Typography,
  Tooltip,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { copyToClipBoard } from '../../helpers/clipboard';
import { PasswordDisplayProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    password: {
      wordBreak: 'break-all',
      fontFamily: 'monospace',
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    copy: {
      marginTop: theme.spacing(1),
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
    },
  })
);

const PasswordDisplay: React.FunctionComponent<PasswordDisplayProps> = ({
  content,
  passwordSetters,
}) => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  let closeTimer: number;

  const copy = () =>
    copyToClipBoard(content).then(() => {
      setCopied(true);
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        setCopied(false);
        passwordSetters.forEach((setter) => setter(''));
      }, 2000);
    });

  return (
    <>
      <Typography variant="h4" className={classes.password}>
        {'*'.repeat(content.length)}
      </Typography>
      <Tooltip title="Copied!" arrow open={copied}>
        <Button variant="contained" className={classes.copy} onClick={copy}>
          Copy to Clipboard
        </Button>
      </Tooltip>
    </>
  );
};

export default PasswordDisplay;
