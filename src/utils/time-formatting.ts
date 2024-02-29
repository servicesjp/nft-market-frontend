import moment from "moment";

export function formatDateTime(date: Date): string {
  return moment.utc(date).format("YYYY-MM-DD HH:mm:ss")
}

export function formatDate(date: Date): string {
  if (date instanceof Date) {
    return moment.utc(date).format("YYYY-MM-DD")
  }

  return moment.utc(date).format("YYYY-MM-DD")
}

export function parseDateTime(date: string) : Date {
  return moment.utc(date).toDate()
}