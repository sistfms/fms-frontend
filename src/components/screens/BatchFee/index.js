import React from "react";
import {Table,Button, Container} from 'react-bootstrap';



const BatchFee = () => {
    return (
        <Container>
            <div className="title">
        <h1> Batch Fees</h1>
        <Button>Pay Fees</Button>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Department Id</th>
          <th>Batch Id</th>
          <th>Start Year</th>
          <th>End Year</th>
          <th>Fee Name</th>
          <th>Amount</th>
          <th>Created At</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>01</td>
          <td>02</td>
          <td>2019</td>
          <td>2023</td>
          <td>7th Semester</td>
          <td>7500</td>
          <td>09/09/2022</td>
          <td>01/02/2023</td>
        </tr>
      </tbody>
    </Table>
        </Container>
    )

}
export default BatchFee;