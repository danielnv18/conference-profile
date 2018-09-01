import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "../componets/Column";
import querySchedule from "./../hoc/SessionsQuery";
import find from "lodash.find";
import findindex from "lodash.findindex";

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
    const { destination, source, draggableId } = result;
    const { columns } = this.state;

    // If there is no destination.
    if (!destination) {
      return;
    }

    // If the destination is the same as the source.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = find(columns, ["id", source.droppableId]);
    const finnish = find(columns, ["id", destination.droppableId]);

    // Moving within the same column.
    if (start === finnish) {
      const index = findindex(columns, ["id", source.droppableId]);
      const newSessionIds = Array.from(start.sessionsIds);
      newSessionIds.splice(source.index, 1);
      newSessionIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        sessionsIds: newSessionIds
      };

      const newColumns = columns.splice(index, 1, newColumn);
      this.setState({ column: newColumns });
      return;
    }

    // Moving in a different column.
    const startSessionIds = Array.from(start.sessionsIds);
    startSessionIds.splice(source.index, 1);
    const newStart = {
      ...start,
      sessionsIds: startSessionIds
    };

    const finishSessionIds = Array.from(finnish.sessionsIds);
    finishSessionIds.splice(destination.index, 0, draggableId);
    const newFinnish = {
      ...finnish,
      sessionsIds: finishSessionIds
    };

    const indexStart = findindex(columns, ["id", source.droppableId]);
    const indexFinish = findindex(columns, ["id", destination.droppableId]);

    let newColumns = null;
    newColumns = columns.splice(indexStart, 1, newStart);
    newColumns = columns.splice(indexFinish, 1, newFinnish);
    this.setState({ column: newColumns });
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
