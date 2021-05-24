# My Franchise


## Features

- Use the admin portal to add sellers or remove
- User state management with authentication
- Add products using seller platform
- Check the available products
- Add new products or delete existing products


## Tech

Tech which is used to achieve this:

- ReactJS 
- Django
- SQLite
- Material UI



## Setup Instructions

[Node.js](https://nodejs.org/) v15.6 and [Python](https://https://www.python.org//) v3.7 is used for this project.

Install the dependencies and start the server.

```sh
pip install pipenv
cd myfranchise
pipenv shell
pipenv install
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
`Django Admin will be accessible at 127.0.0.1:8000`

For Admin Portal...
make sure present working directory is `myfranchise`
```sh
cd adminportal
npm install
npm start
```
`Admin Portal will be accessible at 127.0.0.1:3333`

For Seller Portal...
make sure present working directory is `myfranchise`
```sh
cd sellerportal
npm install
npm start
```
`Seller Portal will be accessible at 127.0.0.1:3000`

## Using the Portals

### Admin Portal

- User must be superuser to login into this portal.
- Use the email and password used while creating superuser.
- All the available sellers will be shown on Dashboard.
- Use the `Add Seller` button to add new sellers to platform.
- Use the `Delete` icon to remove the seller.
- Use `Log Out` option on top of Dashboard to logout.

### Seller Portal

- Any user can use this portal including superuser.
- Use the email and password used while creating seller.
- All the products will be shown on Dashboard.
- Seller can use the `Sell` button to add sell product.
- Use the `Delete` icon to delete the product.
- Use `Log Out` option on top of Dashboard to logout.

