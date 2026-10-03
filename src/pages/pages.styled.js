import styled, { css, keyframes } from "styled-components";

import { mobile } from "../styles/breakpoints";

const isDark = (props) => props.theme.text === "#FFFFFF";

const ERROR_COLOR = "#f84d4d";

/* общие страницы */

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;

  background-color: ${(props) => props.theme.mainBackground};
`;

/* затемнение с модалкой на десктопе; на телефоне — обычная страница (макет) */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 70px 16px 20px;

  background: rgba(0, 0, 0, 0.72);

  box-sizing: border-box;

  ${mobile} {
    position: static;

    display: block;

    min-height: calc(100vh - 70px);
    min-height: calc(100dvh - 70px);

    padding: 0;

    background: ${(props) => props.theme.cardBackground};
  }
`;

export const CenterPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const AuthPage = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.mainBackground};

  ${mobile} {
    padding: 0 16px;

    background-color: ${(props) => props.theme.cardBackground};
  }
`;

/* выход: затемнённая доска + окно подтверждения */

export const ExitOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  background: rgba(0, 0, 0, 0.5);

  box-sizing: border-box;
`;

/* спиннер загрузки (только при первой загрузке доски) */

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;

  border: 4px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#33364a" : "#e2e6ee")};
  border-top-color: #565eef;
  border-radius: 50%;

  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 14px;

  min-height: 160px;
  width: 100%;

  color: ${(props) => props.theme.text};

  font-size: 14px;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 160px;
  width: 100%;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#777a89" : "#8c939f")};

  font-size: 14px;
`;

/* общая визуальная база модалки: фон, рамка, тень — без ширины и паддингов */

const ModalBase = styled.div`
  max-height: calc(100vh - 100px);

  overflow-y: auto;
  box-sizing: border-box;

  background-color: ${(props) => props.theme.cardBackground};

  border: 1px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#3a3b4b" : "#d4dbe5")};

  border-radius: 8px;

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);

  scrollbar-width: thin;
`;

/* модальное окно для задач (AddTaskPage / CardPage) */

export const PageModal = styled(ModalBase)`
  width: 100%;
  max-width: 490px;

  padding: 30px 22px 37px;

  ${mobile} {
    max-width: none;
    max-height: none;

    padding: 24px 16px calc(32px + env(safe-area-inset-bottom, 0px));

    overflow: visible;

    border: none;
    border-radius: 0;

    box-shadow: none;
  }
`;

export const EditModal = PageModal;

/* страницы авторизации / 404: на десктопе карточка, на телефоне — весь экран */

export const AuthModal = styled(ModalBase)`
  width: 100%;
  max-width: 400px;

  padding: 40px 36px;

  text-align: center;

  ${mobile} {
    max-height: none;

    padding: 0;

    overflow: visible;

    background-color: transparent;

    border: none;
    border-radius: 0;

    box-shadow: none;
  }
`;

/* окно подтверждения выхода — карточка и на десктопе, и на телефоне */

export const ExitModal = styled(ModalBase)`
  width: 100%;
  max-width: 400px;

  padding: 40px 36px;

  text-align: center;

  ${mobile} {
    padding: 24px 16px;
  }
`;

/* заголовок */

export const PageTitle = styled.h1`
  margin: 0 0 20px;

  color: ${(props) => props.theme.title};

  font-size: 16px;
  line-height: 20px;
  font-weight: 700;

  ${mobile} {
    margin-bottom: 24px;

    font-size: 20px;
    line-height: 24px;
  }
