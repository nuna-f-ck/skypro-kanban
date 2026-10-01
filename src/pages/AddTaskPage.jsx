import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import TaskContext from "../context/TaskContext";
import { getErrorMessage } from "../utils/getErrorMessage";

import {
  Page,
  Overlay,
  CenterPage,
  PageModal,
  PageTitle,
  FieldLabel,
  TaskForm,
  LeftColumn,
  RightColumn,
  Input,
  Textarea,
  FieldError,
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
  SaveButton,
} from "./pages.styled";

const categories = [
  { value: "Web Design", label: "Web Design", variant: "orange" },
  { value: "Research", label: "Research", variant: "green" },
  { value: "Copywriting", label: "Copywriting", variant: "purple" },
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

  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Research");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [calendarDate, setCalendarDate] = useState(new Date());

  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [formError, setFormError] = useState("");
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
    setFieldErrors((prev) => ({ ...prev, date: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    const errors = {
      title: title.trim() ? "" : "Введите название задачи",
      description: description.trim() ? "" : "Введите описание задачи",
      date: date ? "" : "Выберите дату",
    };

    setFieldErrors(errors);

    if (errors.title || errors.description || errors.date) {
      return;
    }

    try {
      setLoading(true);

      await addTask({
        title: title.trim(),
        topic,
        status: "Без статуса",
        description: description.trim(),
        date,
      });

      navigate("/");
    } catch (requestError) {
      setFormError(getErrorMessage(requestError, "Не удалось создать задачу."));
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

            <TaskForm onSubmit={handleSubmit} noValidate>
              <LeftColumn>
                <FieldLabel>Название задачи</FieldLabel>

                <Input
                  type="text"
                  placeholder="Введите название задачи..."
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />
                {fieldErrors.title && (
                  <FieldError>{fieldErrors.title}</FieldError>
                )}

                <FieldLabel>Описание задачи</FieldLabel>

                <Textarea
                  placeholder="Введите описание задачи..."
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, description: "" }));
                  }}
                />
                {fieldErrors.description && (
                  <FieldError>{fieldErrors.description}</FieldError>
                )}

                <CategoryLabel>Категория</CategoryLabel>

                <CategoryList>
                  {categories.map((category) => (
                    <CategoryButton
                      key={category.value}
                      type="button"
                      $variant={category.variant}
                      $active={topic === category.value}
                      onClick={() => setTopic(category.value)}
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

                {fieldErrors.date ? (
                  <FieldError>{fieldErrors.date}</FieldError>
                ) : (
                  <CalendarHint>Выберите срок исполнения.</CalendarHint>
                )}
              </RightColumn>

              <FormFooter>
                {formError && <ErrorMessage>{formError}</ErrorMessage>}

                <SaveButton type="submit" disabled={loading}>
                  {loading ? "Создание..." : "Создать задачу"}
                </SaveButton>
              </FormFooter>
            </TaskForm>
          </PageModal>
        </CenterPage>
      </Overlay>
    </Page>
  );
}

export default AddTaskPage;
