module.exports = process.env.NODE_ENV === 'development'
  ? require('./mock-intents')
  : require('./intents');
