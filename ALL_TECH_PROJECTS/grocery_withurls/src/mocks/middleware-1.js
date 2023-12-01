// this middle ware is needed because to convert all the POST calls to GET
// calls so that the mock server does not end up modifying the db.json
// Why: because even the GET calls are POST in the api design: WTH !!

module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    req.method = 'GET';
    req.query = req.body;
  }
  next();
};
