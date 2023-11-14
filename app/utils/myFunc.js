const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

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

const Fun =  {findDayTime:findDayTime, getDailyHours:getDailyHours, grayOutBox:grayOutBox}
export default Fun
