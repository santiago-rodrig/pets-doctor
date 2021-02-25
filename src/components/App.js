import React, { Component } from "react";
import "../css/App.css";
import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myAppointments: [],
      lastId: 1,
      formDisplay: false,
      orderBy: "petName",
      orderDir: "asc",
      queryText: "",
    };
  }

  componentDidMount() {
    window
      .fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        const apts = data.map((item) => {
          item.id = this.state.lastId;

          this.setState((prevState) => ({
            lastId: prevState.lastId + 1,
          }));

          return item;
        });

        this.setState({
          myAppointments: apts,
        });
      });
  }

  addAppointment(partialApt) {
    const apt = {
      petName: partialApt.petName,
      ownerName: partialApt.ownerName,
      aptDate: partialApt.aptDate + " " + partialApt.aptTime,
      aptNotes: partialApt.aptNotes,
      id: this.state.lastId,
    };

    this.setState((prevState) => ({
      myAppointments: prevState.myAppointments.concat(apt),
      lastId: prevState.lastId + 1,
    }));
  }

  deleteAppointment(id) {
    this.setState((prevState) => ({
      myAppointments: prevState.myAppointments.filter((apt) => apt.id !== id),
    }));
  }

  toggleFormDisplay() {
    this.setState((prevState) => ({
      formDisplay: !prevState.formDisplay,
    }));
  }

  orderByChangeHandler(orderByValue) {
    this.setState({
      orderBy: orderByValue,
    });
  }

  orderDirChangeHandler(orderDirValue) {
    this.setState({
      orderDir: orderDirValue,
    });
  }

  queryTextChangeHandler(queryTextValue) {
    this.setState({
      queryText: queryTextValue,
    });
  }

  updateInfo(fieldName, fieldValue, aptId) {
    this.setState((prevState) => ({
      myAppointments: prevState.myAppointments.map((apt) => {
        if (apt.id === aptId) {
          return { ...apt, [fieldName]: fieldValue };
        }

        return apt;
      }),
    }));
  }

  render() {
    let order;
    let filteredApts = this.state.myAppointments;

    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts.sort((a, b) => {
      const comparison = a[this.state.orderBy].localeCompare(
        b[this.state.orderBy]
      );

      return comparison * order;
    });

    filteredApts = filteredApts.filter((apt) => {
      return (
        apt.petName.toLowerCase().includes(this.state.queryText) ||
        apt.ownerName.toLowerCase().includes(this.state.queryText) ||
        apt.aptNotes.toLowerCase().includes(this.state.queryText)
      );
    });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleFormDisplay={this.toggleFormDisplay.bind(this)}
                  addAppointment={this.addAppointment.bind(this)}
                />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  queryText={this.state.queryText}
                  orderByChangeHandler={this.orderByChangeHandler.bind(this)}
                  orderDirChangeHandler={this.orderDirChangeHandler.bind(this)}
                  queryTextChangeHandler={this.queryTextChangeHandler.bind(
                    this
                  )}
                />
                <ListAppointments
                  appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment.bind(this)}
                  updateInfo={this.updateInfo.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
