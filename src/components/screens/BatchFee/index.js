import React from "react";
import {Table,Button, Container} from 'react-bootstrap';
import "./style.css";


const BatchFee = () => {
    return (
        <Container>
            <div className="title">
        <h1> Batch Fees</h1>
        <Button>Create Department</Button>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Department Id</th>
          <th>Department Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>01</td>
          <td>Computer Engineering</td>
        </tr>
        <tr>
          <td>2</td>
          <td>02</td>
          <td>Civil Engineering</td>
        </tr>
      </tbody>
    </Table>
        </Container>
    )

}
export default Departments;