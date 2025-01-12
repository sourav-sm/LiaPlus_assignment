# Welcome to StackEdit!

This README provides instructions to set up and run the application locally. The project consists of:

1.  **Frontend**: React with Vite
    
2.  **Backend**: Express.js
    
3.  **Database**: MongoDB
## Prerequisites

Ensure you have the following installed on your system:

-   **Node.js**: [Download and install](https://nodejs.org/)
    
-   **npm**: Comes with Node.js (verify with `npm -v`)
    
-   **MongoDB**: [Download and install](https://www.mongodb.com/try/download/community)


# ## Clone the Repository
-    **git clone (https://github.com/sourav-sm/LiaPlus_assignment.git)**
-    **cd LiaPlus_assignment**




## 2. Setting Up the Backend

1.  Navigate to the backend directory:
    
    ```
    cd backend
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
3.  Create an `.env` file in the `backend` directory and configure the environment variables:
    
    ```
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/<your_database_name>
    JWT_SECRET=<your_jwt_secret>
    ```
    
4.  Start the backend server:
    
    ```
    npm run dev
    ```
    
    The backend should now be running on [http://localhost:4000](http://localhost:4000).


## 3. Setting Up the Frontend

1.  Navigate to the frontend directory:
    
    ```
    cd frontend
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
3.  Configure environment variables:
    
    Create a `.env` file in the `frontend` directory and add the following:
    
    ```
    VITE_API_BASE_URL=http://localhost:4000/api
    ```
    
4.  Start the frontend application:
    
    ```
    npm run dev
    ```
    
    The frontend should now be running on [http://localhost:5173](http://localhost:5173).


## 4. Setting Up the Database

1.  Ensure MongoDB is running on your local machine.
    
    -   Start the MongoDB server if it’s not already running. For example:
        
        ```
        mongod
        ```
        
2.  Use a MongoDB client (e.g., MongoDB Compass) to create a new database:
    
    -   Name the database as specified in the `MONGO_URI` in the backend `.env` file.
        

----------

## 5. Testing the Application

1.  Open the frontend in your browser: [http://localhost:5173](http://localhost:5173).
    
2.  Test user authentication by signing up and logging in.
    
3.  Verify data is stored in MongoDB.
