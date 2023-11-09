const Notification = ({ notice, isErrorNotice }) => {
  const successStyle = {
    border: "3px solid green",
    color: "green",
    fontSize: "1.2rem",
    padding: "0.5rem",
    backgroundColor: "#D3D3D3",
    borderRadius: "0.5rem",
  };
  const errorStyle = {
    ...successStyle,
    border: "3px solid red",
    color: "red",
  };
  let noticeColor = isErrorNotice ? errorStyle : successStyle;

  return (
    <div style={noticeColor}>
      <p>{notice}</p>
    </div>
  );
};
export default Notification;
