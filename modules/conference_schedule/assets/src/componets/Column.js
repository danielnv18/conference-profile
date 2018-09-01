import React, { Component } from "react";
import Session from "./Session";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #bfbfba;
  padding: 10px 12px;
`;

const Title = styled.h3`
  font-size: 0.8rem;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  background: #f5f5f2;
  border-bottom: 1px solid #bfbfba;
  color: #333;
  text-transform: uppercase;
`;

const SessionList = styled.div`
  padding: 10px 12px;
`;

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <SessionList>
          {this.props.sessions.map(session => (
            <Session key={session.uuid} session={session} />
          ))}
        </SessionList>
      </Container>
    );
  }
}

export default Column;
