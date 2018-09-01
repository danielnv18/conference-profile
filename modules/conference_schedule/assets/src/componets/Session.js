import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
`;

const Session = ({ session }) => {
  return <Container>{session.title}</Container>;
};

export default Session;
