import styled from "styled-components";

/* общие страницы */

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;

  background-color: ${(props) => props.theme.mainBackground};
`;

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
`;

export const CenterPage = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* модальное окно */

export const PageModal = styled.div`
  width: 100%;
  max-width: 490px;
  max-height: calc(100vh - 100px);

  overflow-y: auto;
  box-sizing: border-box;

  padding: 30px 22px 37px;

  background-color: ${(props) => props.theme.cardBackground};

  border: 1px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#3a3b4b" : "#d4dbe5")};

  border-radius: 8px;

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);

  scrollbar-width: thin;
`;

/* заголовок */

export const PageTitle = styled.h1`
  margin: 0 0 20px;

  color: ${(props) => props.theme.title};

  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
`;

/* лабели */

export const FieldLabel = styled.label`
  display: block;

  margin: 0 0 11px;

  color: ${(props) => props.theme.title};

  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
`;

export const CategoryLabel = styled(FieldLabel)`
  margin-top: 2px;
  margin-bottom: 10px;
`;

/* для AddTaskPage */

export const Form = styled.form`
  width: 100%;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    145px;

  column-gap: 17px;
  row-gap: 0;
`;

export const LeftColumn = styled.div`
  min-width: 0;
`;

export const RightColumn = styled.div`
  min-width: 0;
`;

/* инпуты */

export const Input = styled.input`
  display: block;

  width: 100%;
  height: 39px;

  box-sizing: border-box;

  margin: 0 0 18px;
  padding: 0 10px;

  border: 1px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#464856" : "#d4dbe5")};

  border-radius: 6px;

  outline: none;

  color: ${(props) => props.theme.text};

  background-color: ${(props) => props.theme.cardBackground};

  font-family: inherit;
  font-size: 12px;

  &::placeholder {
    color: ${(props) =>
      props.theme.text === "#FFFFFF" ? "#777a89" : "#8c939f"};
  }

  &:focus {
    border-color: #565eef;
  }

  &::-webkit-calendar-picker-indicator {
    filter: ${(props) =>
      props.theme.text === "#FFFFFF" ? "invert(0.8)" : "none"};
  }
`;

/* textarea */

export const Textarea = styled.textarea`
  display: block;

  width: 100%;
  height: 155px;

  box-sizing: border-box;

  margin: 0 0 10px;
  padding: 11px 10px;

  resize: none;

  border: 1px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#464856" : "#d4dbe5")};

  border-radius: 6px;

  outline: none;

  color: ${(props) => props.theme.text};

  background-color: ${(props) => props.theme.cardBackground};

  font-family: inherit;
  font-size: 12px;
  line-height: 17px;

  &::placeholder {
    color: ${(props) =>
      props.theme.text === "#FFFFFF" ? "#777a89" : "#8c939f"};
  }

  &:focus {
    border-color: #565eef;
  }
`;

/* категории */

export const CategoryList = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;

  gap: 6px;
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
`;

export const CalendarMonth = styled.div`
  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#aeb1c0" : "#555b68")};

  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
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
`;

export const WeekDays = styled.div`
  display: grid;

  grid-template-columns: repeat(7, 1fr);

  margin-bottom: 3px;
`;

export const WeekDay = styled.span`
  text-align: center;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#747787" : "#858b96")};

  font-size: 8px;
  line-height: 14px;
  font-weight: 500;
`;

export const CalendarGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(7, 1fr);

  row-gap: 2px;
`;

export const DayButton = styled.button`
  width: 100%;
  height: 18px;

  padding: 0;

  border: none;
  border-radius: 4px;

  background: ${(props) => (props.$selected ? "#565eef" : "transparent")};

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
        ? "#565eef"
        : props.theme.text === "#FFFFFF"
          ? "#2c2e3a"
          : "#e6e8ec"};

    color: ${(props) => (props.$selected ? "#ffffff" : props.theme.title)};
  }

  &:disabled {
    cursor: default;
  }
`;

export const CalendarHint = styled.p`
  margin: 10px 0 0;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#737685" : "#7d8490")};

  font-size: 8px;
  line-height: 11px;
`;

/* футер для AddTask */

export const FormFooter = styled.div`
  grid-column: 1 / -1;

  display: flex;

  align-items: center;
  justify-content: flex-end;

  gap: 12px;

  min-height: 38px;

  margin-top: 18px;
`;

