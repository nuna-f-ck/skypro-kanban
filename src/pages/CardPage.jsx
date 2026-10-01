import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import TaskContext from "../context/TaskContext";
import { getErrorMessage } from "../utils/getErrorMessage";

import {
  Page,
  Overlay,
  CenterPage,
  EditModal,
  TopRow,
  TitleEditor,
  StatusLabel,
  StatusList,
  StatusButton,
  ContentGrid,
  DescriptionLabel,
  EditTextarea,
  DateLabel,
  EditCalendar,
  EditCalendarHeader,
  EditCalendarMonth,
  EditCalendarArrow,
  EditWeekDays,
  EditWeekDay,
  EditCalendarGrid,
  EditDayButton,
  EditCalendarHint,
  FieldError,
  ErrorText,
  BottomRow,
  LeftButtons,
  SmallButton,
  SaveButton,
  DeleteButton,
  CloseButton,
  PageTitle,
  Description,
  CategoryButton,
  LoadingState,
  Spinner,
} from "./pages.styled";

const categories = [
  { value: "Web Design", label: "Web Design", variant: "orange" },
  { value: "Research", label: "Research", variant: "green" },
  { value: "Copywriting", label: "Copywriting", variant: "purple" },
];

const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
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

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

function CardPage({ isDarkMode, setIsDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchTasks, editTask, removeTask } = useContext(TaskContext);

  const [task, setTask] = useState(null);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Research");
  const [status, setStatus] = useState("Без статуса");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [calendarDate, setCalendarDate] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
  });
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTask() {
      try {
        setLoading(true);
        setLoadError("");

        const loadedTasks = await fetchTasks();

        if (ignore) return;

        const loadedTask = loadedTasks.find((item) => item._id === id);

        if (!loadedTask) {
          setLoadError("Задача не найдена.");
          return;
        }

        setTask(loadedTask);

        setTitle(loadedTask.title || "");
        setTopic(loadedTask.topic || "Research");
        setStatus(loadedTask.status || "Без статуса");
        setDescription(loadedTask.description || "");

        if (loadedTask.date) {
          const normalizedDate = loadedTask.date.slice(0, 10);

          setDate(normalizedDate);

          const loadedDate = parseDate(normalizedDate);

          if (loadedDate) {
            setCalendarDate(
              new Date(loadedDate.getFullYear(), loadedDate.getMonth(), 1),
            );
          }
        }
      } catch (requestError) {
        if (ignore) return;

        setLoadError(
          getErrorMessage(requestError, "Не удалось загрузить задачу."),
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      ignore = true;
    };
  }, [id, fetchTasks]);

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
  };

  const currentCategory =
    categories.find((category) => category.value === topic) || categories[1];

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    const errors = {
      title: title.trim() ? "" : "Введите название задачи",
      description: description.trim() ? "" : "Введите описание задачи",
    };

    setFieldErrors(errors);

    if (errors.title || errors.description) {
      return;
    }

    try {
      setSaving(true);

      await editTask(id, {
        title: title.trim(),
        topic,
        status,
        description: description.trim(),
        date: date || task?.date || "",
      });

      navigate("/");
    } catch (requestError) {
      setFormError(
        getErrorMessage(requestError, "Не удалось сохранить изменения."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту задачу?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);
      setFormError("");

      await removeTask(id);

      navigate("/");
    } catch (requestError) {
      setFormError(getErrorMessage(requestError, "Не удалось удалить задачу."));
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Page>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <Overlay>
          <CenterPage>
            <EditModal>
              <LoadingState>
                <Spinner />
                Загрузка задачи...
              </LoadingState>
            </EditModal>
          </CenterPage>
        </Overlay>
      </Page>
    );
  }

  if (loadError && !task) {
    return (
      <Page>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <Overlay>
          <CenterPage>
            <EditModal>
              <PageTitle>Задача не найдена</PageTitle>

              <Description>{loadError}</Description>

              <Link to="/">Вернуться на доску</Link>
            </EditModal>
          </CenterPage>
        </Overlay>
      </Page>
    );
  }

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Overlay>
        <CenterPage>
          <EditModal>
            <form onSubmit={handleSubmit} noValidate>
              <TopRow>
                <TitleEditor
                  type="text"
                  value={title}
                  placeholder="Название задачи"
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />

                <CategoryButton
                  type="button"
                  $variant={currentCategory.variant}
                  $active
                >
                  {currentCategory.label}
                </CategoryButton>
              </TopRow>
              {fieldErrors.title && (
                <FieldError>{fieldErrors.title}</FieldError>
              )}

              <StatusLabel>Статус</StatusLabel>

              <StatusList>
                {statuses.map((item) => (
                  <StatusButton
                    key={item}
                    type="button"
                    $active={status === item}
                    onClick={() => setStatus(item)}
                  >
                    {item}
                  </StatusButton>
                ))}
              </StatusList>

              <ContentGrid>
                <div>
                  <DescriptionLabel>Описание задачи</DescriptionLabel>

                  <EditTextarea
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
                </div>

                <div>
                  <DateLabel>Даты</DateLabel>

                  <EditCalendar>
                    <EditCalendarHeader>
                      <EditCalendarMonth>
                        {MONTHS[calendarDate.getMonth()]}{" "}
                        {calendarDate.getFullYear()}
                      </EditCalendarMonth>

                      <div>
                        <EditCalendarArrow
                          type="button"
                          aria-label="Предыдущий месяц"
                          onClick={() => changeMonth(-1)}
                        >
                          ‹
                        </EditCalendarArrow>

                        <EditCalendarArrow
                          type="button"
                          aria-label="Следующий месяц"
                          onClick={() => changeMonth(1)}
                        >
                          ›
                        </EditCalendarArrow>
                      </div>
                    </EditCalendarHeader>

                    <EditWeekDays>
                      {WEEK_DAYS.map((day) => (
                        <EditWeekDay key={day}>{day}</EditWeekDay>
                      ))}
                    </EditWeekDays>

                    <EditCalendarGrid>
                      {calendarDays.map((day, index) => (
                        <EditDayButton
                          key={`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${index}`}
                          type="button"
                          $empty={!day}
                          $selected={isSelectedDay(day)}
                          onClick={() => handleDateSelect(day)}
                          disabled={!day}
                        >
                          {day || ""}
                        </EditDayButton>
                      ))}
                    </EditCalendarGrid>
                  </EditCalendar>

                  <EditCalendarHint>
                    Срок исполнения:{" "}
                    {date ? date.split("-").reverse().join(".") : "не выбран"}
                  </EditCalendarHint>
                </div>
              </ContentGrid>

              {formError && <ErrorText>{formError}</ErrorText>}

              <BottomRow>
                <LeftButtons>
                  <SaveButton type="submit" disabled={saving || deleting}>
                    {saving ? "Сохранение..." : "Сохранить"}
                  </SaveButton>

                  <SmallButton
                    type="button"
                    onClick={handleCancel}
                    disabled={saving || deleting}
                  >
                    Отменить
                  </SmallButton>

                  <DeleteButton
                    type="button"
                    onClick={handleDelete}
                    disabled={saving || deleting}
                  >
                    {deleting ? "Удаление..." : "Удалить задачу"}
                  </DeleteButton>
                </LeftButtons>

                <CloseButton
                  type="button"
                  onClick={handleCancel}
                  disabled={saving || deleting}
                >
                  Закрыть
                </CloseButton>
              </BottomRow>
            </form>
          </EditModal>
        </CenterPage>
      </Overlay>
    </Page>
  );
}

export default CardPage;
