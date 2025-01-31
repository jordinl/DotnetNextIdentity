# DotnetNextIdentity

Example implementation of .NET Identity with a Next.js front-end and a .NET API.

Both apps are served from the same domain. There's a rewrite rule from $APP_URL/api/*path to $API_URL/*path.

The authentication relies on ASP.NET Identity's secure cookie implementation, which utilizes SameSite, HttpOnly, and Secure flags.

## Structure

This is a monorepo with the Next.js app in `/web` and the .NET API in `/Api`. For convenience I've placed the `package.json` at the root 
of the repo and added dependencies to run the monorepo there, such as `maildev` (to receive emails in development) or
`concurrently` to run next.js, the .net API and `maildev`.

## Features

* Registration
* Authentication
* Email confirmation
* Resending email confirmation
* Change email
* Change password
* Forgot password
* Reset password
* Authenticate with Google (if ClientID and ClientSecret are provided).

## Requirements

* .NET 9
* Node 22

## Installation

```
npm install
```

## Running the app

```
npm run dev
```

This will run:
* Next.js on [localhost:3000](http://localhost:3000)
* .NET API on [localhost:4000](http://localhost:4000) with Scalar on [localhost:4000/scalar](http://localhost:4000/scalar)
* Maildev on [localhost:5000](http://localhost:5000)
Next.js will run on

You won't be able to use the Google Authentication unless you've completed the next section.

## Configuring Google OAuth

Go to [console.cloud.google.com](https://console.cloud.google.com) and create new OAuth credentials, also add the following:

* Authorised JavaScript origins: http://localhost:3000
* Authorized Redirect URIs: http://localhost:3000/api/Oath/GoogleCallback

Copy the Client ID and Client Secret.

The Client Secret needs to be set on the .NET API with:

```
dotnet user-secrets set "Authentication:Google:ClientSecret" "set-your-client-secret" --project Api
```

The Client ID needs to be set on the Next.js project with:

```
echo "NEXT_PUBLIC_GOOGLE_CLIENT_ID=set-your-client-id" > web/.env.local
```

After that, restart the server and you should be able to log in with Google.

## Generation of Typescript API client

It's not necessary to run this part, since I've commited the generated code to the repo, but there's a command to
generate the Typescript API client:

```
npm run codegen
```

This will generate the OpenAPI specs from the .NET API using `Microsoft.AspNetCore.OpenApi` and then it will generate the
Typescript client using `@hey-api/openapi-ts`.

## Accessing the DB

If you're interested in seeing what records are created in the DB, you'll need to install a sqlite client and then run:

```
sqlite3 Api/app.db
```
