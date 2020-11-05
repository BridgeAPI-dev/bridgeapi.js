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
    status: 200 Ok
    user: {
      email: 'myemail@gmail.com'
      notifications: {
        emailOnEvents: true
      }
    }

  title: Update user info
  url: '/users/:id'
  method: PATCH/PUT
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
    status: 202 Accepted
    message: 'Success'

BridgesMenu:
  title: Get bridge titles
  url: '/bridge_titles'
  method: GET
  returns:
    status: 200 Ok
    bridges: [
      'bridge 1'
      'bridge 2'
      'bridge 3'
    ]

Editor/New:
  title: Create Bridge
  url: '/bridges'
  method: POST
  sends:
    bridge: {
      outboundURL: 'https://slack.com/new_message/934782'
      method: 'POST'
      retries: '3'
      delay: '0'
      headers: [
        { key: 'X-API-KEY', value: '$env.API_KEY' }
      ]
      envVars: [
        { key: 'API_KEY', value: '1234567890APIKEY' }
      ]
    }
  returns:
    status: 201 Created
    message: 'Success'

Editor/[slug]:
  title: Get Page Inputs
  url: '/bridges/:slug'
  method: GET
  returns:
    status: 200 Ok
    bridge: {
      outboundURL: 'https://slack.com/new_message/934782'
      method: 'POST'
      retries: '3'
      delay: '0'
      headers: [
        { key: 'X-API-KEY', value: '$env.API_KEY' }
      ]
      envVars: [
        { key: 'API_KEY', value: 'XXXXXXXXXXXXXXX' }
      ]
    }

  title: Update Bridge
  url: '/bridges'
  method: PATCH/PUT
  sends:
    bridge: {
      outboundURL: 'https://slack.com/new_message/934782'
      method: 'POST'
      retries: '3'
      delay: '0'
      headers: [
        { key: 'X-API-KEY', value: '$env.API_KEY' }
      ]
      envVars: [
        { key: 'API_KEY', value: '1234567890APIKEY' }
      ]
    } 
  returns:
    status: 202 Accepted
    Message: 'Updated'
  

CodeMirror:
  title: Get Editor Code
  urls: [
    '/bridges/:slug/code'
    '/bridges/:slug/test_code'
    '/bridges/:slug/lastest_request'
  ]
  method: GET
  returns:
    status: 200 Ok
    code: "I am a json payload of the code"

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
    status: 200 Ok
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