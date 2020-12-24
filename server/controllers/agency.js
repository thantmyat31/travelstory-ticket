const ExpressAgency = require("../model/express_agency");
const upload = require("./../middlewares/imageUpload");

exports.uploadImage = (req, res) => {
    upload(req, res, error => {
        if(error) return res.status(400).json({
            success: false,
            message: 'Failed to upload image.'
        })

        return res.json({
            success: true,
            filePath: `express_agency/${res.req.file.filename}`,
            filename: res.req.file.filename
        });
    })
}

exports.createAgency = (req, res) => {
    const { owner } = req.body;
    ExpressAgency.find({ owner })
        .exec((error, oldAgency) => {
            console.log(oldAgency);
            if(oldAgency.length > 0) return res.status(500).json({
                message: 'This owner is already created express agency.'
            })

            if(req.body.image === '') req.body.image = 'constants/agency_brand_logo.png';
    
            const newExpressAgency = new ExpressAgency(req.body);

            newExpressAgency.save((error, agency) => {
                if(error || !agency) {
                    return res.status(400).json({
                        message: 'Something went wrong. Try again.'
                    });
                }
                ExpressAgency.findById(agency._id)
                    .populate('owner')
                    .exec((error, result) => {
                        if(error) {
                            return res.status(400).json({
                                message: 'Something went wrong. Try again.'
                            })
                        }

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
        })
}

exports.getOwnAgency = (req, res) => {
    const { ownerId } = req.params;
    
    ExpressAgency.findOne({ owner: ownerId })
        .populate('owner')
        .exec((error, agency) => {
            if(error || !agency) return res.status(400).json({
                message: 'No agency has created.'
            })

            return res.status(200).json({
                _id: agency._id,
                name: agency.name,
                email: agency.email,
                phones: agency.phones,
                addresses: agency.addresses,
                image: agency.image,
                owner: {
                    _id: agency.owner._id,
                    displayName: agency.owner.displayName,
                    email: agency.owner.email,
                    role: agency.owner.role
                }
            })
        })
}

exports.getAllAgencies = (req, res) => {
    ExpressAgency.find()
        .populate('owner')
        .exec((error, agencies) => {
            if(error || !agencies.length) return res.status(400).json({
                message: 'Something went wrong.'
            });

            agencies.forEach(agency => {
                agency.owner.hashed_password = undefined;
                agency.owner.createdAt = undefined;
                agency.owner.updatedAt = undefined;
                agency.owner.__v = undefined;
                agency.createdAt = undefined;
                agency.updatedAt = undefined;
                agency.__v = undefined;
            });

            return res.status(200).json(agencies);
        })
}