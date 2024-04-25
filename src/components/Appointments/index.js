import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
  }

  starredItems = () => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.filter(
        eachItem => eachItem.isStarred === true,
      ),
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return {...eachItem}
      }),
    }))
  }

  onAdd = event => {
    event.preventDefault()
    const {title, date} = this.state

    const dateFormate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title,
      date: dateFormate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, appointmentsList} = this.state
    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="user-input-section">
            <form onSubmit={this.onAdd} className="form-container">
              <label htmlFor="userInput" className="title-label">
                TITLE
              </label>
              <input
                id="userInput"
                type="text"
                value={title}
                className="title-input"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="dateInput" className="date-label">
                DATE
              </label>
              <input
                value={date}
                id="dateInput"
                type="date"
                className="date-input"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="line" />
          <div className="appointments-list-container">
            <div className="appointments-list-heading">
              <h1 className="list-heading">Appointments</h1>
              <button
                type="button"
                className="starred-button"
                onClick={this.starredItems}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appointmentsList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
