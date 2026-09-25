import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import { createTask } from "../services/tasks";

import {
  Page,
  Overlay,
  CenterPage,
  PageModal,
  PageTitle,
  FieldLabel,
  Form,
  LeftColumn,
  RightColumn,
  Input,
  Textarea,
  CategoryLabel,
  CategoryList,
  CategoryButton,
  Calendar,
  CalendarHeader,
  CalendarMonth,
  CalendarArrow,
  WeekDays,
  WeekDay,
  CalendarGrid,
  DayButton,
  CalendarHint,
  FormFooter,
  ErrorMessage,
  PrimaryButton,
} from "./pages.styled";

const categories = [
  {
    value: "Web Design",
    label: "Web Design",
    variant: "orange",
  },
  {
    value: "Research",
    label: "Research",
    variant: "green",
  },
  {
    value: "Copywriting",
    label: "Copywriting",
    variant: "purple",
  },
];

const WEEK_DAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const MONTHS = [
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

const toInputDate = (year, month, day) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

const parseDate = (value) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

function AddTaskPage({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Research");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [calendarDate, setCalendarDate] = useState(new Date(2023, 8, 1));

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const calendarDays = useMemo(() => {
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
  }, [calendarDate]);

  const selectedDate = parseDate(date);

  const isSelectedDay = (day) => {
    if (!day || !selectedDate) {
      return false;
    }

    return (
      selectedDate.getFullYear() === calendarDate.getFullYear() &&
      selectedDate.getMonth() === calendarDate.getMonth() &&
      selectedDate.getDate() === day
    );
  };

  const changeMonth = (offset) => {
    setCalendarDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  };

  const handleDateSelect = (day) => {
    if (!day) return;

    const selected = toInputDate(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      day,
    );

    setDate(selected);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Введите название задачи.");
      return;
    }

    if (!topic.trim()) {
      setError("Выберите категорию задачи.");
      return;
    }

    if (!description.trim()) {
      setError("Введите описание задачи.");
      return;
    }

    if (!date) {
      setError("Выберите дату.");
      return;
    }

    try {
      setLoading(true);

      await createTask({
        title: title.trim(),
        topic: topic.trim(),
        status: "Без статуса",
        description: description.trim(),
        date,
      });

      navigate("/");
    } catch (requestError) {
      console.error("Ошибка создания задачи:", requestError);

      if (requestError.response?.status === 401) {
        setError("Сессия закончилась. Войдите в аккаунт снова.");
      } else {
        setError("Не удалось создать задачу.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Overlay>
        <CenterPage>
          <PageModal>
            <PageTitle>Создание задачи</PageTitle>

            <Form onSubmit={handleSubmit}>
              <LeftColumn>
                <FieldLabel>Название задачи</FieldLabel>

                <Input
                  type="text"
                  placeholder="Введите название задачи..."
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <FieldLabel>Описание задачи</FieldLabel>

                <Textarea
                  placeholder="Введите описание задачи..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />

                <CategoryLabel>Категория</CategoryLabel>

                <CategoryList>
                  {categories.map((category) => (
                    <CategoryButton
                      key={category.value}
                      type="button"
                      $variant={category.variant}
                      $active={topic === category.value}
                      onClick={() => {
                        setTopic(category.value);
                        setError("");
                      }}
                    >
                      {category.label}
                    </CategoryButton>
                  ))}
                </CategoryList>
              </LeftColumn>

              <RightColumn>
                <FieldLabel>Даты</FieldLabel>

                <Calendar>
                  <CalendarHeader>
                    <CalendarMonth>
                      {MONTHS[calendarDate.getMonth()]}{" "}
                      {calendarDate.getFullYear()}
                    </CalendarMonth>

                    <div>
                      <CalendarArrow
                        type="button"
                        aria-label="Предыдущий месяц"
                        onClick={() => changeMonth(-1)}
                      >
                        ‹
                      </CalendarArrow>

                      <CalendarArrow
                        type="button"
                        aria-label="Следующий месяц"
                        onClick={() => changeMonth(1)}
                      >
                        ›
                      </CalendarArrow>
                    </div>
                  </CalendarHeader>

                  <WeekDays>
                    {WEEK_DAYS.map((day) => (
                      <WeekDay key={day}>{day}</WeekDay>
                    ))}
                  </WeekDays>

                  <CalendarGrid>
                    {calendarDays.map((day, index) => (
                      <DayButton
                        key={`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${index}`}
                        type="button"
                        $empty={!day}
                        $selected={isSelectedDay(day)}
                        onClick={() => handleDateSelect(day)}
                        disabled={!day}
                      >
                        {day || ""}
                      </DayButton>
                    ))}
                  </CalendarGrid>
                </Calendar>

                <CalendarHint>Выберите срок исполнения.</CalendarHint>
              </RightColumn>

              <FormFooter>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "Создание..." : "Создать задачу"}
                </PrimaryButton>
              </FormFooter>
            </Form>
          </PageModal>
        </CenterPage>
      </Overlay>
    </Page>
  );
}

export default AddTaskPage;
