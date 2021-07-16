import React from 'react';
import { makeStyles, TextField } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { dialogFormFields } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const DialogForm = ({ modalFormType, saveFormData, formData }) => {
  const classes = useStyles();
  const renderFormFields = () => (
    dialogFormFields[modalFormType].inputFields.map(({
      required, id, label, placeholder, name, key,
    }) => (
      <TextField
        key={key}
        required={required}
        id={id}
        label={label}
        placeholder={placeholder}
        onChange={({ target: { value } }) => {
          const formDataCopy = { ...formData };
          formDataCopy[name] = value;
          saveFormData(formDataCopy);
        }}
      />
    ))
  );

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <>
        {renderFormFields()}
      </>
    </form>
  );
};

DialogForm.propTypes = {
  modalFormType: PropTypes.string,
  formData: PropTypes.shape({
    listTitle: PropTypes.string,
  }),
  saveFormData: PropTypes.func,
};

DialogForm.defaultProps = {
  modalFormType: '',
  formData: { listTitle: '' },
  saveFormData: () => {},
};

export default DialogForm;
