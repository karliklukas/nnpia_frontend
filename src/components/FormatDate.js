export function FormatDate(props) {
    if(props.dateTime != null){
        let date = props.dateTime.substr(0,10);
        let time = props.dateTime.substr(11,8);
        const [year, month, day] = [...date.split('-')]
        const [hour, minute] = [...time.split(':')]

        return day + ". " + month + ". " + year + " at " + hour + ":" + minute;
    }
    return "";
}


