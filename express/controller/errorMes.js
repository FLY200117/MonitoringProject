const { Error } = require('../model')

exports.get = async (req,res) => {
    try{
        // console.log(req.params)
        const { errorType } = req.params
        const filter = {}

        // 如果参数为0则说明请求的是jsError，
        // 参数为1则说明请求的是promiseError
        // 没有参数返回404
        if(errorType == 0){
            filter.type = 'jsError'
        }else if(errorType == 1){
            filter.type = 'promiseError'
        }
        // console.log(filter)
        const errorMessage = await Error.find(filter)
        // console.log(errorMessage)
        
        if(!errorMessage){
            return res.status(404).end()
        }
        res.status(200).json({
            errorMessage,
            code: 201
        })
    }catch(err){
        console.log(err)
    }
}

exports.getAll = async (req,res) => {
    try{
        // const filter = {}

        // if(month && day){
        //     filter.month = month
        //     filter.day = day
        // }

        // 查询所有错误信息
        const errorMessage = await Error.find({})
        // const errorMessage = await Error.find(filter).limit(limit).sort({
        //     // -1 倒序 1 正序
        //     createdAt: -1
        // })
        res.status(200).json({
            errorMessage,
            code: 201
        })
    }catch(err){
        console.log(err)
    }
}

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
        const error = new Error(data)
        await error.save()
        
        res.status(201).json({
            error,
            code: 201
        })

    }catch(err){
        console.log(err)
    }
}