export const ErrorMessage = styled.p`
  flex: 1;

  margin: 0;

  color: #ff7676;

  font-size: 10px;
  line-height: 14px;
`;

export const PrimaryButton = styled.button`
  min-width: 103px;

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
`;

export const SecondaryButton = styled.button`
  min-height: 35px;

  padding: 0 20px;

  border: 1px solid #565eef;
  border-radius: 6px;

  background: transparent;

  color: #565eef;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background: #565eef;
    color: #ffffff;
  }
`;

/* другое */

export const Description = styled.p`
  display: flex;

  flex-direction: column;
  align-items: center;

  margin-bottom: 20px;

  color: ${(props) => (props.theme.text === "#FFFFFF" ? "#94a6be" : "#666d78")};

  font-size: 14px;
  line-height: 20px;

  & a {
    color: ${(props) =>
      props.theme.text === "#FFFFFF" ? "#94a6be" : "#555eef"};

    text-decoration: underline;
  }
`;

export const Actions = styled.div`
  display: flex;

  gap: 10px;

  flex-wrap: wrap;
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

/* CardPage редактирование задачи */

export const EditModal = styled(PageModal)`
  max-width: 490px;

  padding: 30px 22px 37px;
`;

export const TopRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 15px;

  margin-bottom: 16px;
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
`;

export const StatusLabel = styled.div`
  margin-bottom: 10px;

  color: ${(props) => props.theme.title};

  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
`;

export const StatusList = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 6px;

  margin-bottom: 14px;
`;

export const StatusButton = styled.button`
  height: 24px;

  padding: 0 13px;

  border: 1px solid
    ${(props) => (props.theme.text === "#FFFFFF" ? "#464856" : "#c8cdd5")};

  border-radius: 13px;

  background: ${(props) =>
    props.$active
      ? props.theme.text === "#FFFFFF"
        ? "#9caeca"
        : "#d8e0ee"
      : "transparent"};

  color: ${(props) =>
    props.$active
      ? "#20212c"
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

  &:hover {
    background: ${(props) =>
      props.theme.text === "#FFFFFF" ? "#9caeca" : "#d8e0ee"};

    color: #20212c;
  }
`;

export const ContentGrid = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    145px;

  gap: 17px;
`;

export const DescriptionLabel = styled.div`
  margin-bottom: 8px;

  color: ${(props) => props.theme.title};

  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
`;

export const EditTextarea = styled(Textarea)`
  width: 100%;

  height: 155px;
  min-height: 155px;

  margin: 0;

  padding: 11px 10px;

  font-size: 10px;
  line-height: 16px;
`;

export const DateLabel = styled.div`
  margin-bottom: 8px;

  color: ${(props) => props.theme.title};

  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
`;

export const EditCalendar = styled(Calendar)`
  width: 100%;
`;

export const EditCalendarHeader = styled(CalendarHeader)`
  margin-bottom: 7px;
`;

export const EditCalendarMonth = styled(CalendarMonth)`
  font-size: 10px;
  line-height: 14px;
`;

export const EditCalendarArrow = styled(CalendarArrow)`
  width: 20px;
  height: 20px;

  font-size: 19px;
  line-height: 18px;
`;

export const EditWeekDays = styled(WeekDays)`
  margin-bottom: 3px;
`;

export const EditWeekDay = styled(WeekDay)`
  font-size: 8px;
  line-height: 14px;
`;

export const EditCalendarGrid = styled(CalendarGrid)`
  row-gap: 2px;
`;

export const EditDayButton = styled(DayButton)`
  height: 18px;

  font-size: 8px;
  line-height: 18px;
`;

export const EditCalendarHint = styled(CalendarHint)`
  margin-top: 9px;

  font-size: 8px;
  line-height: 11px;
`;

export const ErrorText = styled.div`
  margin-top: 9px;

  color: #ff7676;

  font-size: 10px;
  line-height: 14px;
`;

export const BottomRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  margin-top: 17px;
`;

export const LeftButtons = styled.div`
  display: flex;

  align-items: center;

  gap: 6px;

  flex-wrap: wrap;
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
`;

export const SaveButton = styled(PrimaryButton)`
  min-width: 66px;

  height: 25px;
  min-height: 25px;

  padding: 0 13px;

  border-radius: 4px;

  font-size: 10px;
  line-height: 25px;
`;

export const DeleteButton = styled(SmallButton)`
  color: ${(props) => props.theme.text};
`;

export const CloseButton = styled(SaveButton)`
  min-width: 57px;
`;
