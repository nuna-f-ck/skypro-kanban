export const WEEK_DAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const pad = (value) => String(value).padStart(2, "0");

export const toInputDate = (year, month, day) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

export const parseDate = (value) => {
  if (!value) return null;

  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

// Ячейки месяца: null — пустые клетки до первого числа (неделя с понедельника)
export const getCalendarDays = (calendarDate) => {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let index = 0; index < mondayOffset; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(day);
  }

  return days;
};

// "2023-10-09" или "2023-10-09T00:00:00.000Z" -> "09.10.23" (как в макете)
export const formatDateShort = (value) => {
  if (!value) return "";

  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) return "";

  return `${match[3]}.${match[2]}.${match[1].slice(2)}`;
};
