const auth =  (req, res, next) => {
    if(req.session.username == 'pedrosarkis') return next();
    res.redirect('/');
 }
 
 module.exports = auth;