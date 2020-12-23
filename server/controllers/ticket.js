const Ticket = require("./../model/ticket");
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkoutPayment = (req, res) => {
    const data = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: 'usd'
	};

	stripe.charges.create(data, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).json({ message: stripeErr });
		} else {
			req.body.amount = req.body.amount / 100;
            const newTicket = new Ticket(req.body);
            
            newTicket.save((error, ticket) => {
                if(error || !ticket) return res.status(500).json({
                    message: 'Something went wrong. Try again.'
				});

				const completeToken = jwt.sign({ _id: ticket._id }, process.env.JWT_SECRET, { expiresIn: '1m' });

                return res.status(201).json({ticket, completeToken});
            });
			
		}
	});
}

exports.checkCompleteToken = (req, res) => {
	const { token: completeToken} = req.body;
	try {
		const verified = jwt.verify(completeToken, process.env.JWT_SECRET);

		if(!verified) return res.status(401).json({
			message: 'Token verification failed.'
		});

		return res.status(200).json(completeToken);
	} catch (error) {
		return res.status(500).json({
			message: 'Token verification failed.'
		});
	}
}