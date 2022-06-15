export const timeConverter = (unixTime) => {
    if(unixTime !== ""){
        let time = new Date(unixTime * 1000);
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let year = time.getFullYear();
        let month = months[time.getMonth()];
        let date = time.getDate();
      
        return `${date} - ${month} - ${year}`;
    }
 
};
