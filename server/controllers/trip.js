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

exports.updateSeats = (req, res) => {
    const selectedSeats = req.body;
    Trip.findById(req.params.id)
        .exec((error, trip) => {
            if(error || !trip) return res.status(400).json({
                message: 'Failed to select seats. Try again.'
            });

            const { type, seats } = trip.seatsList;
            const newSeats = seats.map(s => selectedSeats.indexOf(s.number) !== -1 ? {...s, isValid: !s.isValid}: s);

            Trip.findByIdAndUpdate(trip._id, { seatsList: {type, seats: newSeats} }, { new: true })
                .exec((error, result) => {
                    if(error || !result) return res.status(400).json({
                        message: 'Something went wrong.'
                    })
                    
                    return res.json(result);
                })
        })
}

exports.deleteTrip = (req, res) => {
    Trip.findByIdAndDelete(req.params.id)
        .exec((error, trip) => {
            if(error || !trip) return res.status(400).json({
                message: 'You can\'t delete the trip for this moment.'
            })

            return res.json(trip);
        })
}