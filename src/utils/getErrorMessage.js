export function getErrorMessage(error, fallback) {
  if (!error?.response) {
    return "Сервер недоступен. Попробуйте позже.";
  }

  const serverMessage = error.response.data?.error;

  return serverMessage || fallback;
}
