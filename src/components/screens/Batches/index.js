import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Container, Alert, Table, Button } from 'react-bootstrap'
import './style.css'
import LoadingIndicator from '../../LoadingIndicator';
import CreateBatchModal from './CreateBatchModal';
import Dropdown from 'react-bootstrap/Dropdown';
const Batches = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [batches, setBatches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // modal
  const [show, setShow] = useState(false);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/batches');
      setBatches(data);
    } catch (error) {
      setError("Failed to fetch batches");
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  const batchCreateCallback = (data) => {
    setShow(false);
    if(data.success){
      alert("Batch Created Successfully")
      fetchBatches();
    }else{
      alert("Failed to Create Batch");
    }
  }

  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
      fetchBatches();
    }

  }, [userInfo]);


  return (
    <>
    <Container className="batch-container">
      <div className='page-header'>
        <h1 className='display-4'>Batch Administration</h1>
        <Button size="lg" variant="primary" onClick={() => setShow(true)}>Create Batch</Button>
      </div>
      <div className="batch-list">
        {loading && <LoadingIndicator />}
        {error && <Alert variant='danger'>{error}</Alert>}

        {batches.length > 0 &&
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Batch Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr>
                  <td>{batch.batchId}</td>
                  <td>{batch.name}</td>
                  <td>{batch.year}</td>
                  <td>{batch.endYear}</td>
                  <td>{batch.status}</td>
                  <td><a href="">Manage Batch</a></td>
                </tr>
              ))}
            </tbody>

          </Table>
        }
      </div>
    </Container>
    <CreateBatchModal visible={show} setVisible={setShow} callback={batchCreateCallback}/>
    </>
  )
}

export default Batches