`;

/* лейблы */

const labelStyles = css`
  color: ${(props) => props.theme.title};

  font-size: 12px;
  line-height: 15px;
  font-weight: 600;

  ${mobile} {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const FieldLabel = styled.label`
  display: block;

  margin: 0 0 11px;

  ${labelStyles}

  ${mobile} {
    margin-bottom: 10px;
  }
`;

export const CategoryLabel = styled(FieldLabel)`
  margin-top: 2px;
  margin-bottom: 10px;

  ${mobile} {
    margin-top: 6px;
  }
`;

/* форма авторизации (Login / Register) — простая колонка */

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

/* форма AddTaskPage — две колонки (поля + календарь); на телефоне одна колонка */

export const TaskForm = styled.form`
  width: 100%;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    145px;

  column-gap: 17px;
  row-gap: 0;

  ${mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  min-width: 0;

  /* на телефоне блоки полей встают в общий порядок формы: название,
     описание, календарь, категория (см. $order у FieldGroup) */
  ${mobile} {
    display: contents;
  }
`;

export const RightColumn = styled.div`
  min-width: 0;

  ${mobile} {
    order: 3;
  }
`;

export const FieldGroup = styled.div`
  min-width: 0;

  ${mobile} {
    order: ${(props) => props.$order ?? 0};
  }
`;

/* инпуты */

export const Input = styled.input`
  display: block;

  width: 100%;
  height: 39px;

  box-sizing: border-box;

  margin: 0 0 4px;
  padding: 0 10px;

  border: 1px solid
    ${(props) =>
      props.$error ? ERROR_COLOR : isDark(props) ? "#464856" : "#d4dbe5"};

  border-radius: 6px;

  outline: none;

  color: ${(props) => props.theme.text};

  background-color: ${(props) => props.theme.cardBackground};

  font-family: inherit;
  font-size: 12px;

  &::placeholder {
    color: ${(props) => (isDark(props) ? "#777a89" : "#8c939f")};
  }

  &:focus {
    border-color: ${(props) => (props.$error ? ERROR_COLOR : "#565eef")};
  }

  &::-webkit-calendar-picker-indicator {
    filter: ${(props) => (isDark(props) ? "invert(0.8)" : "none")};
  }

  ${mobile} {
    height: 40px;

    margin-bottom: 10px;

    font-size: 14px;
  }
`;

/* textarea ($compact — мелкий шрифт как в окне редактирования на десктопе,
   $readOnly — режим просмотра задачи) */

export const Textarea = styled.textarea`
  display: block;

  width: 100%;
  height: 155px;

  box-sizing: border-box;

  margin: 0 0 4px;
  padding: 11px 10px;

  resize: none;

  border: 1px solid
    ${(props) =>
      props.$readOnly
        ? "transparent"
        : isDark(props)
          ? "#464856"
          : "#d4dbe5"};

  border-radius: 6px;

  outline: none;

  color: ${(props) => props.theme.text};

  background-color: ${(props) =>
    props.$readOnly ? props.theme.mainBackground : props.theme.cardBackground};

  font-family: inherit;
  font-size: 12px;
  line-height: 17px;

  ${(props) =>
    props.$compact &&
    css`
      font-size: 10px;
      line-height: 16px;
    `}

  &::placeholder {
    color: ${(props) => (isDark(props) ? "#777a89" : "#8c939f")};
  }

  &:focus {
    border-color: ${(props) => (props.$readOnly ? "transparent" : "#565eef")};
  }

  ${mobile} {
    height: 64px;
    min-height: 40px;
    max-height: 200px;

    margin-bottom: 10px;
    padding: 9px 10px;

    font-size: 14px;
    line-height: 20px;

    /* по макету поле однострочное, но растёт вместе с текстом */
    @supports (field-sizing: content) {
      field-sizing: content;
      height: auto;
    }
  }
`;

/* ошибка под конкретным полем */

export const FieldError = styled.p`
  margin: 0 0 10px;

  color: ${ERROR_COLOR};

  font-size: 11px;
  line-height: 14px;

  text-align: left;

  ${mobile} {
    font-size: 12px;
    line-height: 16px;
  }
`;

/* общая ошибка формы авторизации (под полями, над кнопкой) */

export const FormError = styled.p`
  margin: 2px 0 16px;

  color: ${ERROR_COLOR};

  font-size: 12px;
  line-height: 16px;

  text-align: left;
`;

/* категории */

export const CategoryList = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;

  gap: 6px;

  ${mobile} {
    gap: 8px;
  }
`;

export const CategoryButton = styled.button`
  height: 24px;

  padding: 0 14px;

  border: none;
  border-radius: 13px;

  background-color: ${(props) => {
    const colors = props.theme.topicColors?.[props.$variant];

    return colors?.bg || "#565eef";
  }};

  color: ${(props) => {
    const colors = props.theme.topicColors?.[props.$variant];

    return colors?.text || "#FFFFFF";
  }};

  font-family: inherit;
  font-size: 10px;
  line-height: 24px;
  font-weight: 500;

  cursor: pointer;

  opacity: ${(props) => (props.$active ? 1 : 0.82)};

  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  ${mobile} {
    height: 28px;

    padding: 0 16px;

    font-size: 12px;
    line-height: 28px;
  }
`;

/* календарь */

export const Calendar = styled.div`
  width: 100%;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 0 8px;

  ${mobile} {
    margin-bottom: 12px;
  }
`;

export const CalendarMonth = styled.div`
  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#aeb1c0" : "#555b68")};

  font-size: 11px;
  line-height: 14px;
  font-weight: 500;

  ${mobile} {
    color: #94a6be;

    font-size: 14px;
    line-height: 18px;
  }
`;

export const CalendarArrow = styled.button`
  width: 20px;
  height: 20px;

  padding: 0;

  border: none;

  background: transparent;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#9ea1b2" : "#606774")};

  font-family: inherit;

  font-size: 19px;
  line-height: 18px;

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.title};
  }

  ${mobile} {
    width: 28px;
    height: 28px;

    color: #94a6be;

    font-size: 24px;
    line-height: 26px;
  }
