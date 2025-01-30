# DotnetNextIdentity

Example Next.js with a .NET API application

Both apps are served from the same domain. There's a rewrite rule from $APP_URL/api/*path to $API_URL/*path.

The authentication relies on ASP.NET Identity's secure cookie implementation, which utilizes SameSite, HttpOnly, and Secure flags.

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
