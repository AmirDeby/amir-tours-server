function checkAdmin(req, res,next) {
    const { isAdmin } = req.user;

    if (!isAdmin) {
       return res.status(401).send('unauthorized request, must be an admin');
    }
    req.isAdmin = isAdmin;
    next()
}

module.exports = checkAdmin;