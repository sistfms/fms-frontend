import React from "react";
import {Table,Button, Container} from 'react-bootstrap';



const Students = () => {
    return (
        <Container>
            <div className="title">
        <h1> Students</h1>
        <div >
        <Button>Add Student</Button>
        <Button>Import Student</Button>
        </div>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Batch Id</th>
          <th>Department Name</th>
          <th>Student Name</th>
          <th>Email Id</th>
          <th>Roll No</th>
          <th>Gender</th>
          <th>Phone No</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>01</td>
          <td>Computer Engineering</td>
          <td>Sefali Basnet</td>
          <td>sefali@kloudone.com</td>
          <td>19CSEC04</td>
          <td>Female</td>
          <td>8900089820</td>
        </tr>
        <tr>
          <td>2</td>
          <td>02</td>
          <td>Civil Engineering</td>
          <td>Bhumika Rai</td>
          <td>bhumika@gmail.com</td>
          <td>19CVLCC04</td>
          <td>Female</td>
          <td>987654321</td>
        </tr>
      </tbody>
    </Table>
        </Container>
    )

}
export default Students;