`;

export const WeekDays = styled.div`
  display: grid;

  grid-template-columns: repeat(7, 1fr);

  margin-bottom: 3px;

  ${mobile} {
    margin-bottom: 6px;
  }
`;

export const WeekDay = styled.span`
  text-align: center;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#747787" : "#858b96")};

  font-size: 8px;
  line-height: 14px;
  font-weight: 500;

  ${mobile} {
    color: #94a6be;

    font-size: 11px;
    line-height: 16px;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(7, 1fr);

  row-gap: 2px;

  ${mobile} {
    row-gap: 4px;
  }
`;

export const DayButton = styled.button`
  width: 100%;
  height: 18px;

  padding: 0;

  border: none;
  border-radius: 4px;

  background: ${(props) => (props.$selected ? "#94a6be" : "transparent")};

  color: ${(props) =>
    props.$selected
      ? "#ffffff"
      : props.theme.text === "#FFFFFF"
        ? "#a7a9b5"
        : "#555b68"};

  font-family: inherit;

  font-size: 8px;
  line-height: 18px;

  text-align: center;

  cursor: ${(props) => (props.$empty ? "default" : "pointer")};

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$selected
        ? "#94a6be"
        : props.theme.text === "#FFFFFF"
          ? "#2c2e3a"
          : "#e6e8ec"};

    color: ${(props) => (props.$selected ? "#ffffff" : props.theme.title)};
  }

  &:disabled {
    cursor: default;
  }

  ${mobile} {
    width: 36px;
    height: 36px;

    margin: 0 auto;

    border-radius: 50%;

    color: ${(props) =>
      props.$selected ? "#ffffff" : props.theme.text};

    font-size: 12px;
    line-height: 36px;
  }
`;

export const CalendarHint = styled.p`
  margin: 10px 0 0;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#737685" : "#7d8490")};

  font-size: 8px;
  line-height: 11px;

  & b {
    color: ${(props) => props.theme.text};
    font-weight: 500;
  }

  ${mobile} {
    margin: 14px 0 18px;

    color: ${(props) => props.theme.text};

    font-size: 12px;
    line-height: 16px;
  }
