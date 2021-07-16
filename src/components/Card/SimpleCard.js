import React from 'react';
import {
  makeStyles, Card, CardActions, CardContent,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const SimpleCard = ({ cardContent, cardActions }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {!isEmpty(cardContent) && (
      <CardContent>
        {cardContent}
      </CardContent>
      )}
      {!isEmpty(cardActions)
      && (
      <CardActions>
        {cardActions}
      </CardActions>
      )}
    </Card>
  );
};

SimpleCard.propTypes = {
  cardContent: PropTypes.oneOfType([PropTypes.elementType, PropTypes.number]),
  cardActions: PropTypes.oneOfType([PropTypes.elementType, PropTypes.number]),
};

SimpleCard.defaultProps = {
  cardContent: null,
  cardActions: null,
};

export default SimpleCard;
