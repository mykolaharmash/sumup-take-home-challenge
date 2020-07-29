import { toLocalDate } from '../utils'

export function CreatedAt({ date }) {
  return toLocalDate(new Date(date))
}
