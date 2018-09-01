import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h3``;

class TimeSlot extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
      </Container>
    );
  }
}

export default TimeSlot;
