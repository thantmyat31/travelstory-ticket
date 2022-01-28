const Exchange = require("./../model/exchange");

exports.getExchangeRate = (req, res) => {
    Exchange.find()
        .exec((error, exchanges) => {
            if(error || !exchanges.length) return res.status(500).json({
                message: 'No exchange data.'
            });

            return res.status(201).json({
                _id: exchanges[0]._id,
                dollarXR: exchanges[0].dollarXR
            });
        })
}

exports.createExchangeRate = (req, res) => {
    const newExchange = new Exchange(req.body);
    newExchange.save((error, exchange) => {
        if(error || !exchange) return res.status(500).json({
            message: 'Something went wrong.'
        })

        return res.status(201).json({
            _id: exchange._id,
            dollarXR: exchange.dollarXR
        });
    })
}

exports.updateExchangeRate = (req, res) => {
    Exchange.find()
        .exec((error, exchanges) => {
            if(error || !exchanges.length) return res.status(500).json({
                message: 'No exchange data.'
            });

            Exchange.findByIdAndUpdate(exchanges[0]._id, {dollarXR: req.body.dollarXR}, {new: true})
                .exec((error, result) => {
                    if(error || !result) return res.status(400).json({
                        message: 'Something went wrong.'
                    });

                    return res.status(201).json({
                        _id: result._id,
                        dollarXR: result.dollarXR
                    });
                })
        })
}