import React from "react";
import { Divider, Table, List, Segment } from "semantic-ui-react";

const Block = props => {
  console.log(props)
  return (
    <>
            {props.block.transactions.map(i => {
            return (<>
              <Table.Row>
                <Table.Cell>{props.block.index}</Table.Cell>
                <Table.Cell>{i.sender}</Table.Cell>
                <Table.Cell>{i.recipient}</Table.Cell>
                <Table.Cell>{i.amount}</Table.Cell>
              </Table.Row>
              </>
            );
          })}
            
    </>
  );
};

export default Block;
