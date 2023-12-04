import React, { useState } from 'react';
import axios from 'axios';

const CustomerServiceForm = ({ user, fetchRequests }) => {
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');

  const submitRequest = async () => {
    try {
      await axios.post(
        '/customer-service/submit',
        { category, comments },
        { headers: { Authorization: `Bearer ${user?.tokenId}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div>
      <h2>Customer Service Form</h2>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <br />
      <label>
        Comments:
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
      </label>
      <br />
      <button onClick={submitRequest}>Submit Request</button>
    </div>
  );
};

export default CustomerServiceForm;
