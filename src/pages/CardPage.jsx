import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import TaskContext from "../context/TaskContext";
import { getErrorMessage } from "../utils/getErrorMessage";
import {
  MONTHS,
  WEEK_DAYS,
  formatDateShort,
  getCalendarDays,
  parseDate,
  toInputDate,
} from "../utils/calendar";

import {
  Page,
  Overlay,
  CenterPage,
  EditModal,
  TopRow,
  TitleEditor,
  DesktopOnly,
  StatusLabel,
  StatusList,
  StatusButton,
  ContentGrid,
  DescriptionLabel,
  Textarea,
  DateLabel,
  Calendar,
  CalendarHeader,
  CalendarMonth,
  CalendarArrow,
  WeekDays,
  WeekDay,
  CalendarGrid,
  DayButton,
  CalendarHint,
  FieldError,
  ErrorText,
  CategorySection,
  CategoryLabel,
  CategoryButton,
  BottomRow,
  LeftButtons,
  SmallButton,
  SaveButton,
  DeleteButton,
  CloseButton,
  PageTitle,
  Description,
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

const getInitialValues = (task) => {
  const date = task.date ? task.date.slice(0, 10) : "";
  const parsedDate = parseDate(date);

  return {
    title: task.title || "",
    status: task.status || "Без статуса",
    description: task.description || "",
    date,
    calendarDate: parsedDate
      ? new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1)
      : new Date(),
  };
};

/* Просмотр и редактирование задачи. Данные берутся из уже загруженных задач,
   поэтому окно открывается сразу — без экрана «Загрузка…». */
