
import { useState } from "react";
import "./App.css";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  // Add and Update Contact
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === "" || phone === "" || email === "") {
      alert("Please fill all fields");
      return;
    }

    if (editId === null) {
      // Add new contact
      const newContact: Contact = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email
      };

      setContacts([...contacts, newContact]);
    } else {
      // Update contact
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === editId) {
          return {
            ...contact,
            name: name,
            phone: phone,
            email: email
          };
        }

        return contact;
      });

      setContacts(updatedContacts);
      setEditId(null);
    }

    // Clear form
    setName("");
    setPhone("");
    setEmail("");
  }

  // Edit Contact
  function handleEdit(contact: Contact) {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setEditId(contact.id);
  }

  // Delete Contact
  function handleDelete(id: number) {
    const updatedContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(updatedContacts);
  }

  return (
    <div className="container">

      <h1>Contact Directory</h1>
      <p className="subtitle">Manage Your Contacts</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          {editId === null ? "Add Contact" : "Update Contact"}
        </button>

      </form>

      <h2>All Contacts ({contacts.length})</h2>

      <div className="contact-list">

        {contacts.length === 0 ? (
          <p className="empty">No Contacts Added Yet!</p>
        ) : (

          contacts.map((contact) => (

            <div className="contact-card" key={contact.id}>

              <h3>{contact.name}</h3>

              <p>Phone: {contact.phone}</p>

              <p>Email: {contact.email}</p>

              <div className="buttons">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default App;
