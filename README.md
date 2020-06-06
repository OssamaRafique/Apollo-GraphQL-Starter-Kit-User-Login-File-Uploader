<h1 align="center"> 🚀 Apollo GraphQL Starter Kit</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
    <img alt="Version" src="https://img.shields.io/badge/build-passing-brightgreen" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://ko-fi.com/ossamarafique" target="_blank">
    <img alt="Buy Me A Coffee" src="https://www.ko-fi.com/img/githubbutton_sm.svg" />
  </a>
  <a href="https://twitter.com/OssamaRafique" target="_blank">
    <img alt="Twitter: OssamaRafique" src="https://img.shields.io/twitter/follow/OssamaRafique.svg?style=social" />
  </a>
</p>

### 🏠 [Homepage](https://github.com/OssamaRafique/Apollo-GraphQL-Starter-Kit-User-Login-File-Uploader)

## Run the Project

Rename env.example to .env and fill in the details

```
PORT=3000
MongoDB_URL=
JWT_SECRET_KEY=
S3_ENABLED=Values "yes" or "no"
S3_ACCESS_KEY=
S3_SECRET=
S3_BUCKET=
```

```sh
npm install
```

```sh
node server.js
```

# GraphQL Schema

```sh
directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
) on FIELD_DEFINITION | OBJECT | INTERFACE
enum CacheControlScope {
  PUBLIC
  PRIVATE
}

type Component {
  id: ID!
  identifier: String!
  picture: String!
  code: String!
}

scalar DateTime

type File {
  filename: String!
  mimetype: String!
  encoding: String!
}

input LoginInput {
  email: String!
  password: String!
}

type Mutation {
  _: String
  signup(input: SignupInput): User
  login(input: LoginInput): Token
}

type Query {
  _: String
  users: [User!]
  user(email: String!): User
  components: [Component!]
}

input SignupInput {
  name: String!
  email: String!
  password: String!
  avatar: Upload!
}

type Token {
  token: String!
}

scalar Upload

type User {
  id: ID!
  name: String!
  email: String!
  avatar: String!
  role: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

```

## Author

👤 **Ossama Rafique**

* Website: https://www.ossamarafique.com
* Twitter: [@OssamaRafique](https://twitter.com/OssamaRafique)
* Github: [@OssamaRafique](https://github.com/OssamaRafique)
* LinkedIn: [@OssamaRafique](https://linkedin.com/in/OssamaRafique)
* Buy me a Coffee: https://ko-fi.com/ossamarafique

## Show your support

Give a ⭐️ if this project helped you!

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C71IRSG)
