class DateConverterService {
    convertDate(inputDate) {
        if (!inputDate || typeof inputDate !== 'string' || !inputDate.includes('T')) {
            throw new Error('Invalid input for convertDate: ' + inputDate);
        }
        let date, month, year;
        // console.log(inputDate);
        let dateString = inputDate.split('T')[0];

        if (!dateString || dateString.split('-').length !== 3) {
            throw new Error('Invalid date format for convertDate');
        }

        date = dateString.split('-')[2];
        month = dateString.split('-')[1];
        year = dateString.split('-')[0];

            date = date
                .toString()
                .padStart(2, '0');

            month = month
                .toString()
                .padStart(2, '0');

        return `${date}.${month}.${year}`;
    }
    convertTime(inputDate) {
        if (!inputDate || typeof inputDate !== 'string' || !inputDate.includes('T')) {
            throw new Error('Invalid input for convertTime');
        }
        let hours, minutes;
        let timeString = inputDate.split('T')[1];
        // console.log(timeString);

        if (!timeString || timeString.split(':').length < 2) {
            throw new Error('Invalid time format for convertTime');
        }

        hours = timeString.split(':')[0];
        minutes = timeString.split(':')[1];

            hours = parseInt(hours);
            minutes = parseInt(minutes);


            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            if (hours < 10) {
                hours = '0' + hours;
            }


            hours = hours
                .toString()
                .padStart(2, '0');

            minutes = minutes
                .toString()
                .padStart(2, '0');

        return `${hours}:${minutes}`;
    }
}

export default new DateConverterService();