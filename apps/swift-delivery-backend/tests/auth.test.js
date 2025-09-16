const request = require('supertest');
const app = require('../server');
const { User } = require('../models');

describe('Authentication API', () => {
  describe('POST /graphql - Register', () => {
    it('should register a new user successfully', async () => {
      const mutation = `
        mutation {
          register(input: {
            name: "Test User"
            email: "test@example.com"
            password: "password123"
            phone: "+21612345678"
            role: CUSTOMER
          }) {
            success
            message
            user {
              id
              name
              email
              role
            }
            tokens {
              accessToken
              refreshToken
            }
          }
        }
      `;

      const response = await request(app)
        .post('/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.data.register.success).toBe(true);
      expect(response.body.data.register.user.email).toBe('test@example.com');
      expect(response.body.data.register.tokens.accessToken).toBeDefined();
    });

    it('should not register user with invalid email', async () => {
      const mutation = `
        mutation {
          register(input: {
            name: "Test User"
            email: "invalid-email"
            password: "password123"
          }) {
            success
            message
          }
        }
      `;

      const response = await request(app)
        .post('/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.errors).toBeDefined();
    });

    it('should not register user with weak password', async () => {
      const mutation = `
        mutation {
          register(input: {
            name: "Test User"
            email: "test@example.com"
            password: "123"
          }) {
            success
            message
          }
        }
      `;

      const response = await request(app)
        .post('/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /graphql - Login', () => {
    beforeEach(async () => {
      // Create test user
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'CUSTOMER',
        isVerified: true
      });
      await user.save();
    });

    it('should login with valid credentials', async () => {
      const mutation = `
        mutation {
          login(email: "test@example.com", password: "password123") {
            success
            message
            user {
              id
              email
              role
            }
            tokens {
              accessToken
              refreshToken
            }
          }
        }
      `;

      const response = await request(app)
        .post('/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.data.login.success).toBe(true);
      expect(response.body.data.login.tokens.accessToken).toBeDefined();
    });

    it('should not login with invalid credentials', async () => {
      const mutation = `
        mutation {
          login(email: "test@example.com", password: "wrongpassword") {
            success
            message
          }
        }
      `;

      const response = await request(app)
        .post('/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.data.login.success).toBe(false);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.service).toBe('Swift Delivery Backend');
    });
  });
});
