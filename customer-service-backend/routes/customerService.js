const express = require('express');
const Intercom = require('intercom-client');
const passport = require('../config/passport');
const CustomerServiceRequest = require('../models/CustomerServiceRequest');

const router = express.Router();
const intercomClient = new Intercom.Client({ token: process.env.INTERCOM_ACCESS_TOKEN });

router.use(express.json());

// Middleware to check authentication before accessing customer service routes
router.use(passport.authenticate('google', { session: false }));

// Common function to handle creating a customer service request
async function createCustomerServiceRequest(req, res, category, comments) {
  try {
    // Create a new customer service request
    const newRequest = new CustomerServiceRequest({
      user: req.user._id,
      category,
      comments,
    });

    await newRequest.save();

    // Here, you would integrate with Intercom to create a conversation
    intercomClient.conversations.create({
      type: 'user',
      user: {
        id: req.user.id,
      },
      conversation_message: {
        body: `Category: ${category}\nComments: ${comments}`,
        author: {
          type: 'user',
        },
      },
    });

    res.status(200).json({ message: 'Customer service request submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// General Queries
router.post('/general-queries', async (req, res) => {
  const { comments } = req.body;
  await createCustomerServiceRequest(req, res, 'General Queries', comments);
});

// Product Features Queries
router.post('/product-features-queries', async (req, res) => {
  const { comments } = req.body;
  await createCustomerServiceRequest(req, res, 'Product Features Queries', comments);
});

// Product Pricing Queries
router.post('/product-pricing-queries', async (req, res) => {
  const { comments } = req.body;
  await createCustomerServiceRequest(req, res, 'Product Pricing Queries', comments);
});

// Product Feature Implementation Requests
router.post('/feature-implementation-requests', async (req, res) => {
  const { comments } = req.body;
  await createCustomerServiceRequest(req, res, 'Product Feature Implementation Requests', comments);
});

// Retrieve and display customer service requests for the specified category
router.get('/requests/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const requests = await CustomerServiceRequest.find({ category }).lean();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve and display customer service requests for General Queries
router.get('/requests/general-queries', async (req, res) => {
  try {
    const requests = await CustomerServiceRequest.find({ category: 'General Queries' }).lean();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve and display customer service requests for Product Features Queries
router.get('/requests/product-features-queries', async (req, res) => {
  try {
    const requests = await CustomerServiceRequest.find({ category: 'Product Features Queries' }).lean();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// customerService.js

// ... (existing code)

// Common function to handle creating a customer service request
async function createCustomerServiceRequest(req, res, category, comments) {
    try {
      // ... (existing code)
  
      // Emit a real-time update event
      io.emit('newRequest', newRequest);
  
      res.status(200).json({ message: 'Customer service request submitted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // ... (existing code)
  

// Retrieve and display customer service requests for Product Pricing Queries
router.get('/requests/product-pricing-queries', async (req, res) => {
  try {
    const requests = await CustomerServiceRequest.find({ category: 'Product Pricing Queries' }).lean();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve and display customer service requests for Product Feature Implementation Requests
router.get('/requests/feature-implementation-requests', async (req, res) => {
  try {
    const requests = await CustomerServiceRequest.find({
      category: 'Product Feature Implementation Requests',
    }).lean();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// After saving the new request in the database


module.exports = router;
