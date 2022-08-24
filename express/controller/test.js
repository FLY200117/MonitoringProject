const { Test } = require('../model')

exports.get = async (req, res) => {
    try{
        const test = await Test.find(req.query)
        if(!test){
            return res.status(404).end()
        }
        res.status(200).json({
            test
        })
    }catch(err){
        console.log(err)
    }
}

exports.Create = async (req ,res) => {
    console.log(req.body)

    // 将要传递的数据传入model中
    const test = new Test(req.body.test)

    // 将model保存到数据库中
    await test.save()
    res.status(201).json({
        test
    })
}

exports.Update = async (req, res) => {
    console.log(req.body)
    const test = await Test.findOneAndReplace(req.query,req.body)
    if(!test){
        return res.status(404).end()
    }    
    res.status(201).json({
        test
    })
}

exports.Delete = async (req, res) => {
    res.status(201).json({
        message: 'delete success'
    })
}

exports.post = async (req, res) => {
    console.log(req.body)
    const message = req.body
    res.status(201).json({
        message
    })
}