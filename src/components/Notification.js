const Notification = ({ message, shown }) => {
  return <h3 className={`confirm ${shown}`}>{message}</h3>
}

export default Notification