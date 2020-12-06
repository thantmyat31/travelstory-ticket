const { populate } = require("../model/express_agency");
const ExpressAgency = require("../model/express_agency");
const User = require("../model/user");

exports.createAgency = (req, res) => {
    if(!req.body.image) req.body.image = 'agency_brand_logo.png';
    const newExpressAgency = new ExpressAgency(req.body);

    newExpressAgency.save((error, agency) => {
        if(error || !agency) return res.status(400).json({
            message: 'Something went wrong. Try again.'
        });
        ExpressAgency.findById(agency._id)
            .populate('owner')
            .exec((error, result) => {
                if(error) return res.status(400).json({
                    message: 'Something went wrong. Try again.'
                })

                res.json({
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    phones: result.phones,
                    addresses: result.addresses,
                    image: result.image,
                    owner: {
                        _id: result.owner._id,
                        displayName: result.owner.displayName,
                        email: result.owner.email,
                        role: result.owner.role
                    }
                });
            })
    })
}