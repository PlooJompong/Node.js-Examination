# Airbean-API

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
- View order details

### Individual Work Part 2

In the individual part of the Airbean API, the `admin` should be able to do the following:

- Create an admin account
- Log in as admin
- View all customers in the database
- Remove products from the menu
- Modify existing menu items
- Create offers

## Installation

To get started, make sure you have [Node.js](https://nodejs.org/en/) installed on your computer. You can check if Node.js is installed by running `node -v` in your terminal.

1. Clone this repository to your local machine.
2. Navigate to the repository in your terminal.
3. Install dependencies by running `npm install` in the terminal.
4. Start the server by running `npm run dev` in the terminal.

Base URL: `http://localhost:8000` or `https://localhost:{PORT}` if PORT is defined in your `.env`.

Make API calls using your preferred application (Postman, Insomnia, etc.).

### Customer Part 1

#### Create customer account

##### POST - /customer/register

###### Request

```
    {
        "username": "ploo",
        "password": "password"
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

#### Login as registered customer

##### POST - /customer/login

###### Request

```
{
    "username": "ploo", // required
    "password": "password" // required
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

#### View company information

##### GET - /info

###### Response

```
{
    "info": "AirBean levererar kaffe med hjälp av drönare direkt till din dörr via en smidig app. Vi kombinerar avancerad teknologi med en passion för kaffe för en unik och effektiv upplevelse. Våra eldrivna drönare är energieffektiva och minskar utsläppen jämfört med traditionella leveransfordon. Optimerade leveransrutter minskar dessutom onödiga flygningar. Vi erbjuder högkvalitativt kaffe från certifierade ekologiska och fair trade-odlare. Detta säkerställer en etisk produktion och en överlägsen smak i varje kopp. Välj AirBean för en hållbar och bekväm kaffeupplevelse med gott samvete."
}
```

#### View all products available in the menu

##### GET - /info/menu

###### Response

```
[
    {
        "title": "Cortado",
        "desc": "En cortado med lika delar espresso och varm mjölk.",
        "price": 33,
        "createAt": "2024-06-1 14:21:10",
        "modifiedAt": "",
        "_id": "0Gu3mPAbONk1hy4P"
    },
    {
        "title": "Flat White",
        "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
        "price": 46,
        "createAt": "2024-06-1 14:21:10",
        "modifiedAt": "",
        "_id": "3IBqddqDtbAtIi2E"
    },
    [...]
]
```

#### Add products from the menu to a shopping cart

##### POST - /cart

###### Request

```
{
    "product": "0Gu3mPAbONk1hy4P", // required
    "cartID": "", // optinal, if not provided a new cart will be created
    "customerID": "", // optional, if not provided a new customer will be created
    "quantity": 1 // optional, 1 if not provided. Must be intenger
}
```

###### Response

```
{
    "customerID": "",
    "product": [
        {
            "title": "Cortado",
            "desc": "En cortado med lika delar espresso och varm mjölk.",
            "price": 33,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "0Gu3mPAbONk1hy4P",
            "quantity": 1
        }
    ],
    "_id": "xTckju7ymnaDn3J6",
    "instructions": "cartID would've been saved to session/cookie to be included in the next call"
}
```

#### View the contents of the shopping cart

##### GET - /cart/:cartID

###### Response

```
{
    "customerID": "g8svUcLCUjXoYq8p",
    "product": [
        {
            "title": "Mocha",
            "desc": "En söt mocha med choklad och espresso.",
            "price": 50,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "6ymMjHWMpLGChmJ6",
            "quantity": 1
        },
        {
            "title": "Flat White",
            "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
            "price": 46,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "3IBqddqDtbAtIi2E",
            "quantity": 2
        },
        {
            "title": "Cortado",
            "desc": "En cortado med lika delar espresso och varm mjölk.",
            "price": 33,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "0Gu3mPAbONk1hy4P",
            "quantity": 3
        }
    ],
    "_id": "rVqdc2XBTSpbPrRW",
    "totalPrice": 241
}
```

#### Remove a product from the shopping cart

- Must be logged in as customer to remove item from cart

##### DELETE - /cart/item

###### Request

```
{
    "cartID": "rVqdc2XBTSpbPrRW", // required
    "productID" : "0Gu3mPAbONk1hy4P" // required
}
```

###### Response

```
{
    "message": "Product rVqdc2XBTSpbPrRW removed from cart",
    "updatedCart": [
        {
            "title": "Mocha",
            "desc": "En söt mocha med choklad och espresso.",
            "price": 50,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "6ymMjHWMpLGChmJ6",
            "quantity": 1
        },
        {
            "title": "Flat White",
            "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
            "price": 46,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "3IBqddqDtbAtIi2E",
            "quantity": 2
        }
    ]
}
```

#### Remove shopping cart

- Must be logged in as customer to remove the cart

##### DELETE - /cart/

###### Request

```
{
    "cartID": "ZH3zJ2P7ofbVRKyl" // required
}
```

###### Response

```
{
    "message": "Product rVqdc2XBTSpbPrRW removed from cart",
    "updatedCart": [
        {
            "title": "Mocha",
            "desc": "En söt mocha med choklad och espresso.",
            "price": 50,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "6ymMjHWMpLGChmJ6",
            "quantity": 1
        },
        {
            "title": "Flat White",
            "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
            "price": 46,
            "createAt": "2024-06-1 14:21:10",
            "modifiedAt": "",
            "_id": "3IBqddqDtbAtIi2E",
            "quantity": 2
        }
    ]
}
```

#### Place an order as registered customer

##### POST - /cart/order

###### Request

```
{
    "customerID": "g8svUcLCUjXoYq8p", // required
    "cartID": "rVqdc2XBTSpbPrRW", // required
    "discountID": "" // optional
}
```

###### Response

```
{
    "message": "Order placed successfully",
    "order": {
        "customerID": "g8svUcLCUjXoYq8p",
        "cartID": "rVqdc2XBTSpbPrRW",
        "cartProducts": [
            {
                "title": "Mocha",
                "desc": "En söt mocha med choklad och espresso.",
                "price": 50,
                "createAt": "2024-06-1 14:21:10",
                "modifiedAt": "",
                "_id": "6ymMjHWMpLGChmJ6",
                "quantity": 1
            },
            {
                "title": "Flat White",
                "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
                "price": 46,
                "createAt": "2024-06-1 14:21:10",
                "modifiedAt": "",
                "_id": "3IBqddqDtbAtIi2E",
                "quantity": 2
            }
        ],
        "orgPrice": 142,
        "discount": 0,
        "totalPrice": 142,
        "orderAt": "2024-06-14 13:16:42",
        "estimatedDelivery": "2024-06-14 13:36:42",
        "_id": "Zl6GhEUAklSQyKvV"
    }
}
```

#### Place an order as guest

##### POST - /cart/order

###### Request

```
{
    "cartID": "ZH3zJ2P7ofbVRKyl", // required
    "guestInfo": {
        "email": "guest@example.com", // required
        "phone": "0701234567" // required
    }
}
```

###### Response

```
{
    "message": "Order placed successfully",
    "order": {
        "customerID": "6XmXJPAOsw6Szah8",
        "cartID": "ZH3zJ2P7ofbVRKyl",
        "cartProducts": [
            {
                "title": "Cortado",
                "desc": "En cortado med lika delar espresso och varm mjölk.",
                "price": 33,
                "createAt": "2024-06-1 14:21:10",
                "modifiedAt": "",
                "_id": "0Gu3mPAbONk1hy4P",
                "quantity": 1
            },
        ],
        "orgPrice": 33,
        "discount": 0,
        "totalPrice": 33,
        "orderAt": "2024-06-14 13:22:11",
        "estimatedDelivery": "2024-06-14 13:42:11",
        "_id": "A52Oj7rVTFlb8jV9"
    }
}
```

#### View previous orders

- Must be logged in as customer to view previous orders

##### GET - /orders/:customerID

###### Response

```
{
    "orders": [
        {
            "customerID": "6XmXJPAOsw6Szah8",
            "cartID": "ZH3zJ2P7ofbVRKyl",
            "cartProducts": [
                {
                    "title": "Cortado",
                    "desc": "En cortado med lika delar espresso och varm mjölk.",
                    "price": 33,
                    "createAt": "2024-06-1 14:21:10",
                    "modifiedAt": "",
                    "_id": "0Gu3mPAbONk1hy4P",
                    "quantity": 1
                }
            ],
            "orgPrice": 33,
            "discount": 0,
            "totalPrice": 33,
            "orderAt": "2024-06-14 13:22:11",
            "estimatedDelivery": "2024-06-14 13:42:11",
            "_id": "A52Oj7rVTFlb8jV9"
        },
        {
            "customerID": "6XmXJPAOsw6Szah8",
            "cartID": "rVqdc2XBTSpbPrRW",
            "cartProducts": [
                {
                    "title": "Mocha",
                    "desc": "En söt mocha med choklad och espresso.",
                    "price": 50,
                    "createAt": "2024-06-1 14:21:10",
                    "modifiedAt": "",
                    "_id": "6ymMjHWMpLGChmJ6",
                    "quantity": 1
                },
                {
                    "title": "Flat White",
                    "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
                    "price": 46,
                    "createAt": "2024-06-1 14:21:10",
                    "modifiedAt": "",
                    "_id": "3IBqddqDtbAtIi2E",
                    "quantity": 2
                }
            ],
            "orgPrice": 142,
            "discount": 0,
            "totalPrice": 142,
            "orderAt": "2024-06-14 13:29:15",
            "estimatedDelivery": "2024-06-14 13:49:15",
            "_id": "xII2b4kcNxp3KenY"
        }
    ]
}
```

#### View order details

- Must be logged in as customer to view previous orders

##### GET - /orders/:orderID

###### Response

```
{
    "order": [
        {
            "customerID": "6XmXJPAOsw6Szah8",
            "cartID": "rVqdc2XBTSpbPrRW",
            "cartProducts": [
                {
                    "title": "Mocha",
                    "desc": "En söt mocha med choklad och espresso.",
                    "price": 50,
                    "createAt": "2024-06-1 14:21:10",
                    "modifiedAt": "",
                    "_id": "6ymMjHWMpLGChmJ6",
                    "quantity": 1
                },
                {
                    "title": "Flat White",
                    "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
                    "price": 46,
                    "createAt": "2024-06-1 14:21:10",
                    "modifiedAt": "",
                    "_id": "3IBqddqDtbAtIi2E",
                    "quantity": 2
                }
            ],
            "orgPrice": 142,
            "discount": 0,
            "totalPrice": 142,
            "orderAt": "2024-06-14 13:29:15",
            "estimatedDelivery": "2024-06-14 13:49:15",
            "_id": "xII2b4kcNxp3KenY"
        }
    ]
}
```
