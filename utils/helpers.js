module.exports =
{
    format_date: date =>
    {
        function checkMinutes()
        {
            if ((new Date(date).getMinutes()) < 9)
            {
                return `0${new Date(date).getMinutes()}`
            }
            else
            {
                return `${new Date(date).getMinutes()}`
            }
        }
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} at ${new Date(date).getHours()}:${checkMinutes()}`;
    }
};