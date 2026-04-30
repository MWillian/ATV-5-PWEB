export const injetarLocals = (req, res, next) => {
    res.locals.usuarioLogado = req.session?.usuario ?? null;
    
    next();
};