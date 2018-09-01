import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
`;

const Session = ({ session, index }) => {
  return (
    <Draggable draggableId={session.uuid} index={index}>
      {provided => {
        return (
          <Container
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {session.title}
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Session;
