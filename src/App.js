import React, { useState } from 'react';
import './App.css';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import IconLabelButton from './components/Button/IconLabelButton';
import DialogBox from './components/Dialog/DialogBox';
import DialogForm from './components/Dialog/DialogForm';
import { dialogFormFields } from './utils/constants';
import ListInfoPannel from './containers/ListInfoPannel';

const useStyles = makeStyles(() => ({
  addListBtn: {
    float: 'right',
  },
  listInfoGrid: {
    padding: 10,
  },
}));

function App() {
  const classes = useStyles();
  const [
    [showNewListModal, setShowNewListModal],
    [formData, setFormData],
    [listInfo, setListInfo],
  ] = [useState(false), useState({}), useState(JSON.parse(localStorage.getItem('listInfo')))];
  const { addNewList: { dialogInfo: { title, additionalText, actions } } } = dialogFormFields;

  return (
    <div className="App">
      <h1>Trello Board</h1>
      <hr />
      <div className={classes.addListBtn}>
        <IconLabelButton
          variant="contained"
          color="primary"
          startIcon={<PlaylistAddIcon />}
          buttonText="ADD LIST"
          onClick={() => setShowNewListModal(true)}
        />
        <DialogBox
          title={title}
          additionalText={additionalText}
          content={<DialogForm modalFormType="addNewList" saveFormData={setFormData} formData={formData} />}
          actions={actions}
          formData={formData}
          saveFormData={setFormData}
          open={showNewListModal}
          setShowNewModal={setShowNewListModal}
          setListInfo={setListInfo}
          modalFormType="addNewList"
        />
      </div>
      {!isEmpty(listInfo) && <ListInfoPannel listInfo={listInfo} setListInfo={setListInfo} />}
    </div>
  );
}

export default App;
