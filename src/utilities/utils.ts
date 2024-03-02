import { format, isSameSecond } from "date-fns";
import { Event } from './types'

export const formatDate = (date: Date): string => format(date, "EEEE, do LLLL");

export const formatTime = (date: Date): string => format(date, "haaa");

export const formatEventTime = (event:Event): string => {
  console.log(event)
  console.log(event.startTime)
  console.log(event.endTime)

  if(isSameSecond(event.startTime, event.endTime)) {
    console.log('equal')
    return format(event.startTime, "haaa")
  }
  console.log('not equal')
  return format(event.startTime, "haaa") + ' to ' + format(event.endTime, "haaa")
}

