This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## API Requests
Account:
  title: Get user into
  url: '/users/account'
  method: GET
  returns:
    status: 200
    user: {
      email: 'myemail@gmail.com'
      notifications: {
        emailOnEvents: true
      }
    }

  title: Update user info
  url: '/users/:id'
  method: PUT
  sends:
    user: {
      email: 'myNEWemail@gmail.com'
      currentPassword: '...'
      newPassword: '...'
      confirmPassword: '...'
      notifications: {
        emailOnEvents: true
      }
    }
  returns:
    status: 201
    message: 'Success'

BridgesMenu:
  title: Get bridge titles
  url: '/bridge_titles'
  method: GET
  returns:
    status: 200
    bridges: [
      'bridge 1'
      'bridge 2'
      'bridge 3'
    ]

Dashboard:
  title: Get bridge data
  url: '/bridges'
  method: GET
  returns:
    status: 200
    bridges: [
      {
        title: 'test title 1'
        updatedAt: Date.now()
        lastRequest: Date.now()
        requests: 10
      }
    ]

Login:
  title: Log in user
  url: '/users/login'
  method: POST
  sends: 
    user: {
      email: 'myemail@email.com'
      password: '...'
    }
  returns:
    status: 200
    session: '10982-ah34ads7098-u212437' (JWT)

Signup:
  title: Sign up user
  url: '/users/signup'
  method: POST
  sends: 
    user: {
      email: 'myemail@email.com'
      password: '...'
      passwordConfirm: '...'
    }
  returns:
    status: 201
    message: 'Success - Please check email'