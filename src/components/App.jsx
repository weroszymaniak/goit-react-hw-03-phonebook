import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };
  removeContact = contact => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contact),
      };
    });
    console.log('removin');
  };
  filterContact = e => {
    this.setState({ filter: e.target.value });
  };
  showContacts = () => {
    const { filter, contacts } = this.state;
    const unitedContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(unitedContact)
    );
  };
  render() {
    const { filter } = this.state;
    const searchedContacts = this.showContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onFilter={this.filterContact}></Filter>
        ) : (
          <div>Your phonebook is empty. Add first contact!</div>
        )}
        <ContactList
          contacts={searchedContacts}
          removeContact={this.removeContact}
        ></ContactList>
      </div>
    );
  }
}

export default App;
