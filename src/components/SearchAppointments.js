import React, { Component } from "react";

class SearchAppointments extends Component {
  render() {
    const classNames = {
      petName: "sort-by dropdown-item",
      aptDate: "sort-by dropdown-item",
      ownerName: "sort-by dropdown-item",
      asc: "sort-by dropdown-item",
      desc: "sort-by dropdown-item",
    };

    switch (this.props.orderBy) {
      case "petName":
        classNames.petName += " active";

        break;
      case "aptDate":
        classNames.aptDate += " active";

        break;
      case "ownerName":
        classNames.ownerName += " active";

        break;
      default:
        break;
    }

    switch (this.props.orderDir) {
      case "asc":
        classNames.asc += " active";

        break;
      case "desc":
        classNames.desc += " active";

        break;
      default:
        break;
    }

    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              value={this.props.queryText}
              onChange={(event) =>
                this.props.queryTextChangeHandler(event.target.value)
              }
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button
                  className={classNames.petName}
                  href="#"
                  onClick={() => this.props.orderByChangeHandler("petName")}
                >
                  Pet Name
                </button>
                <button
                  className={classNames.aptDate}
                  href="#"
                  onClick={() => this.props.orderByChangeHandler("aptDate")}
                >
                  Date
                </button>
                <button
                  className={classNames.ownerName}
                  href="#"
                  onClick={() => this.props.orderByChangeHandler("ownerName")}
                >
                  Owner
                </button>
                <div role="separator" className="dropdown-divider" />
                <button
                  className={classNames.asc}
                  href="#"
                  onClick={() => this.props.orderDirChangeHandler("asc")}
                >
                  Asc
                </button>
                <button
                  className={classNames.desc}
                  href="#"
                  onClick={() => this.props.orderDirChangeHandler("desc")}
                >
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchAppointments;
