import React from 'react';
import { makeStyles, Button } from '@material-ui/core/';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const IconLabelButtons = ({
  variant, color, startIcon, endIcon, buttonText, onClick,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant={variant}
      color={color}
      className={classes.button}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

IconLabelButtons.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  startIcon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.number]),
  endIcon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.number]),
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

IconLabelButtons.defaultProps = {
  variant: 'contained',
  color: 'primary',
  startIcon: null,
  endIcon: null,
  buttonText: 'Default Button Text',
  onClick: () => {},
};

export default IconLabelButtons;
