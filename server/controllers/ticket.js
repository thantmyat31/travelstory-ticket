const Ticket = require("./../model/ticket");
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

                return res.status(201).json(ticket);
            });
			
		}
	});
}