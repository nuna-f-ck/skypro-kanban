import { Link } from "react-router-dom";

import {
  CardsItem,
  CardsCard,
  CardGroup,
  CardTheme,
  CardButton,
  CardContent,
  CardTitle,
  CardDate,
} from "./Card.styled";

const calendarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
      stroke="#94A6BE"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path
      d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125M9.75 1.21875V2.03125"
      stroke="#94A6BE"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const colorsTopics = {
  Design: "purple",
  Testing: "green",
  Development: "orange",
};

export function Card({
  id,
  title = "Название задачи",
  topic = "Testing",
  date = "30.10.23",
}) {
  const actualTheme = colorsTopics[topic] || "green";

  return (
    <CardsItem>
      <CardsCard>
        <CardGroup>
          <CardTheme $actuallyTheme={actualTheme}>
            <p>{topic}</p>
          </CardTheme>

          <Link to={`/card/${id}`}>
            <CardButton>
              <div></div>
              <div></div>
              <div></div>
            </CardButton>
          </Link>
        </CardGroup>

        <CardContent>
          <Link to={`/card/${id}`}>
            <CardTitle>{title}</CardTitle>
          </Link>

          <CardDate>
            {calendarIcon}
            <p>{date}</p>
          </CardDate>
        </CardContent>
      </CardsCard>
    </CardsItem>
  );
}

export default Card;