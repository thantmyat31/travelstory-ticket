# Development flow

### Authentication:

* [x] Create Server
* [x] Add auth router
* [x] Create user with POST /api/signup
    * [x] validate require fields
    * [x] Check if email is unique
    * [x] Email verification
        * [x] Setup @sendgrid/mail
        * [x] Send Email verification mail with token
    * [x] Account activation with POST /api/account-activation
        * [x] Verify the token with JWT
        * [x] Decode the token to get user information
    * [x] hash password with cryto
    * [x] insert into db

* [x] Login user with POST /api/signin
    * [x] check if email in db
        * [x] compare password with hashed password in db
        * [x] Create and sign a JWT
            * [x] Respond with JWT

* [x] Create login form; show errors; redirect;
    * [x] Validate required fields

* [x] Create sign up form; show errors; redirect;
    * [x] Validate required fields

### Authorization:

* [x] Visitors can only see the homepage
    * [x] prevent with isAuth and authenticate and AuthRoute
    * [x] create requireSignin middlewares
        * [x] Validate JWT in header
            * [x] set req.user to be JWT payload
        * [x] send an unauthorized error message

### Installation and running local

- Update both `./client/.env` and `./server/.env` files  with actual data.
- In root directory:

```bash
cd server && npm install
```

```bash
cd ..
cd client && npm install
```

```bash
cd .. 
cd server && npm run dev
```

<br><br><br>

# Guide to run with docker

- Clone the repo to local environment.
- Update both `./client/.env` and `./server/.env` files  with actual data.
- Open terminal and change directory into downloaded folder (ROOT_DIRECTORY). Same destination as docker-compose.yml file.

```bash
$ cd ROOT_DIRECTORY
```

- Then, run the docker command as below.

```bash
$ docker-compose up -d --build
```

- After completed to build the docker images/container, open the webpage `http://localhost:3000` in browser.
- Register with actual email address.
- Complete the email verification and account activation process.
- Open mongo shell in docker container

```bash
# list all running instances. YOUR_MONGO_CONTAINER container should be running.
$ docker ps -a
# execute mongo command in the YOUR_MONGO_CONTAINER directly in your shell
$ docker exec -it YOUR_MONGO_CONTAINER mongo
```

```bash
# Find and change the role/permission of your recent account
> show dbs

> use YOUR_DB_NAME

> db.users.find()

>  db.users.findOneAndUpdate({"displayName": YOUR_USER_NAME}, {$set: {"role": "admin"}})
```

- Now, you can play around with the admin account.
<br><br><br>


## Deploy on Heroku

* [x] Deployed on Heroku. Visit [here](https://travelstory-ticket.herokuapp.com/).
* Test user account

| Role  | Email | Password |
|:-----:|:----------------:|:------:|
| Admin | admin@email.com | password |
| Agency | agency@email.com | password |
| Subscriber | subscriber@email.com | password |