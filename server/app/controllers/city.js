const City = require("./../model/city");

exports.getAllCities = (req, res) => {
    City.find()
        .exec((error, cities) => {
            if (error || !cities) return res.status(400).json({
                message: 'No city in database.'
            })

            return res.status(200).json(cities);
        })
}

exports.addNewCity = (req, res) => {
    const { name, code } = req.body.city;

    City.find({ name })
        .exec((error, cities) => {
            if(error) return res.status(400).json({
                message: 'Something went wrong. Try again.'
            });

            if(cities.length > 0) return res.status(400).json({
                message: 'The city name is already existed.'
            })

            const newCity = new City({ name, code });
            newCity.save((error, result) => {
                if(error || !result) return res.status(500).json({
                    message: 'Failed to add new city.'
                });

                return res.status(201).json({
                    _id: result._id,
                    name: result.name,
                    code: result.code
                })
            })
        })
}

exports.deleteCityById = (req, res) => {
    const { id } = req.params;
    City.findByIdAndDelete(id)
        .exec((error, city) => {
            if(error || !city) return res.status(400).json({
                message: 'Failed to delete the city. Try again.'
            })

            res.status(200).json(city);
        })
}