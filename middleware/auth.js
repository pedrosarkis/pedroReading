const auth =  (req,res,next) => {
   if(req.originalUrl === '/recovery') return next();
   if(req.originalUrl === '/autenticate' ) return next();
   if(req.originalUrl === '/users/create') return next();
   if(req.originalUrl === '/users/login') return next();
   if(req.originalUrl === '/users/recoveryPassword') return next();
  
   if(req.session.username) return next();
   res.redirect('/autenticate');
}

module.exports = auth;