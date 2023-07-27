import {useEffect} from 'react'
import { useState } from 'react'
import ContactRow from "./ContactRow";

export default function ContactList( setSelectedContactId ) {   

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(
          `https://jsonplace-univclone.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        setContacts(result);
      } catch (error) {
        setError(error);
      }
    }
    fetchContacts();
  }, []);

    console.log(contacts)

  return ( 
    <table>
    <thead>
      <tr>
        <th colSpan="3">Contact List</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>Phone</td>
        <td>Email</td>
      </tr>
      {error ? (
        <tr>{error}</tr>
      ) : (
        contacts.map((contact) => {
          return (
            <ContactRow
              key={contact.id}
              contact={contact}
              setSelectedContactId={setSelectedContactId}
            />
          );
        })
      )}
    </tbody>
  </table>
);
}

