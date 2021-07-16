import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core/';
import { isEmpty, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import IconLabelButton from '../Button/IconLabelButton';

const resetFormData = ({ saveFormData }) => saveFormData({ formData: {} });

const renderActionButtons = ({
  actions, setShowNewModal, formData, saveFormData, setListInfo, modalFormType, selectedList,
}) => (
  Object.keys(actions).map((actionInfo) => {
    const {
      key, variant, color, text,
    } = actions[actionInfo];
    return (
      <IconLabelButton
        key={key}
        variant={variant}
        color={color}
        buttonText={text}
        onClick={() => {
          if (actionInfo === 'positive') {
            const listInfo = cloneDeep(JSON.parse(localStorage.getItem('listInfo')));
            let newListInfo = { [formData.listTitle]: [] };
            if (modalFormType === 'addNewList') {
              if (!isEmpty(listInfo)) {
                newListInfo = { ...listInfo, [formData.listTitle]: [] };
              }
            } else if (modalFormType === 'addNewCard') {
              listInfo[selectedList].push({
                cardTitle: formData.cardTitle,
                cardDesc: formData.cardDesc,
                cardCreationTime: new Date().getTime(),
              });
              newListInfo = listInfo;
            }
            setListInfo(newListInfo);
            localStorage.setItem('listInfo', JSON.stringify(newListInfo));
            // console.log({ formData, newListInfo });
          }
          resetFormData({ saveFormData });
          setShowNewModal(false);
        }}
      />
    );
  })
);

const DialogBox = ({
  title,
  additionalText,
  content,
  actions,
  formData,
  saveFormData,
  open,
  setShowNewModal,
  setListInfo,
  modalFormType,
  selectedList,
}) => (
  <Dialog open={open} onClose={() => setShowNewModal(false)} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {!isEmpty(additionalText) && (
        <DialogContentText>
          {additionalText}
        </DialogContentText>
      )}
      {content}
    </DialogContent>
    {!isEmpty(actions)
      && (
      <DialogActions>
        {renderActionButtons({
          actions,
          setShowNewModal,
          formData,
          saveFormData,
          setListInfo,
          modalFormType,
          selectedList,
        })}
      </DialogActions>
      )}
  </Dialog>
);

DialogBox.propTypes = {
  title: PropTypes.string,
  additionalText: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.number]),
  actions: PropTypes.shape({}),
  formData: PropTypes.shape({
    listTitle: PropTypes.string,
  }),
  saveFormData: PropTypes.func,
  open: PropTypes.bool,
  setShowNewModal: PropTypes.func,
  setListInfo: PropTypes.func,
  modalFormType: PropTypes.string,
  selectedList: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DialogBox.defaultProps = {
  title: 'Dialog Box Title',
  additionalText: '',
  content: null,
  actions: {},
  formData: { listTitle: '' },
  saveFormData: () => {},
  open: false,
  setShowNewModal: () => {},
  setListInfo: () => {},
  modalFormType: '',
  selectedList: null,
};

export default DialogBox;
