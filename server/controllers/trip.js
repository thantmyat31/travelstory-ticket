const Trip = require('./../model/trip');

exports.getAllTrips = (req, res) => {
    Trip.find()
        .populate('agency')
        .exec((error, trips) => {
            if(error || !trips) return res.status(400).json({
                message: 'Something went wrong.'
            })

            return res.status(200).json(trips);
        })
}

exports.getTripsByAgency = (req, res) => {
    Trip.find({ agency: req.params.id })
        .populate('agency')
        .exec((error, trips) => {
            if(error || !trips) return res.status(400).json({
                message: 'Something went wrong.'
            })

            return res.status(200).json(trips);
        })
}

exports.createTrip = (req, res) => {
    const newTrip = new Trip(req.body);

    newTrip.save((error, trip) => {
        if(error || !trip) return res.status(400).json({
            message: 'Failed to create the new trip.'
        });

        Trip.findById(trip._id)
            .populate('agency')
            .exec((error, result) => {
                if(error || !trip) return res.status(400).json({
                    message: 'Something went wrong. Try again.'
                });

                return res.status(201).json(result);
            })
    })
}