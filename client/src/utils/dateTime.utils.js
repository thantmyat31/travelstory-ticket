import moment from 'moment';

export const getDateTimeString = ({ date, time }) => {
    return moment(`${date} ${time}`).format('LLL');
}

export const getTime = (time) => {
    return moment(time, 'hh:mm').format('hh:mm A')
}

export const getDuration = ({ depart, arrive }) => {
    const departMoment = moment(`${depart.date} ${depart.time}`);
    const arriveMoment = moment(`${arrive.date} ${arrive.time}`);

    const durationByHours = arriveMoment.diff(departMoment, 'hours', true);
    const hours = Math.floor(durationByHours);
    const minutes = Math.round((durationByHours - Math.floor(durationByHours)) * 60);
    
    if(minutes > 0) return `${hours} Hours ${minutes} Minutes`;
    return `${hours} Hours`;
}

export const dateTimeDifferences = (trips) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('hh:mm');
    const currentMoment = moment(`${currentDate} ${currentTime}`);
    let result = [];

    trips.forEach(trip => {
        const { date, time } = trip.depart;
        const tripMoment = moment(`${date} ${time}`);
        const diffByHours = tripMoment.diff(currentMoment, 'hours', true);
        if(diffByHours > 0) result = [...result, trip];
    });

    return result;
}

export const maxDateForCalendar = () => {
    const dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if(month < 10) month = `0${month.toString()}`;
    if(day < 10) day = `0${day.toString()}`;
    const maxDate = `${year}-${month}-${day}`;
    return maxDate;
}

export const getDate = (string) => {
    const ISOString = moment(string);
    const date = ISOString.format('DD-MM-YYYY');
    const time = ISOString.format('HH:mm:ss A');
    return { date, time };
}