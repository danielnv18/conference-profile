import React, { Component } from "react";
import styled from "styled-components";
import Column from "../componets/Column";
import querySchedule from "./../hoc/SessionsQuery";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 200px);
  grid-gap: 15px;
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

class Board extends Component {
  render() {
    return (
      <Grid columns={this.props.dates.length + 1}>
        <Column>
          <Title>Un-schedule</Title>
        </Column>
        {this.props.dates.map((date, index) => {
          return (
            <Column key={index}>
              <Title>{date.toDateString()}</Title>
            </Column>
          );
        })}
      </Grid>
    );
  }
}

export default querySchedule(Board);
