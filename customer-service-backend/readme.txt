Navigate to the Backend Directory:
Install the deopendencies
Add your environment variables and set up the mongo uri key and google client key intercom access key
Run the backend server 
Install the frontend dependencies 
Setup environment variables
Run the frontend 



Access the Application:

Open your web browser and navigate to http://localhost:3000 (or your specified frontend URL).

Initiate Login:

Click on the "Login with Google" button.
This will redirect you to Google's login page.
Google OAuth Authorization:

Sign in with your Google account if not already logged in.
Authorize the application to access your Google account.
Return to Application:

After successful authorization, you will be redirected back to your application.
Welcome Message:

You should see a welcome message with your name indicating that you are now logged in.
Submit a Customer Service Request:

Fill out the customer service form with a category and additional comments.
Click the "Submit" button.
Real-time Update:

The submitted request should appear in the list of customer service requests in real-time, thanks to WebSocket integration.
Intercom Integration:

Behind the scenes, your backend should send the customer service request to Intercom.com using their API. You'll need to implement this logic in your backend.
Intercom.com should reflect the new customer service request in its dashboard.
View Customer Service Requests:

In your application, you can view the list of customer service requests, categorized and displayed appropriately.
