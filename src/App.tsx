
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

  // Search and Sorting States
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");

  // Add and Update Contact
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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

  // Search Contacts
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search)
    );
  });

  // Sort Contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

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

      {/* Search and Sorting */}

      <div className="search-section">

        <input
          type="text"
          className="search-input"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="A-Z">Name A-Z</option>
          <option value="Z-A">Name Z-A</option>
        </select>

      </div>

      <h2>Total Contacts: {contacts.length}</h2>

      <div className="contact-list">

        {sortedContacts.length === 0 ? (

          <p className="empty">
            {contacts.length === 0
              ? "No Contacts Added Yet!"
              : "No matching contacts"}
          </p>

        ) : (

          sortedContacts.map((contact) => (

            <div className="contact-card" key={contact.id}>

              <h3>{contact.name}</h3>

              <p>Phone: {contact.phone}</p>

              <p>Email: {contact.email}</p>

              <div className="buttons">

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>

                <button
                  type="button"
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
