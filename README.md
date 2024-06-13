# Airbean-API

---

## Project Description

Exam assignment for the Backend with NodeJs course. The task consists of two parts:

### Group Work Part 1

The first part is done in a group. The task is to create an API for the Airbean web app where users can order coffee. The following functionalities are included:

- Create a customer account
- Log in as a customer
- View company information
- View all products available in the menu
- Add products from the menu to a shopping cart
- View the contents of the shopping cart
- Remove a product from the shopping cart
- Remove shopping cart
- Place an order as registered customer
- Place an order as guest
- View previous orders

### Individual Work Part 2

In the individual part of the Airbean API, the `admin` should be able to do the following:

- Create an admin account
- Log in as admin
- View all customers in the database
- Remove products from the menu
- Modify existing menu items
- Create offers

---

## Installation

To get started, make sure you have [Node.js](https://nodejs.org/en/) installed on your computer. You can check if Node.js is installed by running `node -v` in your terminal.

1. Clone this repository to your local machine.
2. Navigate to the repository in your terminal.
3. Install dependencies by running `npm install` in the terminal.
4. Start the server by running `npm run dev` in the terminal.

Base URL: `http://localhost:8000` or `https://localhost:{PORT}` if PORT is defined in your `.env`.

Make API calls using your preferred application (Postman, Insomnia, etc.).

---

### Customer Part 1

#### Create customer account

##### POST - /customer/register

###### Request

```
    {
        "username": "ploo",
        "password": "password",
    }
```

###### Response

```
{
    "message": "User registered successfully",
    "user": {
        "username": "ploo",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "_id": "g8svUcLCUjXoYq8p"
    }
}
```

###### Error

```
    { "error": "Username already in use" }
```

---

#### Login as registered customer

##### POST - /customer/login

###### Request

```
    {
        "username": "ploo",
        "password": "password",
    }
```

###### Response

```
{
    "message": "Login successfully",
    "user": {
        "username": "ploo",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "_id": "g8svUcLCUjXoYq8p"
    }
}
```

###### Error

```
    { "error": "Invalid username or password" }
```

---

#### View company information

##### GET - /info

###### Response

```
{
    "info": "AirBean levererar kaffe med hjälp av drönare direkt till din dörr via en smidig app. Vi kombinerar avancerad teknologi med en passion för kaffe för en unik och effektiv upplevelse. Våra eldrivna drönare är energieffektiva och minskar utsläppen jämfört med traditionella leveransfordon. Optimerade leveransrutter minskar dessutom onödiga flygningar. Vi erbjuder högkvalitativt kaffe från certifierade ekologiska och fair trade-odlare. Detta säkerställer en etisk produktion och en överlägsen smak i varje kopp. Välj AirBean för en hållbar och bekväm kaffeupplevelse med gott samvete."
}
```

---

```
- View all products available in the menu
- Add products from the menu to a shopping cart
- View the contents of the shopping cart
- Remove a product from the shopping cart
- Remove shopping cart
- Place an order as registered customer
- Place an order as guest
- View previous orders
```
