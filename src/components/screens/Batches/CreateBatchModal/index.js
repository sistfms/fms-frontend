import React from 'react';
import axios from 'axios';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const CreateBatchModal = ({visible, setVisible, callback}) => {
  const [batchName, setBatchName] = React.useState('');
  const [batchStartYear, setBatchStartYear] = React.useState('');
  const [batchEndYear, setBatchEndYear] = React.useState('');
  const [batchDepartment, setBatchDepartment] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setBatchName(batchDepartment + " " + batchStartYear)
    setLoading(true)
    try {
      const response = await axios.post('/batches', {
        year: batchStartYear,
        endYear: batchEndYear,
        department: batchDepartment
      })
      if(response.status === 201 || response.status === 200){
        callback({
          success: true,
          message: "Batch Created Suceessfully"
        });
      }
    }catch(err){
      console.log(err)
      callback(false);
    } finally{
      setLoading(false);
    }
  }

  return (
    <Modal show={visible} >
        <Modal.Header closeButton onHide={() => setVisible(false)}>
          <Modal.Title>Create a New Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Select onChange={(e) => setBatchDepartment(e.target.value)} value={batchDepartment}>
                <option value="" selected disabled>Select Department</option>
                <option value="CSEC">Computer Engineering</option>
                <option value="CVLC">Civil Engineering</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="startYear">
              <Form.Label>Start Year</Form.Label>
              <Form.Select value={batchStartYear} onChange={e => setBatchStartYear(e.target.value)}>
                <option selected disabled>Select Start Year</option>
                {Array.from({length: 10}, (v, i) => 2021 + i).map(year => (
                  <option value={year}>{year}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="endYear">
              <Form.Label>End Year</Form.Label>
              <Form.Select value={batchEndYear} onChange={e => setBatchEndYear(e.target.value)}>
                <option selected disabled>Select End Year</option>
                {batchStartYear && Array.from({length: 10}, (v, i) => Number(batchStartYear) + 4 + i).map(year => (
                  <option>{year}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Batch Name</Form.Label>
              <Form.Control 
                type="text" 
                disabled 
                value={batchDepartment && batchStartYear && batchDepartment + " " + batchStartYear}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisible(false)} >
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            {loading && <Spinner style={{marginRight: '.5rem'}} size='sm' />}
            Create Batch
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default CreateBatchModal