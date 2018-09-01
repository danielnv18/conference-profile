import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #bfbfba;
`;

const Title = styled.h3`
  font-size: 0.8rem;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  background: #f5f5f2;
  border: 1px solid #bfbfba;
  color: #333;
  text-transform: uppercase;
`;

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
      </Container>
    );
  }
}

export default Column;
