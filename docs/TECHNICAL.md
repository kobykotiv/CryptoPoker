# Technical Documentation

## Architecture Overview

Bitcoin Poker is built with a microservices architecture, consisting of the following main components:

1. **Frontend Service**: A React-based application that handles the user interface
2. **Game Service**: Manages game logic, state, and game room operations
3. **Payment Service**: Interfaces with the Lightning Network for payment processing
4. **Authentication Service**: Handles user authentication and session management
5. **Database Service**: Manages persistence of user data, game history, and other information

### System Architecture Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   Frontend  │◄────┤  API Gateway│◄────┤    Client   │
│             │     │             │     │             │
└──────┬──────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Game Logic │◄────┤  Auth Service│─────┤ User Database│
│             │     │             │     │             │
└──────┬──────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  Payment    │◄────┤  Lightning  │
│  Service    │     │  Node       │
│             │     │             │
└─────────────┘     └─────────────┘
```

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux for state management
- Socket.IO for real-time communications
- Material-UI for component library

### Backend
- Node.js with Express
- Socket.IO for WebSocket connections
- MongoDB for data persistence
- Redis for caching and pub/sub messaging

### Bitcoin Lightning Integration
- LND API for Lightning Network integration
- BTCPay Server as an alternative payment processor
- Custom Lightning Service Provider (LSP) integration

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "username": "String",
  "passwordHash": "String",
  "email": "String",
  "btcAddress": "String",
  "lightningNodePubKey": "String",
  "balance": "Number",
  "gameHistory": ["ObjectId"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Games Collection
```json
{
  "_id": "ObjectId",
  "gameType": "String",
  "players": ["ObjectId"],
  "stakes": {
    "smallBlind": "Number",
    "bigBlind": "Number"
  },
  "deck": ["String"],
  "pot": "Number",
  "communityCards": ["String"],
  "currentTurn": "ObjectId",
  "gameState": "String",
  "winner": "ObjectId",
  "transactions": ["ObjectId"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "username": "player1",
  "password": "securepassword",
  "email": "player@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "60a6f63e4f5d4b2b5c9c9c9c",
    "username": "player1",
    "email": "player@example.com"
  },
  "token": "JWT_TOKEN"
}
```

### Lightning Network Integration

The application interfaces with Lightning Network nodes through the following methods:

1. **Direct LND API Integration**: For users running their own nodes
2. **LSP (Lightning Service Provider) Integration**: For users without their own nodes
3. **Hosted Channels**: For quick onboarding of new users

## Security Considerations

1. **Private Key Management**: User private keys are never stored on the server
2. **Payment Channel Security**: Proper channel state management to prevent theft
3. **Game Integrity**: Provably fair algorithms with seed verification
4. **Server Security**: Regular security audits and penetration testing
5. **Data Encryption**: All sensitive data is encrypted at rest and in transit

## Deployment Guide

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
