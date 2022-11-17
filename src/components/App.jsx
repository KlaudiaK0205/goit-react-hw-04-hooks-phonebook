import React from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import { PhonebookList } from './PhonebookList/PhonebookList';
import { Filter } from './Filter/Filter';
import style from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  add = ({ name, number }) => {
    const toLowerCase = name.toLowerCase();
    const contacts = this.state.contacts;
    let nameOntheList = false;

    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === toLowerCase) {
        alert(`${contact.name} is already in contacts`);
        nameOntheList = true;
      }
    });

    if (nameOntheList) return;

    this.setState(prevState => ({
      contacts: prevState.contacts.concat(newContact),
    }));
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterItems = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit={this.add} />
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <PhonebookList
          contacts={this.filterItems()}
          toDelete={this.deleteContact}
        />
      </div>
    );
  }

  deleteContact = idToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };

// localStorage

  componentDidMount() {
    const contactsSaved = localStorage.getItem("contacts");
      if (contactsSaved) {
        this.setState ({ contacts: JSON.parse(contactsSaved) });
      }
    }
  
  componentDidUpdate(prevProps, prevState) {
      if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
      }
    }
}

export default App;