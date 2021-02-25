import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";

class ListAppointments extends Component {
  render() {
    const listItems = this.props.appointments.map(
      ({ petName, aptDate, ownerName, aptNotes, id }) => (
        <div key={id} className="pet-item col media py-3">
          <div className="mr-3">
            <button
              onClick={() => this.props.deleteAppointment(id)}
              className="pet-delete btn btn-sm btn-danger"
            >
              <FaTimes />
            </button>
          </div>

          <div className="pet-info media-body">
            <div className="pet-head d-flex">
              <span
                className="pet-name"
                onBlur={(event) =>
                  this.props.updateInfo("petName", event.target.innerText, id)
                }
                contentEditable
                suppressContentEditableWarning
              >
                {petName}
              </span>
              <span className="apt-date ml-auto">
                <Moment
                  date={aptDate}
                  parse="YYYY-MM-dd hh:mm"
                  format="MMM-D h:mma"
                />
              </span>
            </div>

            <div className="owner-name">
              <span className="label-item">Owner: </span>
              <span
                onBlur={(event) =>
                  this.props.updateInfo("ownerName", event.target.innerText, id)
                }
                contentEditable
                suppressContentEditableWarning
              >
                {ownerName}
              </span>
            </div>
            <div
              className="apt-notes"
              onBlur={(event) =>
                this.props.updateInfo("aptNotes", event.target.innerText, id)
              }
              contentEditable
              suppressContentEditableWarning
            >
              {aptNotes}
            </div>
          </div>
        </div>
      )
    );

    return <div className="appointment-list item-list mb-3">{listItems}</div>;
  }
}

export default ListAppointments;
