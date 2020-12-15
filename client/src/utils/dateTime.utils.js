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