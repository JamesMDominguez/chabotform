
const getDailyHours = (day,selecteChip) => {
    let num = 0
    selecteChip?.schedule?.forEach((time) => {
      if (time.day == day) {
        num++
      }
    })
    return num / 2
  }

  function grayOutBox(day, index) {
    if (index < 2) return true;
    if (day == "Mon" && index > 17) return true;
    if (day == "Wed" && index > 9 && index < 14) return true;
    if (day == "Thurs" && index > 17) return true;
    if (day == "Fri" && index > 17) return true;
    return false;
  }

  const findDayTime = (Dates, Breaks, Day, Time) => {
    let x = Dates?.map((date) => {
      if (date.day == Day && date.time == Time) {
        return (date.option)
      } else {
        return ""
      }
    }).join('')
    if (x == "") {
      let val = Breaks?.map((date) => {
        if (date.day == Day && date.time == Time) {
          return ("Break")
        } else {
          return ""
        }
      }).join('')
      return val
    }
    return (x)
  }

  async function GetUser(Wnumber) {
    const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/users`;

    const response = await fetch(apiUrl,{method:"GET",headers:{"w_number":Wnumber}});
    const users = await response.json();
    return users
  }

  async function GetAllUsers(){
    const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/users`;
    const response = await fetch(apiUrl);
    const users = await response.json();
    return users
  }

  
const Fun =  {findDayTime:findDayTime, getDailyHours:getDailyHours, grayOutBox:grayOutBox,GetUser:GetUser,GetAllUsers:GetAllUsers}
export default Fun
