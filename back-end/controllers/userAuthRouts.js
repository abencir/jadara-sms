const adminRegister = async (req,res) => {
    const {email} = req.body;
    try{
        const isIxist = await User.findOne({email})
        if (isIxist){
            return res.status(400).send('Wrong email or password')
        }
        const newAdmin = await Admin.create(req.body)
        res.status(201).json(newAdmin) 
    }catch(err){
        res.status(400).send(err)
    }
}

export default adminRegister;