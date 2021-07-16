export const dialogFormFields = {
  addNewList: {
    dialogInfo: {
      title: 'Create a New List',
      additionalText: 'Please fill in the mandatory fields for creatng a new list',
      actions: {
        negative: {
          text: 'CANCEL',
          color: 'secondary',
          variant: 'outlined',
          key: 'negative',
        },
        positive: {
          text: 'CREATE',
          color: 'primary',
          variant: 'contained',
          key: 'positive',
        },
      },
    },
    inputFields: [{
      required: true,
      id: 'standard-required',
      label: 'Title',
      placeholder: 'Title of the List',
      name: 'listTitle',
      key: 'titleField',
    }],
  },
  addNewCard: {
    dialogInfo: {
      title: 'Create a New Card',
      additionalText: 'Please fill in the mandatory fields for creatng a new card',
      actions: {
        negative: {
          text: 'CANCEL',
          color: 'secondary',
          variant: 'outlined',
          key: 'negative',
        },
        positive: {
          text: 'ADD',
          color: 'primary',
          variant: 'contained',
          key: 'positive',
        },
      },
    },
    inputFields: [{
      required: true,
      id: 'standard-required',
      label: 'Title',
      placeholder: 'Title of the Card',
      name: 'cardTitle',
      key: 'titleFieldCard',
    }, {
      required: true,
      id: 'standard-required',
      label: 'Description',
      placeholder: 'Description of the Card',
      name: 'cardDesc',
      key: 'descFieldCard',
    }],
  },
};

export const a = {};
