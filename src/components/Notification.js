const Notification = ({ message, shown, type }) => {
  return <h3 className={`${type} ${shown}`}>{message}</h3>
}

export default Notification