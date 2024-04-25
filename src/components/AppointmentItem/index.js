// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }
  return (
    <li className="list-item">
      <div className="title-container">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button
        data-testid="star"
        type="button"
        onClick={onClickStar}
        className="star-button"
      >
        <img src={starImgUrl} alt="star" className="start-img" />
      </button>
    </li>
  )
}

export default AppointmentItem
