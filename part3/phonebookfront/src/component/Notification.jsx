const Notification = ({ message, isErrorMessage }) => {
  if (message === null) {
    return null;
  }
  if (isErrorMessage) {
    return <div className="error-msg">{message}</div>;
  }
  return <div className="success-msg">{message}</div>;
};

export default Notification;
