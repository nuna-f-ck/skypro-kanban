import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import { getTask, updateTask, deleteTask } from "../services/tasks";

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

  const [task, setTask] = useState(null);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Research");
  const [status, setStatus] = useState("Без статуса");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [calendarDate, setCalendarDate] = useState(new Date(2023, 8, 1));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  /*
   * Загрузка задачи
   */
  useEffect(() => {
    let ignore = false;

    async function loadTask() {
      try {
        setLoading(true);
        setError("");

        const data = await getTask(id);

        if (ignore) return;

        const loadedTask = data.task || data;

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

        console.error("Ошибка загрузки задачи:", requestError);

        setError("Не удалось загрузить задачу.");
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
  }, [id]);

  /*
   * Дни календаря
   */
  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    // Понедельник = 0 ... воскресенье = 6
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

  /*
   * Текущая категория
   */
  const currentCategory =
    categories.find((category) => category.value === topic) || categories[1];

  /*
   * Сохранение
   */
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

    if (!status.trim()) {
      setError("Выберите статус задачи.");
      return;
    }

    if (!description.trim()) {
      setError("Введите описание задачи.");
      return;
    }

    try {
      setSaving(true);

      await updateTask(id, {
        title: title.trim(),
        topic: topic.trim(),
        status: status.trim(),
        description: description.trim(),
        date: date || task?.date || "",
      });

      navigate("/");
    } catch (requestError) {
      console.error("Ошибка обновления задачи:", requestError);

      if (requestError.response?.status === 401) {
        setError("Сессия закончилась. Войдите в аккаунт снова.");
      } else {
        setError("Не удалось сохранить изменения.");
      }
    } finally {
      setSaving(false);
    }
  };

  /*
   * Удаление задачи
   */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту задачу?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteTask(id);

      navigate("/");
    } catch (requestError) {
      console.error("Ошибка удаления задачи:", requestError);

      setError("Не удалось удалить задачу.");
    } finally {
      setDeleting(false);
    }
  };

  /*
   * Отмена
   */
  const handleCancel = () => {
    navigate("/");
  };

  /*
   * Загрузка
   */
  if (loading) {
    return (
      <Page>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <Overlay>
          <CenterPage>
            <EditModal>
              <PageTitle>Загрузка...</PageTitle>
            </EditModal>
          </CenterPage>
        </Overlay>
      </Page>
    );
  }

  /*
   * Ошибка загрузки
   */
  if (error && !task) {
    return (
      <Page>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <Overlay>
          <CenterPage>
            <EditModal>
              <PageTitle>Задача не найдена</PageTitle>

              <Description>{error}</Description>

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
            <form onSubmit={handleSubmit}>
              {/* Название + категория */}

              <TopRow>
                <TitleEditor
                  type="text"
                  value={title}
                  placeholder="Название задачи"
                  onChange={(event) => setTitle(event.target.value)}
                />

                <CategoryButton
                  type="button"
                  $variant={currentCategory.variant}
                  $active
                >
                  {currentCategory.label}
                </CategoryButton>
              </TopRow>

              {/* Статус */}

              <StatusLabel>Статус</StatusLabel>

              <StatusList>
                {statuses.map((item) => (
                  <StatusButton
                    key={item}
                    type="button"
                    $active={status === item}
                    onClick={() => {
                      setStatus(item);
                      setError("");
                    }}
                  >
                    {item}
                  </StatusButton>
                ))}
              </StatusList>

              {/* Описание + календарь */}

              <ContentGrid>
                <div>
                  <DescriptionLabel>Описание задачи</DescriptionLabel>

                  <EditTextarea
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
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

              {error && <ErrorText>{error}</ErrorText>}

              {/* Кнопки */}

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