function TaskDetails({ task, isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();

  const { editTask, removeTask } = useContext(TaskContext);

  const initial = getInitialValues(task);

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(initial.title);
  const [status, setStatus] = useState(initial.status);
  const [description, setDescription] = useState(initial.description);
  const [date, setDate] = useState(initial.date);

  const [calendarDate, setCalendarDate] = useState(initial.calendarDate);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
  });
  const [formError, setFormError] = useState("");

  const busy = saving || deleting;

  const calendarDays = useMemo(
    () => getCalendarDays(calendarDate),
    [calendarDate],
  );

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
    if (!day || !isEditing) return;

    setDate(
      toInputDate(calendarDate.getFullYear(), calendarDate.getMonth(), day),
    );
  };

  const currentCategory =
    categories.find((category) => category.value === task.topic) ||
    categories[1];

  const handleStartEdit = () => {
    setFormError("");
    setIsEditing(true);
  };

  // «Отменить»: откатываем изменения и возвращаемся к просмотру
  const handleCancelEdit = () => {
    const values = getInitialValues(task);

    setTitle(values.title);
    setStatus(values.status);
    setDescription(values.description);
    setDate(values.date);
    setCalendarDate(values.calendarDate);

    setFieldErrors({ title: "", description: "" });
    setFormError("");
    setIsEditing(false);
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEditing || busy) return;

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

      await editTask(task._id, {
        title: title.trim(),
        topic: task.topic || currentCategory.value,
        status,
        description: description.trim(),
        date: date || task.date || "",
      });

      navigate("/");
    } catch (requestError) {
      setFormError(
        getErrorMessage(requestError, "Не удалось сохранить изменения."),
      );
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

      await removeTask(task._id);

      navigate("/");
    } catch (requestError) {
      setFormError(getErrorMessage(requestError, "Не удалось удалить задачу."));
      setDeleting(false);
    }
  };

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
                  readOnly={!isEditing}
                  placeholder="Название задачи"
                  aria-label="Название задачи"
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />

                <DesktopOnly>
                  <CategoryButton
                    type="button"
                    $variant={currentCategory.variant}
                    $active
                  >
                    {currentCategory.label}
                  </CategoryButton>
                </DesktopOnly>
              </TopRow>
              {fieldErrors.title && (
                <FieldError>{fieldErrors.title}</FieldError>
              )}

              <StatusLabel>Статус</StatusLabel>

              <StatusList>
                {isEditing ? (
                  statuses.map((item) => (
                    <StatusButton
                      key={item}
                      type="button"
                      $active={status === item}
                      onClick={() => setStatus(item)}
                    >
                      {item}
                    </StatusButton>
                  ))
                ) : (
                  <StatusButton type="button" $active disabled>
                    {status}
                  </StatusButton>
                )}
              </StatusList>

              <ContentGrid>
                <div>
                  <DescriptionLabel>Описание задачи</DescriptionLabel>

                  <Textarea
                    $compact
                    $readOnly={!isEditing}
                    readOnly={!isEditing}
                    placeholder="Введите описание задачи..."
                    aria-label="Описание задачи"
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
                          disabled={!day || !isEditing}
                        >
                          {day || ""}
                        </DayButton>
                      ))}
                    </CalendarGrid>
                  </Calendar>

                  <CalendarHint>
                    Срок исполнения:{" "}
                    <b>{date ? formatDateShort(date) : "не выбран"}</b>
                  </CalendarHint>
                </div>
              </ContentGrid>

              <CategorySection>
                <CategoryLabel as="div">Категория</CategoryLabel>

                <CategoryButton
                  type="button"
                  $variant={currentCategory.variant}
                  $active
                >
                  {currentCategory.label}
                </CategoryButton>
              </CategorySection>

              {formError && <ErrorText>{formError}</ErrorText>}

              <BottomRow>
                {isEditing ? (
                  <>
                    <LeftButtons>
                      <SaveButton type="submit" $order={1} disabled={busy}>
                        Сохранить
                      </SaveButton>

                      <SmallButton
                        type="button"
                        $order={3}
                        onClick={handleCancelEdit}
                        disabled={busy}
                      >
                        Отменить
                      </SmallButton>

                      <DeleteButton
                        type="button"
                        $order={4}
                        onClick={handleDelete}
                        disabled={busy}
                      >
                        Удалить задачу
                      </DeleteButton>
                    </LeftButtons>

                    <CloseButton
                      type="button"
                      $order={2}
                      onClick={handleClose}
                      disabled={busy}
                    >
                      Закрыть
                    </CloseButton>
                  </>
                ) : (
                  <>
                    <LeftButtons>
                      <SmallButton
                        type="button"
                        $order={1}
                        onClick={handleStartEdit}
                        disabled={busy}
                      >
                        Редактировать задачу
                      </SmallButton>

                      <DeleteButton
                        type="button"
                        $order={2}
                        onClick={handleDelete}
                        disabled={busy}
                      >
                        Удалить задачу
                      </DeleteButton>
                    </LeftButtons>

                    <CloseButton
                      type="button"
                      $order={3}
                      onClick={handleClose}
                      disabled={busy}
                    >
                      Закрыть
                    </CloseButton>
                  </>
                )}
              </BottomRow>
            </form>
          </EditModal>
        </CenterPage>
      </Overlay>
    </Page>
  );
}

function CardPage({ isDarkMode, setIsDarkMode }) {
  const { id } = useParams();

  const { tasks, fetchTasks } = useContext(TaskContext);

  const [loadError, setLoadError] = useState("");

  const task = tasks.find((item) => item._id === id);
  const hasTask = Boolean(task);

  // Если задач ещё нет в памяти (страница открыта по прямой ссылке или
  // после обновления), тихо подгружаем их — без спиннера и текста «Загрузка»
  useEffect(() => {
    if (hasTask) return undefined;

    let ignore = false;

    fetchTasks()
      .then((loadedTasks) => {
        if (ignore) return;

        if (!loadedTasks.some((item) => item._id === id)) {
          setLoadError("Задача не найдена.");
        }
      })
      .catch((requestError) => {
        if (ignore) return;

        setLoadError(
          getErrorMessage(requestError, "Не удалось загрузить задачу."),
        );
      });

    return () => {
      ignore = true;
    };
  }, [id, hasTask, fetchTasks]);

  if (task) {
    return (
      <TaskDetails
        key={task._id}
        task={task}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Overlay>
        <CenterPage>
          <EditModal>
            {loadError && (
              <>
                <PageTitle>Задача не найдена</PageTitle>

                <Description>{loadError}</Description>

                <Description>
                  <Link to="/">Вернуться на доску</Link>
                </Description>
              </>
            )}
          </EditModal>
        </CenterPage>
      </Overlay>
    </Page>
  );
}

export default CardPage;
