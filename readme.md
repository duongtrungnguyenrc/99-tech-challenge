# Problem 6: Architecture

## System Architecture

### Core Components
1. **Authentication Service**
   - JWT-based authentication
   - Token validation middleware
   - Secure token refresh mechanism

2. **Score Management Service**
   - Score update validation
   - Score calculation and storage
   - Leaderboard management

3. **Real-time Update Service**
   - WebSocket server for live updates
   - Connection management
   - Event broadcasting

4. **Caching Layer**
   - Redis-based score caching
   - Sorted set for leaderboard
   - Cache invalidation strategy

## API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

### Score Management
```
POST /api/scores/update
GET /api/scores/leaderboard
GET /api/scores/user/{userId}
```

### WebSocket
```
WS /ws/scoreboard
```

## Security Measures

### Authentication
- All score update requests must include a valid JWT token
- Tokens expire after 1 hour
- Refresh tokens with 24-hour validity

### Rate Limiting
- Maximum 10 score updates per minute per user
- Maximum 100 requests per hour per IP address

### Request Validation
- Idempotency keys required for score updates
- Request signature validation
- Timestamp validation (requests must be within 5 minutes of server time)

## Data Models

### Score Update Request
```json
{
  "userId": "string",
  "actionId": "string",
  "timestamp": "ISO8601",
  "idempotencyKey": "string",
  "signature": "string"
}
```

### Leaderboard Entry
```json
{
  "userId": "string",
  "username": "string",
  "score": "number",
  "rank": "number",
  "lastUpdated": "ISO8601"
}
```

## Caching Strategy

### Redis Schema
- Sorted set for leaderboard: `leaderboard:scores`
- Hash for user details: `user:{userId}:details`
- Set for rate limiting: `ratelimit:{userId}:updates`

### Cache Invalidation
- Leaderboard cache updates immediately on score changes
- User details cache expires after 1 hour
- Rate limiting data expires after the time window

## Error Handling

### HTTP Status Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 429: Too Many Requests
- 500: Internal Server Error

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

## Performance Considerations

### Optimization Strategies
1. Cache frequently accessed data
2. Batch database updates
3. Optimize WebSocket connections
4. Use connection pooling for database
5. Implement horizontal scaling

### Monitoring Metrics
1. Response time percentiles
2. WebSocket connection count
3. Cache hit/miss ratio
4. Error rates
5. Rate limit violations


## Flow

![Screenshot 2025-02-23 at 11 06 31](https://github.com/user-attachments/assets/bdfa3b7d-da92-4b0a-9870-96f91c99242f)


## Implementation notes
1. Follow RESTful API design principles
2. Implement comprehensive logging
3. Write unit and integration tests
4. Document all API endpoints
5. Use TypeScript for type safety

## Future Improvements
1. Add support for different scoring algorithms
2. Implement user achievements system
3. Add historical leaderboard data
4. Support multiple leaderboard categories
5. Add analytics dashboard for monitoring

## Testing Requirements

### Unit Tests
1. Score calculation logic
2. Authentication middleware
3. Rate limiting functionality
4. Request validation

### Integration Tests
1. End-to-end score update flow
2. WebSocket connection and updates
3. Cache invalidation
4. Rate limiting across multiple requests

### Load Tests
1. Concurrent score updates
2. WebSocket connection limits
3. Cache performance
4. Database performance



