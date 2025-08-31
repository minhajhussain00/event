# Starter Template

A modern SvelteKit application with authentication, password reset functionality, and Stripe integration.

## Features

- **Authentication**: Sign up, sign in, and email verification using [better-auth](https://github.com/better-auth/better-auth)
- **Password Reset**: Complete forgot password and reset password flow
- **Email Integration**: Email sending via [Resend](https://resend.com)
- **Database**: MongoDB with Mongoose ODM
- **Payments**: Stripe integration for user payments
- **UI Components**: Built with shadcn-svelte components and Tailwind CSS
- **Form Validation**: Zod schemas with Superforms for robust form handling

## Authentication Flow

### Sign In/Sign Up
- Users can create accounts with email verification
- Sign in with email and password
- OAuth integration ready (Google configured)

### Password Reset
1. **Forgot Password**: Users enter their email on `/auth/forgot-password`
2. **Email Sent**: System sends reset link to user's email (if account exists)
3. **Reset Password**: Users click link and set new password on `/auth/reset-password`
4. **Success**: Users are redirected to sign in with success message

## Setup

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
PRIVATE_MONGODB_URI=mongodb://localhost:27017/your_database

# Email (Resend)
PRIVATE_RESEND_KEY=your_resend_api_key
PUBLIC_BASE_URL=http://localhost:5173

# Stripe
PRIVATE_STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PRIVATE_STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Installation

```bash
npm install
```

## Developing

Start the development server:

```bash
npm run dev
```

## Building

To create a production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Authentication Routes

- `/auth/sign-in` - User sign in
- `/auth/sign-up` - User registration  
- `/auth/forgot-password` - Request password reset
- `/auth/reset-password?token=<token>` - Reset password with token
- `/auth/verification-success` - Email verification success

## Tech Stack

- **Framework**: SvelteKit with Svelte 5
- **Authentication**: better-auth
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-svelte
- **Form Handling**: Superforms + Zod
- **Email**: Resend
- **Payments**: Stripe

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
