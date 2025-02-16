const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { clearDatabase } = require('./db'); // Импортируем функцию очистки

chai.use(chaiHttp);

const API_URL = process.env.API_URL || 'http://localhost:8080';

describe('User API', () => {
  let userId;

  before(async () => {
    // Очистка базы данных перед запуском тестов
    await clearDatabase();
  });

  after(async () => {
    // Очистка базы данных после выполнения тестов
    await clearDatabase();
  });

  it('should create a new user', (done) => {
    chai.request(API_URL)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        userId = res.body.id; // Сохраняем ID для последующих тестов
        done();
      });
  });

  it('should get all users', (done) => {
    chai.request(API_URL)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get a user by ID', (done) => {
    chai.request(API_URL)
      .get(`/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id', userId);
        done();
      });
  });

  it('should update a user', (done) => {
    chai.request(API_URL)
      .put(`/users/${userId}`)
      .send({ name: 'Jane Doe', email: 'jane@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name', 'Jane Doe');
        done();
      });
  });

  it('should delete a user', (done) => {
    chai.request(API_URL)
      .delete(`/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

describe('Account API', () => {
  let accountId;
  let userId;

before(async () => {
    // Очистка базы данных перед запуском тестов
    await clearDatabase();

    // Создаем пользователя для тестов счетов
    const res = await chai.request(API_URL)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });
    userId = res.body.id;
  });

  it('should create a new account', (done) => {
    chai.request(API_URL)
      .post('/accounts')
      .send({ userId, balance: 1000.0 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        accountId = res.body.id;
        done();
      });
  });

  it('should get accounts by user ID', (done) => {
    chai.request(API_URL)
      .get(`/accounts/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should delete an account', (done) => {
    chai.request(API_URL)
      .delete(`/accounts/${accountId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

describe('Card API', () => {
  let cardId;
  let userId;

  before(async () => {
    // Очистка базы данных перед запуском тестов
    await clearDatabase();

    // Создаем пользователя для тестов карт
    const res = await chai.request(API_URL)
      .post('/users')
      .send({ name: 'Card User', email: 'card@example.com' });
    userId = res.body.id;
  });

  it('should create a new card', (done) => {
    chai.request(API_URL)
      .post('/cards')
      .send({ userId, cardNumber: '1234567890123456' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        cardId = res.body.id;
        done();
      });
  });

  it('should get cards by user ID', (done) => {
    chai.request(API_URL)
      .get(`/cards/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should delete a card', (done) => {
    chai.request(API_URL)
      .delete(`/cards/${cardId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});