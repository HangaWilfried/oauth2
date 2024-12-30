## Project Overview
This project implements an authentication and authorization system based on the OAuth2 principles. Built using NestJS, it leverages JWT (JSON Web Token) for token generation and Passport.js for token validation.

The generated tokens include user roles and scopes to control access to private resources. To perform a private request, the token must have the appropriate scopes, ensuring secure and role-based access control.

## Key Features:

Token Management: Generate and validate JWT tokens for secure communication.
- Role Management: Create and assign roles to users for fine-grained authorization.
- User Registration: Allow users to register and create accounts.
- User Login: Authenticate users and issue tokens upon successful login.
