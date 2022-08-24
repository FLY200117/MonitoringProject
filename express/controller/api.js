const { Api } = require('../model')

exports.put = async (req,res) => {
    try{
        console.log(req.body)
        // const isExist = await Error.find(req.body)
        // if(isExist.length){
        //     return res.status(202).end('文件已存在')
        // }
        const data = {
            log: req.body,
            type: req.body.type
        }
        const api = new Api(data)
        await api.save()
        
        res.status(201).json({
            api,
            code: 201
        })

    }catch(err){
        console.log(err)
    }
}