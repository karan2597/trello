import React from 'react';
import {
  makeStyles, Grid, Paper, Typography, Divider,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import {
  isEmpty, cloneDeep, filter, find, findIndex,
} from 'lodash';
import moment from 'moment';
import SimpleCard from '../Card/SimpleCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 'auto',
    width: 'auto',
  },
  control: {
    padding: theme.spacing(2),
  },
  gridHeader: {
    padding: '10px 10px 0 10px',
  },
  headerIcon: {
    float: 'right',
  },
  listFooter: {
    paddingTop: 10,
  },
  creationTimeLabel: {
    backgroundColor: '#ebdb48',
    wordBreak: 'break-word',
  },
  list: {
    margin: 10,
  },
}));

const ListGrid = ({
  items, headerIconOnClickHandler, footerIconOnClickHandler, setSelectedList, setListInfo,
}) => {
  const classes = useStyles();

  const removeSelectedCard = ({ cardsInfoList, cardCreationTime, listName }) => {
    const [listInfoCopy, cardsInfoListCopy, listInfoFromLocalStorage] = [cloneDeep(items), cloneDeep(cardsInfoList), cloneDeep(JSON.parse(localStorage.getItem('listInfo')))];
    listInfoCopy[listName] = filter(cardsInfoListCopy,
      (currentObject) => currentObject.cardCreationTime !== cardCreationTime);
    listInfoFromLocalStorage[listName] = filter(cardsInfoListCopy,
      (currentObject) => currentObject.cardCreationTime !== cardCreationTime);
    localStorage.setItem('listInfo', JSON.stringify(listInfoFromLocalStorage));
    setListInfo(listInfoCopy);
  };

  const renderGridHeader = ({ listName }) => (
    <div className={classes.gridHeader}>
      {listName}
      <CloseIcon color="secondary" className={classes.headerIcon} onClick={() => headerIconOnClickHandler({ listName })} />
    </div>
  );

  const renderCardContent = ({
    cardTitle, cardDesc, cardCreationTime, cardsInfoList, itemName,
  }) => (
    <>
      <CloseIcon color="secondary" className={classes.headerIcon} onClick={() => removeSelectedCard({ cardsInfoList, cardCreationTime, listName: itemName })} />

      <Typography variant="h4" component="h2">
        {cardTitle}
      </Typography>
      <span className={classes.creationTimeLabel}>
        {moment(cardCreationTime).format('MMMM DD, YYYY - h:mm:ssa')}
      </span>
      <Typography className={classes.pos} color="textSecondary">
        {cardDesc}
      </Typography>
    </>
  );

  const findSourceListInfo = ({ itemsCopy, sourceCardId }) => {
    // Finding the source list info,
    // based on source card id which is the creation time of the source card
    let sourceListName = '';
    let sourceListIndex = '';
    Object.keys(itemsCopy).forEach((itemName) => {
      const selectedList = itemsCopy[itemName];
      const cardExistsInList = find(selectedList, { cardCreationTime: sourceCardId });
      if (!isEmpty(cardExistsInList)) {
        sourceListIndex = findIndex(selectedList, { cardCreationTime: sourceCardId });
        sourceListName = itemName;
      }
    });
    return { sourceListName, sourceListIndex };
  };

  const drag = (e) => {
    e.dataTransfer.setData('sourceCard', e.target.id);
  };

  const drop = (e, { id }) => {
    e.preventDefault();
    const sourceCardId = parseInt(e.dataTransfer.getData('sourceCard'), 10);
    const itemsCopy = cloneDeep(items);
    const { sourceListIndex, sourceListName } = findSourceListInfo({ itemsCopy, sourceCardId });
    if (id === sourceListName) {
      // if the card is dragged and dropped into the same list, don't do anything
      return;
    }
    const sourceListInfo = itemsCopy[sourceListName];
    const [deletedCardInfo] = sourceListInfo.splice(sourceListIndex, 1);
    const destListInfo = itemsCopy[id];
    destListInfo.push(deletedCardInfo);
    // sorting cards in descending order of their time
    destListInfo.sort((a, b) => b.cardCreationTime - a.cardCreationTime);
    localStorage.setItem('listInfo', JSON.stringify(itemsCopy));
    setListInfo(itemsCopy);
  };

  const allowDrop = (e) => e.preventDefault();

  const renderCardsList = ({ cardsInfoList, itemName }) => (
    cardsInfoList.map(({ cardTitle, cardDesc, cardCreationTime }, index) => (
      <div id={cardCreationTime} draggable="true" onDragStart={(e) => drag(e)}>
        <SimpleCard
          cardContent={renderCardContent({
            cardTitle, cardDesc, cardCreationTime, cardsInfoList, itemName,
          })}
          items={items}
          cardCreationTime={cardCreationTime}
          index={index}
        />
        <Divider variant="fullWidth" />
      </div>
    ))
  );

  const renderListFooter = ({ listName }) => (
    <div className={classes.listFooter}>
      <AddCircleOutlineIcon onClick={() => {
        footerIconOnClickHandler(true);
        setSelectedList(listName);
      }}
      />
    </div>
  );

  const renderGridItems = () => (
    Object.keys(items).map((itemName) => (
      <div
        className={classes.list}
        onDrop={(e) => drop(e, { id: itemName })}
        onDragOver={(e) => allowDrop(e)}
      >
        <Grid key={itemName} item>
          <Paper elevation={3} className={classes.paper}>
            <Typography gutterBottom variant="h5">
              {renderGridHeader({ listName: itemName })}
            </Typography>
            <Divider variant="fullWidth" />
            {!isEmpty(items[itemName]) && renderCardsList({
              cardsInfoList: items[itemName], itemName,
            })}
            {renderListFooter({ listName: itemName })}
          </Paper>
        </Grid>
      </div>
    ))
  );

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {renderGridItems()}
        </Grid>
      </Grid>
    </Grid>
  );
};

ListGrid.propTypes = {
  items: PropTypes.shape({}),
  headerIconOnClickHandler: PropTypes.func,
  footerIconOnClickHandler: PropTypes.func,
  setSelectedList: PropTypes.func,
  setListInfo: PropTypes.func,
};

ListGrid.defaultProps = {
  items: {},
  headerIconOnClickHandler: () => {},
  footerIconOnClickHandler: () => {},
  setSelectedList: () => {},
  setListInfo: () => {},
};

export default ListGrid;
