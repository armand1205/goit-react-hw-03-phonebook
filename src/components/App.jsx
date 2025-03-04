import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    // Load contacts from localStorage if available
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts
      ? JSON.parse(savedContacts)
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Save contacts to localStorage whenever they change
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    repeatControl(data);
  };

  const repeatControl = data => {
    let nameArray = contacts.map(cur => cur.name);
    if (!nameArray.includes(data.name)) {
      let arrayCont = [
        ...contacts,
        { id: uuidv4(), name: data.name, number: data.number },
      ];
      setContacts(arrayCont);
    } else {
      alert('Contact already exists in the phonebook!!!');
    }
  };

  const elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  const deleteContactFromContactList = idContact => {
    let newArrAfterDel = elementDelete(contacts, idContact);
    setContacts([...newArrAfterDel]);
  };

  const setFilterToState = filterData => {
    setFilter(filterData);
  };

  const filterArr = fArr => {
    let newArr = fArr.filter(cur => cur.name.toUpperCase().includes(filter));
    return newArr;
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmitData={formSubmitHandler} />
      <h1>Contacts</h1>
      <Filter setFilterToState={setFilterToState} />
      <ContactList
        contacts={filterArr(contacts)}
        del={deleteContactFromContactList}
      />
    </div>
  );
};

export default App;
