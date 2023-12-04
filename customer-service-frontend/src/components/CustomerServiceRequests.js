// CustomerServiceRequests.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Change the URL accordingly

const CustomerServiceRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/customer-service/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Listen for real-time updates
    socket.on('newRequest', (newRequest) => {
      setRequests((prevRequests) => [newRequest, ...prevRequests]);
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Customer Service Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>Category:</strong> {request.category} - <strong>Comments:</strong> {request.comments}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerServiceRequests;