`;

/* футер AddTask */

export const FormFooter = styled.div`
  grid-column: 1 / -1;

  display: flex;

  align-items: center;
  justify-content: flex-end;

  gap: 12px;

  min-height: 38px;

  margin-top: 18px;

  ${mobile} {
    order: 5;

    flex-direction: column;
    align-items: stretch;

    gap: 10px;

    margin-top: 6px;
  }
`;

export const ErrorMessage = styled.p`
  flex: 1;

  margin: 0;

  color: ${ERROR_COLOR};

  font-size: 10px;
  line-height: 14px;

  ${mobile} {
    flex: none;

    font-size: 12px;
    line-height: 16px;
  }
`;

/* крупная кнопка для авторизации: Вход / Регистрация / Выйти */

export const PrimaryButton = styled.button`
  display: block;
  width: 100%;
  box-sizing: border-box;

  height: 40px;
  padding: 0 16px;

  border: none;
  border-radius: 6px;

  background-color: #565eef;

  color: #ffffff;

  font-family: inherit;

  font-size: 14px;
  line-height: 40px;
  font-weight: 600;
  text-align: center;

  cursor: pointer;

  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #474bd0;
  }

  /* неактивная кнопка серая, как в макете «Ошибка» */
  &:disabled {
    cursor: not-allowed;
    background-color: #94a6be;
  }
`;

export const SecondaryButton = styled.button`
  box-sizing: border-box;

  height: 40px;

  padding: 0 16px;

  border: 1px solid ${(props) => (isDark(props) ? "#ffffff" : "#565eef")};
  border-radius: 6px;

  background: transparent;

  color: ${(props) => (isDark(props) ? "#ffffff" : "#565eef")};

  font-family: inherit;

  font-size: 14px;
  line-height: 38px;
  font-weight: 600;
  text-align: center;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: #565eef;
    border-color: #565eef;
    color: #ffffff;
  }
