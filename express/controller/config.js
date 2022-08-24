exports.CreateData = async (req,res,model) => {
    try{
        console.log(req.body)
        const isExist = await model.find(req.body.log)
        if(isExist){
            return res.status(202).json({
                message: '文件已有'
            }).end()
        }

        const Model = new model(req.body.log)
        await Model.save()
        res.status(201).json({
            Model,
            code: 201
        })

    }catch(err){
        console.log(err)
    }
}