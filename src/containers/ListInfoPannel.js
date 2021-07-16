import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DialogBox from '../components/Dialog/DialogBox';
import DialogForm from '../components/Dialog/DialogForm';
import ListGrid from '../components/Grid/ListGrid';
import { dialogFormFields } from '../utils/constants';

const useStyles = makeStyles(() => ({
  listInfoGrid: {
    padding: 10,
  },
}));

const ListInfoPannel = ({
  listInfo, setListInfo,
}) => {
  const classes = useStyles();
  const [
    [showNewCardModal, setShowNewCardModal],
    [formData, setFormData],
    [selectedList, setSelectedList],
  ] = [useState(false), useState({}), useState('')];
  const { addNewCard: { dialogInfo: { title, additionalText, actions } } } = dialogFormFields;

  const removeSelectedList = ({ listName }) => {
    const listInfoCopy = cloneDeep(listInfo);
    const listInfoFromLocalStorage = cloneDeep(JSON.parse(localStorage.getItem('listInfo')));
    delete listInfoFromLocalStorage[listName];
    delete listInfoCopy[listName];
    localStorage.setItem('listInfo', JSON.stringify(listInfoFromLocalStorage));
    setListInfo(listInfoCopy);
  };

  return (
    <div className={classes.listInfoGrid}>
      <>
        <ListGrid
          items={listInfo}
          setListInfo={setListInfo}
          headerIconOnClickHandler={removeSelectedList}
          footerIconOnClickHandler={setShowNewCardModal}
          setSelectedList={setSelectedList}
        />
        <DialogBox
          title={title}
          additionalText={additionalText}
          content={<DialogForm modalFormType="addNewCard" saveFormData={setFormData} formData={formData} />}
          actions={actions}
          formData={formData}
          saveFormData={setFormData}
          open={showNewCardModal}
          setShowNewModal={setShowNewCardModal}
          setListInfo={setListInfo}
          modalFormType="addNewCard"
          selectedList={selectedList}
        />
      </>
    </div>

  );
};

ListInfoPannel.propTypes = {
  listInfo: PropTypes.shape({}),
  setListInfo: PropTypes.func,
};

ListInfoPannel.defaultProps = {
  listInfo: {},
  setListInfo: () => {},
};

export default ListInfoPannel;