`;

/* другое */

export const Description = styled.p`
  display: flex;

  flex-direction: column;
  align-items: center;

  margin-top: 20px;
  gap: 5px;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#94a6be" : "#666d78")};

  font-size: 14px;
  line-height: 20px;

  & a {
    color: ${(props) =>
      props.theme.text === "#FFFFFF" ? "#94a6be" : "#555eef"};

    text-decoration: underline;
  }

  ${mobile} {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const Actions = styled.div`
  display: flex;

  gap: 10px;

  flex-wrap: wrap;

  & > button {
    flex: 1 1 0;
  }

  ${mobile} {
    flex-direction: column;

    & > button {
      flex: none;
      width: 100%;
    }
  }
`;

export const NotFoundTitle = styled.h1`
  margin-bottom: 15px;

  color: ${(props) => props.theme.title};

  font-size: 48px;
  font-weight: 700;
`;

export const NotFoundText = styled.p`
  margin-bottom: 25px;

  color: ${(props) => props.theme.text};

  font-size: 18px;
`;

/* CardPage: просмотр и редактирование задачи */

export const TopRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 15px;

  margin-bottom: 16px;

  ${mobile} {
    margin-bottom: 20px;
  }
`;

export const TitleEditor = styled.input`
  min-width: 0;
  flex: 1;

  padding: 0;
  margin: 0;

  border: none;
  outline: none;

  background: transparent;

  color: ${(props) => props.theme.title};

  font-family: inherit;

  font-size: 16px;
  line-height: 20px;
  font-weight: 700;

  &::placeholder {
    color: ${(props) => props.theme.title};
  }

  ${mobile} {
    font-size: 20px;
    line-height: 24px;
  }
`;

/* показывается только на десктопе / только на телефоне */

export const DesktopOnly = styled.div`
  ${mobile} {
    display: none;
  }
`;

export const CategorySection = styled.div`
  display: none;

  ${mobile} {
    display: block;

    margin-bottom: 24px;
  }
`;

export const StatusLabel = styled.div`
  margin-bottom: 10px;

  ${labelStyles}
`;

export const StatusList = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 6px;

  margin-bottom: 14px;

  ${mobile} {
    gap: 8px;

    margin-bottom: 20px;
  }
`;

export const StatusButton = styled.button`
  height: 24px;

  padding: 0 13px;

  border: 1px solid
    ${(props) =>
      props.$active
        ? "#94a6be"
        : props.theme.text === "#FFFFFF"
          ? "#464856"
          : "#c8cdd5"};

  border-radius: 13px;

  background: ${(props) => (props.$active ? "#94a6be" : "transparent")};

  color: ${(props) =>
    props.$active
      ? props.theme.text === "#FFFFFF"
        ? "#20212c"
        : "#ffffff"
      : props.theme.text === "#FFFFFF"
        ? "#aeb0bc"
        : "#626975"};

  font-family: inherit;

  font-size: 10px;
  line-height: 22px;
  font-weight: 500;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover:not(:disabled) {
    background: #94a6be;
    border-color: #94a6be;

    color: ${(props) => (props.theme.text === "#FFFFFF" ? "#20212c" : "#ffffff")};
  }

  &:disabled {
    cursor: default;
  }

  ${mobile} {
    height: 28px;

    padding: 0 14px;

    font-size: 12px;
    line-height: 26px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    145px;

  gap: 17px;

  ${mobile} {
    grid-template-columns: minmax(0, 1fr);

    gap: 0;
  }
`;

export const DescriptionLabel = styled.div`
  margin-bottom: 8px;

  ${labelStyles}

  ${mobile} {
    margin-bottom: 10px;
  }
`;

export const DateLabel = styled.div`
  margin-bottom: 8px;

  ${labelStyles}

  ${mobile} {
    margin-top: 4px;
    margin-bottom: 12px;
  }
`;

export const ErrorText = styled.div`
  margin-top: 9px;

  color: ${ERROR_COLOR};

  font-size: 10px;
  line-height: 14px;

  ${mobile} {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const BottomRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  margin-top: 17px;

  ${mobile} {
    flex-direction: column;
    align-items: stretch;

    margin-top: 20px;
  }
`;

export const LeftButtons = styled.div`
  display: flex;

  align-items: center;

  gap: 6px;

  flex-wrap: wrap;

  /* на телефоне кнопки встают в один столбец в порядке макета ($order) */
  ${mobile} {
    display: contents;
  }
`;

export const SmallButton = styled.button`
  height: 25px;

  padding: 0 12px;

  border: 1px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#858795" : "#aeb4bd")};

  border-radius: 4px;

  background: transparent;

  color: ${(props) => props.theme.text};

  font-family: inherit;

  font-size: 10px;
  line-height: 23px;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.theme.text === "#FFFFFF" ? "#30313e" : "#eef0f3"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${mobile} {
    order: ${(props) => props.$order ?? 0};

    width: 100%;
    height: 40px;

    border-color: ${(props) => (isDark(props) ? "#ffffff" : "#565eef")};
    border-radius: 6px;

    color: ${(props) => (isDark(props) ? "#ffffff" : "#565eef")};

    font-size: 14px;
    line-height: 38px;
  }
`;

/* маленькая синяя кнопка задач (Сохранить / Создать задачу / Закрыть) */

export const SaveButton = styled.button`
  min-width: 66px;

  height: 25px;

  padding: 0 13px;

  border: none;
  border-radius: 4px;

  background-color: #565eef;

  color: #ffffff;

  font-family: inherit;

  font-size: 10px;
  line-height: 25px;
  font-weight: 600;

  cursor: pointer;

  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #474bd0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  ${mobile} {
    order: ${(props) => props.$order ?? 0};

    width: 100%;
    height: 40px;

    border-radius: 6px;

    font-size: 14px;
    line-height: 40px;
  }
`;

export const DeleteButton = SmallButton;

export const CloseButton = styled(SaveButton)`
  min-width: 57px;
`;
