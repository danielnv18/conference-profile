import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
`;

const Session = ({ session, index }) => (
  <Draggable draggableId={session.uuid} index={index}>
    {(provided, snapshot) => (
      <Container
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}>
        {session.title}
      </Container>
    )}
  </Draggable>
);

export default Session;
