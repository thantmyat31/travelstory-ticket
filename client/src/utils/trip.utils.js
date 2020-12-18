export const searchTrips = ({ data, trips }) => {
    const { cityFrom, cityTo, departDate, numberOfSeat } = data;
    let result = [];
    trips.forEach(trip => {
        const citiesFrom = trip?.trips.reduce((a, b) => {return [...a, b.cityFrom]}, []);
        const citiesTo = trip?.trips.reduce((a, b) => {return [...a, b.cityTo]}, []);
        
        if(citiesFrom.indexOf(cityFrom) !== -1 && 
            citiesTo.indexOf(cityTo) !== -1 &&
            trip.depart.date === departDate) {
            const seats = trip?.seatsList?.seats.reduce((a, b) => b.isValid ? [...a, b] : a, []);
            if(seats.length >= numberOfSeat) {
                result = [...result, trip];
            } 
        } 
    });
    return result;
}