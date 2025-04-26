# CRUD Application with React, Express, and MongoDB
## Project Description

This project is a full-stack CRUD (Create, Read, Update, Delete) application with React as the frontend, Express as the backend, and MongoDB as the database. The project allows users to login, register, add users, view all users, edit users, and delete users. The application also includes user authentication with JWT (JSON Web Tokens) to secure user-specific operations.

## How the buttons work:
#### Login/Register:

The app opens at the authentication page and allows users to either login if they have an account or register a new account.

If the user clicks on **"Already have an account? Login"**, then email, password fields are shown to login.

If the user clicks on **"Don't have an account? Register"**, then all 6 mandatory fields {idUSer, name, email, password, height and colorGroup[White/ Black/ Green/ Blue/ Red valid]} are displayed for registration.

#### Add User:

Users can add a new user by clicking on the "Add User" button, which opens a form to input the user's details {idUSer, name, email, password, height and colorGroup[White/ Black/ Green/ Blue/ Red valid]} and works similarly as registration.

After the user enters the details and submits the form, the data is sent to the backend to add the user to the MongoDB database.

#### Display All Users:/ Hide Users:

A table displays all users fetched from the backend. Each user is displayed with their details {idUSer, name, email, height and colorGroup[White/ Black/ Green/ Blue/ Red valid]} with ac "Action" field where, they have options to edit or delete.

Once **Display All Users** clicked, button changes to **Hide Users** which being clicked, closes/hides the table and button changes to **Display All Users**.

#### Logout:

The **Logout** button logs out the user by clearing the token from localStorage and redirecting to the login page.

#### Edit User (Update User, Cancel):

The **Edit** button allows the user to update their information. It opens a form where the user can change their name, email, etc.

The **Update** button replaces the **Add User** button and updates all field and refreshes the list of users displayed; but **"idUser" and "password" can't be updated**; **Updating email field will prompt the user to Login again**. The **Cancel** button closes the form without making changes.

#### Delete User:

The **Delete** button allows a user to be removed from the database. The app sends a request to the backend to delete the user and refreshes the list of users displayed.
**But, a user who is logged in already, can't delete his/her own row from the database, and if still tries, is prompted to Login again.**



## Project Requirements and File Structure
#### 1. Backend (Express & MongoDB)

**File: server.js**

Backend properly server setup with mongodb using **backend> config> db.js, backend> .env, server.js** with **MONGO_URI** and **JWT_SECRET keys**.

**File: models/User.model.js**

Defines the User model using Mongoose for schema-based data interaction with MongoDB having 6 fields  {idUSer, name, email, height and colorGroup[White/ Black/ Green/ Blue/ Red valid]}

**File: controllers/user.controller.js, routes/user.routes.js**

APIs (GET(all users), GET(user by idUser), POST(register), POST(login), PUT(update users), DELETE(delete users) correctly defined and JWT token properly used; which are routed correctly.

**File: middleware/authMiddleware.js**

The **JWT token is verified, bearer_tokens are checked and authorization headers are received** from here.

#### 2. Frontend (ReactJS)

**File: src/components/Users.jsx**

1. Displays all users in a table format.
2. Includes buttons to add a user, edit a user, and delete a user.
3. Fetches users from the backend on mount and handles state changes.
4. It takes user-form for updating users from **src/components/UserForm.jsx**

**File: src/api.js**

1. Contains utility functions to handle API requests using Axios.
2. Functions like getUsers, addUser, deleteUser, and updateUser.

**File: src/App.jsx**

1. Main entry component for the application, routing to different pages (Login, Register, Users, etc.); we also have **src/index.jsx, frontend/index.html**.
2. Contains the logic for authenticating the user with JWT.
3. **src/context/AuthContext.js** manages login, logout, JWT token storage and handles overall authentication state. But main format for authentication page is in **src/pages/Auth.jsx**

#### NOTE:
Table structured in **src/components/Users.jsx** displayes users in a table and also, above it has **Add User** and corresponding form, and within table, has 2 buttons for each row:
1. **Edit User** that redirects to a form for updating user with **Update User** button; that form is defined in **src/components/UserForm.jsx** and imported in Users.jsx.
2. **Delete User** that deletes the related row from mongodb and refreshes the updated table; but **an already logged_in user cannot delete his/her own account from the table and if tries, prompted to Login again.**



## Installation Guide
1. **Clone the repository**
   - Create a folder naming it, e.g. dbserver
   - Right click and open in terminal where, clone the project:
   - 
  ```bash
   git clone https://github.com/akilahjahin/210041252_Lab06_WEB_API-JWT.git
   ```
  - To open the code with VSCode, after successfully cloning, write:
  ```bash
   code .
   ```

2. You can trust the authors and you have to run backend, frontend individually.



## Project Run Commands
1. **Backend:**
   Open a new terminal, navigate to backend and install dependencies before running
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend:**
  Open a new terminal, navigate to frontend and install dependencies before running
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
#### NOTE:
  1. Backend will be running at **localhost:4000** and
  2. Frontend will be running at **localhost:5173** and open in *localhost:5173/auth*, initially



## Project's Useful Datasets and Structures

**MongoDB was correctly setup, MONGO_URI in .env, and the schema for future registrations has been defined in backend/models/User.model.js which has the structure:**
  ```bash
   const User = new Schema({
      idUser: { type: Number, required: true, unique: true },
      name: { type: String, require: true },
      email: { type: String, require: true },
      password: { type: String, require: true },
      height: { type: Number },
      colorGroup: { type: String, enum: ["Red", "Black", "Green", "Blue", "White"] },
  });
   ```
**Some predefined dataset in my MongoDB for easily logging in (you only require email and password)**
```bash
    name : [ email, password ]
    Faraz Hossain : [ farain@gmail.com, 123 ]
    Anika Tabassum : [ anika@gmail.com, 234 ]
    Bushra Haque : [ bush@gmail.com, 345 ]
    Toma Mehrin : [ tomin@gmail.com, 456 ]
    Imran Khalid : [ imran@gmail.com, 567 ]
    Sumaiya Tausif : [ sumif@gmail.com, 678 ]
    Rebecca Rumana : [ rebna@gmail.com, 789 ]
   ```
**My related MongoDB database has from Atlas:**
**Database: USERS, Collection: users**


## Drive Link having useful VIDEOS showing How APP runs:
https://drive.google.com/drive/folders/1Aejx1qvOAaKR1ye5aQqylCrQG20mJXXO?usp=sharing
