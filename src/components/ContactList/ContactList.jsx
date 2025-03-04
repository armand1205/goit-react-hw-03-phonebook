import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const ContactList = ({ contacts, del }) => {
  const deleteId = Id => {
    del(Id);
  };

  const createList = () => {
    return contacts.map(contact => (
      <li key={uuidv4()} id={contact.id}>
        {`${contact.name}: ${contact.number}`}
        <button data-id={contact.id} onClick={() => deleteId(contact.id)}>
          Delete
        </button>
      </li>
    ));
  };

  return <ul>{createList()}</ul>;
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  del: PropTypes.func.isRequired,
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
