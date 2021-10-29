const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.headers['authorization'];

    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });

    token = token.substring("Bearer ".length);

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.usuarioId = decoded.id;
      next();
    });
}