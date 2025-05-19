
const adminAccess = (req,res,next) => {
    if (!req.user || req.user.role !== 'Admin'){
        return res.status(403).send('Only admin have accses')
    }
    next()
}

export default adminAccess;