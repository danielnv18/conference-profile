import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "../componets/Column";
import querySchedule from "./../hoc/SessionsQuery";
import find from "lodash.find";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 250px);
  grid-gap: 15px;
`;

class Board extends Component {
  constructor(props) {
    super(props);

    let columns = [
      {
        id: "un-schedule",
        title: "Un-schedule",
        date: null,
        sessionsIds: [],
        timeSlotIds: []
      }
    ];
    this.props.dates.forEach(date => {
      columns.push({
        id: date.toISOString(),
        title: date.toDateString(),
        date: date,
        sessionsIds: [],
        timeSlotIds: []
      });
    });

    this.state = { columns };

    this.assignSessions = this.assignSessions.bind(this);
    this.assignTimeSlots = this.assignTimeSlots.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    let { columns } = this.state;

    columns.forEach(this.assignSessions);

    this.setState({ columns });
  }

  assignSessions(column, index, columns) {
    const { sessions } = this.props;
    let sessionsIds;
    if (column.id === "un-schedule") {
      sessionsIds = sessions.map(session => {
        if (session.fieldTimeSlot === null) {
          return session.uuid;
        }
      });
    } else {
    }

    if (typeof sessionsIds !== "undefined") {
      columns[index] = { ...column, sessionsIds };
    }
  }

  assignTimeSlots() {}

  onDragEnd(result) {
    // TODO: reorder column.
  }

  render() {
    const { sessions } = this.props;
    return (
      <Grid columns={this.state.columns.length}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columns.map(column => {
            const columnSessions = column.sessionsIds.map(uuid =>
              find(sessions, ["uuid", uuid])
            );
            return (
              <Column
                key={column.id}
                column={column}
                sessions={columnSessions}
              />
            );
          })}
        </DragDropContext>
      </Grid>
    );
  }
}

export default querySchedule(Board);
