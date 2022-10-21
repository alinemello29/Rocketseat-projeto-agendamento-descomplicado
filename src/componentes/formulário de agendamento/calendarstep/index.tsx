import { useState } from 'react'
import dayjs from 'dayjs'
import { Calendar } from '../../Calendar'
import {
  Container,
  TimeItem,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
} from './styles'

interface CalendarStepProps {
  onSelectedDateTime: (dateTime: Date) => void
}

export function CalendarStep({ onSelectedDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(null)

  const isTimePickerOpen = !!selectedDate

  const timesArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  function handleSelectTime(time: number) {
    const dateTime = dayjs(selectedDate).set('hour', time).startOf('hour')

    onSelectedDateTime(dateTime.toDate())
  }

  return (
    <Container isTimePickerOpen={isTimePickerOpen}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isTimePickerOpen && (
        <TimePicker>
          <TimePickerHeader>
            terça-feira <span>20 de Setembro</span>
          </TimePickerHeader>

          <TimePickerList>
            {timesArray.map((time) => {
              return (
                <TimeItem
                  key={time}
                  onClick={() => handleSelectTime(time)}
                  disabled={time < 12}
                >
                  {time}:00h
                </TimeItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
