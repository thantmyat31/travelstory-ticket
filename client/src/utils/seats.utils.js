export const filterSeatsAsAlphabat = (list) => {
    if(list?.type) {
        if(list?.type === 'normal') {
            const seatsA = list.seats.filter(seat => seat.number.includes('A'));
            const seatsB = list.seats.filter(seat => seat.number.includes('B'));
            const seatsC = list.seats.filter(seat => seat.number.includes('C'));
            const seatsD = list.seats.filter(seat => seat.number.includes('D'));
            
            return {seatsA, seatsB, seatsC, seatsD};
        }
        if(list?.type === 'vip') {
            const seatsA = list.seats.filter(seat => seat.number.includes('A'));
            const seatsB = list.seats.filter(seat => seat.number.includes('B'));
            const seatsC = list.seats.filter(seat => seat.number.includes('C'));
            const seatsD = list.seats.filter(seat => seat.number.includes('D'));
            
            return {seatsA, seatsB, seatsC, seatsD};
        }
    }
    else return [];
}

export const getValidSeats = (trips) => {
    let seats = [];
    trips.forEach(trip => {
        const seatsList = trip?.seatsList?.seats.filter(s => s.isValid);
        seats = [...seats, ...seatsList];
    });

    return seats.length;
}