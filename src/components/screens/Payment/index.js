import React from "react";
import {Table,Button, Container} from 'react-bootstrap';



const Payment = () => {
    return (
        <Container>
            <div className="title">
        <h1>Payment</h1>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Roll No</th>
          <th>BatchFee Id</th>
          <th>Payment Mode</th>
          <th>Collected By</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sefali Basnet</td>
          <td>sefali@kloudone.com</td>
          <td>19CSEC04</td>
          <td>34</td>
          <td>UPI </td>
          <td>Tshering Bhutia</td>
          <td>09/09/2022</td>
          <td>01/02/2023</td>
          <td>Paid</td>
        </tr>
      </tbody>
    </Table>
        </Container>
    )

}
export default Payment;