const jwt = require('jsonwebtoken');

const secret = 'sLJH&HFgfUGcvlugVCJV67egcvTF45DFjikg';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // console.log(req);
    // if (!req.body.token && !req.query.token && !req.headers.authorization) {
    //   return req;
    // }
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token);
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id, admin }) {
    const payload = { firstName, email, _id, admin };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
},

};
