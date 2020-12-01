## Authentication:

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

In root directory:

```bash
npm install
```

```bash
cd client && npm install
```

```bash
cd .. && npm run dev
```