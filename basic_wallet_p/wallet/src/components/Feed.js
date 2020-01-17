/* eslint-disable */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Block from "./Block.js";
import {
  Menu,
  Header,
  Form,
  Grid,
  Segment,
  Table,
  Container,
  Input,
  Button,
  Card
} from "semantic-ui-react";

const Feed = props => {
  const [id, setID] = useState("Justine");
  const [blockchain, setBlockchain] = useState([]);
  const [filt, setFilt] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/chain")
      .then(res => {
        setBlockchain(res.data.chain);
      })/* 
      .then(res => {
        filterChain(blockchain)
        console.log(filt)
      }) */
      .catch(err => console.log("Error retrieving chain", err.response));
  }, []);

  /* const filterChain = chain => {
    chain.forEach(i => {
      let filtertest = i.transactions.filter(
        j => j.recipient === id || j.sender === id
      );
      temp = [];
      if (filtertest.length > 0) {
        temp.push(i);
      }
      setFilt(temp);
    });
  }; */

  if (!blockchain) {
    return <h1>Loading...</h1>;
  } else
    return (
      <div>
        <Form onSubmit={e => setID(e.target.value)}>
                <Form.Input label="id" name="id" type="text" />
                <Button type="submit">Submit</Button>
              </Form>
        <Container style={{ padding: "5em 0em" }} text>
          <Header as="h2">User Wallet</Header>
          <Segment.Group>
            <Table cell selectable attached="top" basic verticalAlign="top">
              <Table.Header>
                <Table.HeaderCell>Block No.</Table.HeaderCell>
                <Table.HeaderCell>Sender</Table.HeaderCell>
                <Table.HeaderCell>Recipient</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {/* {filt.map(i => <Block feid={id} block={i} key={i.index} />)} */}
              </Table.Body>
            </Table>
          </Segment.Group>
        </Container>
      </div>
    );
};

export default Feed;
