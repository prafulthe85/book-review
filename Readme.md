# 📘 Book Review API

A RESTful API built using Node.js, Express, and MongoDB that allows users to sign up, log in, manage books, write reviews, and search through the collection.

## 🚀 Features

- User Signup & Login with JWT Authentication
- Add a new book and Get all Books (with filtering & pagination)
- Submit, Update, Delete Reviews
- Get book details including average rating & paginated reviews
- Search books by title or author (partial & case-insensitive)

## 🛠️ Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Auth: JWT (JSON Web Token)
- Tools: dotenv, bcryptjs, Postman

## 📁 Folder Structure:

├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── bookController.js
│ └── reviewController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ ├── Book.js
│ └── Review.js
├── routes/
│ ├── authRoutes.js
│ ├── bookRoutes.js
│ └── reviewRoutes.js
├── .env
├── server.js
└── README.md

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/book-review-api.git
   cd book-review-api
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
4. Configure .env
   - Create a .env file at root and add:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/book-review-db
   JWT_SECRET=your_jwt_secret
   ```
6. Start the server:
   ```bash
   npm run dev
   ```

# Sample CURL requests are below

## Signup
```bash
curl --location 'http://localhost:5000/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Praful 2",
"email": "praful2@example.com",
"password": "test12345"
}
'
```

## Login
```bash
curl --location 'http://localhost:5000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "praful2@example.com",
"password": "test12345"
}
'
```

## Add Book (replace <token>)
```bash
curl --location 'http://localhost:5000/api/books' \
--header 'Authorization: Bearer <your_token>' \
--header 'Content-Type: application/json' \
--data '{
"title": "Atomic Habits 5",
"author": "Praful gupta",
"genre": "Fiction",
"publishedYear": 2023
}'
```
## Get all books
```bash
curl --location 'http://localhost:5000/api/books?page=2&limit=5'
```
## Get all books with author 7 genre filter
```bash
curl --location 'http://localhost:5000/api/books?page=1&limit=5&author=James&genre=Self'
```
## Add book review
```bash
curl --location 'http://localhost:5000/api/books/684390d0a5bf865c6dcaffa5/reviews' \
--header 'Authorization: Bearer <your-tokken>' \
--header 'Content-Type: application/json' \
--data '{
"rating": 5,
"comment": "Amazing read!"
}'
```
## update your review
```bash
curl --location --request PUT 'http://localhost:5000/api/reviews/6843927ba5bf865c6dcaffb4' \
--header 'Authorization: Bearer <your-token>' \
--header 'Content-Type: application/json' \
--data '{
"rating": 5,
"comment": "veryr very good read!"
}'
```
## Delete your review
```bash
curl --location --request DELETE 'http://localhost:5000/api/reviews/6843927ba5bf865c6dcaffb4' \
--data ''
```
## search book
```bash
curl --location 'http://localhost:5000/api/search?query=jame' \
--data ''
```
# 🧪 Example Workflow
- Sign up a user
- Log in → copy token
- Add a book using that token
- Get the book ID
- Post a review using the book ID
- Get that book to see rating + reviews
- Update or delete the review
- Try filters and search

# 🧠 Design Decisions
- JWT-based Authentication: Lightweight and stateless for scalability.
- Pagination & Filtering: Efficient for large datasets.
- Modular Code Structure: Easy to maintain and scale.
- Regex Search: Case-insensitive & partial match supported.

# ER Diagram

- Schema
![image](https://github.com/user-attachments/assets/6cf02044-fe2c-46f8-bfc0-dacd7f297ab8)

- SignUp/loginflow (Drwa.io)
![image](https://github.com/user-attachments/assets/8a816d23-625b-402b-a5d3-10084eccd730)

# 🗂️ Database Schema
🧑‍💻 User
```bash
{
"name": "String",
"email": "String (unique)",
"password": "Hashed"
}
```
📚 Book
```bash
{
"title": "String",
"author": "String",
"genre": "String",
"publishedYear": "Number"
}
```
✍️ Review
```bash
{
"book": "ObjectId (Book)",
"user": "ObjectId (User)",
"rating": "Number (1 to 5)",
"comment": "String"
}
```
