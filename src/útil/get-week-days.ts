import { capitalize } from './capitalize'

export function getWeekDays(localeName = 'pt-BR') {
  const format = new Intl.DateTimeFormat(localeName, { weekday: 'long' }).format

  return Array.from(Array(7).keys())
    .map((day) => format(new Date(Date.UTC(2021, 5, day))))
    .map(capitalize)
}
