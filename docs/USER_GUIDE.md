# User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating an Account](#creating-an-account)
3. [Funding Your Account](#funding-your-account)
4. [Joining Games](#joining-games)
5. [Game Rules](#game-rules)
6. [Making Withdrawals](#making-withdrawals)
7. [Account Settings](#account-settings)
8. [FAQ](#faq)
9. [Deploying Your Own Instance](#deploying-your-own-instance)

## Getting Started

Bitcoin Poker provides a unique poker experience using Bitcoin's Lightning Network for quick, low-cost transactions. This guide will help you understand how to use the platform effectively.

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Active internet connection
- Bitcoin Lightning wallet (for deposits and withdrawals)
- Basic understanding of poker rules

## Creating an Account

1. Navigate to the homepage and click on the **Sign Up** button
2. Fill in the registration form with:
   - Username (public name shown at tables)
   - Email address (for recovery purposes only)
   - Password (use a strong, unique password)
3. Accept the Terms of Service and Privacy Policy
4. Complete the captcha verification
5. Click **Create Account**
6. Verify your email address by clicking the link sent to your inbox

## Funding Your Account

### Option 1: Lightning Network Deposit

1. Navigate to the **Wallet** section in your account
2. Click **Deposit Funds**
3. Choose **Lightning Network** as your deposit method
4. Specify the amount you want to deposit
5. Scan the displayed QR code with your Lightning wallet or copy the payment request
6. Complete the payment in your Lightning wallet
7. Funds will be available in your account within seconds

### Option 2: On-Chain Bitcoin Deposit

1. Navigate to the **Wallet** section
2. Click **Deposit Funds**
3. Choose **Bitcoin On-Chain** as your deposit method
4. Copy the displayed Bitcoin address or scan the QR code
5. Send Bitcoin to this address from your wallet
6. Wait for on-chain confirmation (usually 1-3 confirmations required)
7. Funds will be credited to your account after confirmation

## Joining Games

### Cash Games

1. Navigate to the **Lobby** section
2. Filter games by:
   - Game type (Texas Hold'em, Omaha, etc.)
   - Stakes (micro, small, medium, high)
   - Number of players (heads-up, 6-max, full ring)
3. Click on an available table to join
4. Select your buy-in amount (between table minimum and maximum)
5. Choose your seat at the table
6. Wait for the next hand to begin

### Tournaments

1. Navigate to the **Tournaments** section
2. Browse available tournaments by:
   - Format (Sit & Go, Scheduled, Knockout, etc.)
   - Buy-in amount
   - Prize pool structure
   - Start time
3. Click **Register** on your chosen tournament
4. Confirm your entry fee payment
5. Wait for the tournament to begin at the scheduled time

## Game Rules

### Texas Hold'em Rules

Texas Hold'em is played with a standard 52-card deck. The objective is to make the best five-card hand using any combination of your two private cards and the five community cards.

#### Hand Rankings (Highest to Lowest)
1. Royal Flush
2. Straight Flush
3. Four of a Kind
4. Full House
5. Flush
6. Straight
7. Three of a Kind
8. Two Pair
9. One Pair
10. High Card

#### Betting Rounds
1. **Pre-flop**: After receiving two hole cards
2. **Flop**: After the first three community cards are dealt
3. **Turn**: After the fourth community card is dealt
4. **River**: After the fifth and final community card is dealt

### Omaha Rules

Omaha is similar to Texas Hold'em but with some key differences:
- Players receive four hole cards instead of two
- Players MUST use exactly two of their hole cards and three community cards to make their hand

## Making Withdrawals

1. Navigate to the **Wallet** section
2. Click **Withdraw Funds**
3. Choose your withdrawal method:
   - Lightning Network (instant, low fees)
   - On-chain Bitcoin (higher fees, longer processing time)
4. Enter the withdrawal amount
5. Provide your Lightning invoice or Bitcoin address
6. Confirm the withdrawal
7. Complete any required security verification (2FA, email confirmation)

## Account Settings

### Setting Up Two-Factor Authentication

1. Navigate to **Account Settings** > **Security**
2. Click **Enable 2FA**
3. Choose your preferred 2FA method:
   - Authenticator App (TOTP)
   - Email verification
   - SMS verification (if available in your region)
4. Follow the on-screen instructions to complete setup

### Managing Notifications

1. Navigate to **Account Settings** > **Notifications**
2. Configure your notification preferences:
   - Email notifications
   - In-app notifications
   - Tournament reminders
   - Deposit/withdrawal alerts

## FAQ

### Q: How are the games guaranteed to be fair?
**A:** Our platform uses provably fair algorithms where game outcomes can be independently verified by players. We combine server-side and client-side entropy to ensure complete randomness in card dealing.

### Q: What happens if I lose connection during a game?
**A:** If you disconnect during a game, the system will automatically fold your hand if action reaches you. Your account will remain logged in and seated at the table for a grace period of 2 minutes. After this time, you'll be removed from the table with your chips returned to your account.

### Q: Are there any fees for deposits or withdrawals?
**A:** Lightning Network deposits are free. Withdrawals via Lightning Network incur a small routing fee (typically less than 1 sat). On-chain transactions are subject to Bitcoin network fees which vary depending on network congestion.

### Q: Is my personal information safe?
**A:** We collect minimal personal information and do not require KYC documents. All data is encrypted and stored securely. We never share your information with third parties.

### Q: How do I contact support?
**A:** For any issues or questions, please visit the **Support** section or email support@bitcoinpoker.com.

## Deploying Your Own Instance

Bitcoin Poker can be self-hosted using Coolify, an open-source PaaS (Platform as a Service) that allows you to deploy applications and services to your own servers.

### Prerequisites for Self-Hosting

- A VPS from providers like DigitalOcean, Linode, Hetzner, AWS, etc.
- Domain name (optional but recommended for SSL)
- Basic understanding of Docker and server management

### Deploying with Coolify

#### 1. Server Setup

1. Provision a VPS from your preferred provider (minimum 2GB RAM recommended)
2. Ensure your server has Ubuntu installed (version 22.04 LTS recommended)
3. Set up SSH access to your server

#### 2. Install Coolify

1. SSH into your server and run the official Coolify installation command:
   ```bash
   curl -fsSL https://coolify.io/install.sh | bash
   ```
2. After installation completes, access the Coolify dashboard via your server's IP address on port 8000 (e.g., http://your-server-ip:8000)
3. Create your admin account when prompted

#### 3. Configure Your Server in Coolify

1. Navigate to the "Servers" section in the Coolify dashboard
2. Add your server if it's not already listed
3. Ensure Docker is properly installed (Coolify will handle this automatically)
4. Verify you see a green "Proxy Running" status

#### 4. Deploy Bitcoin Poker

1. Create a new Project in Coolify
2. Add a Resource to your project
3. Select "GitHub" (or your preferred Git provider) as the source
4. Connect your Git repository containing the Bitcoin Poker code
5. Configure build settings:
   - Select "Docker" as the deployment method
   - Verify that Dockerfile is detected
   - Configure environment variables:
     - `DB_CONNECTION_STRING`: Your database connection string
     - `LIGHTNING_NODE_URL`: Your Lightning node connection
     - `SECRET_KEY`: Your application secret
6. Configure network settings:
   - Set a custom domain if you have one
   - Enable SSL if you're using a custom domain
7. Click "Deploy" and monitor the deployment process

#### 5. Database Setup

1. In Coolify, navigate to "Services"
2. Add a new MongoDB or PostgreSQL database (depending on your application requirements)
3. Configure database credentials
4. Link the database to your Bitcoin Poker application by updating the environment variables

#### 6. Lightning Network Setup

1. Configure a Lightning Network node (LND, c-lightning, or Eclair)
2. Update your Bitcoin Poker environment variables with the Lightning Network connection details
3. Test Lightning Network connectivity from your application

#### 7. Monitoring and Maintenance

Coolify provides built-in monitoring capabilities:
1. Monitor server resources (CPU, RAM, disk usage)
2. Set up notifications through Discord, Telegram, or email
3. Monitor deployment status and logs in real-time
4. Schedule automatic backups for your databases

### Benefits of Using Coolify

- **No Vendor Lock-in**: You maintain complete control over your data and infrastructure
- **Free SSL Certificates**: Automatic setup and renewal of Let's Encrypt SSL certificates
- **Push to Deploy**: Automatic deployment when you push changes to your repository
- **Real-time Terminal**: Execute commands on your server directly from the Coolify dashboard
- **Automatic Backups**: Configure automatic database backups to S3-compatible storage
- **Webhooks**: Integrate with your existing CI/CD pipelines

For detailed Coolify documentation, visit [https://coolify.io/docs](https://coolify.io/docs).
