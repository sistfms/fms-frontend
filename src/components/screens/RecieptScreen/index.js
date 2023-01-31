import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Line,  } from '@react-pdf/renderer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingIndicator from '../../LoadingIndicator';
import moment from 'moment';
import BackButton from '../../BackButton';

const RecieptScreen = () => {
  const styles = StyleSheet.create({
    recieptContainer: {
      padding: 10,
      margin: 30,
      border: '1px solid #000',
    },
    recieptHeader: {
      display: 'flex',
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    recieptHeaderTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    recieptHeaderDate: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    recieptField: {
      fontSize: 10,
      marginTop: 4,
    },
    
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const feeId = location.pathname.split("/")[2];

  const [feePaymentDetails, setFeePaymentDetails] = React.useState({});
  const [feePaymentDetailsLoading, setFeePaymentDetailsLoading] = React.useState(false);
  const [acquirer_data, setAcquirerData] = React.useState(null);

  const fetchFeePaymentDetails = async () => {
    try {
      setFeePaymentDetailsLoading(true);
      const res = await axios.post('/api/payments/getFeePaymentDetails', {
        batch_fee_id: feeId,
        user_id: userInfo.user_id,
      })
      setAcquirerData(JSON.parse(res.data.payment_details.acquirer_data));
      console.log("acqd",acquirer_data)
      setFeePaymentDetails(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFeePaymentDetailsLoading(false);
    }
  }

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    }
    fetchFeePaymentDetails();
  }, [userInfo]);

  return (
    <div>
      <BackButton path={`/payment/${feeId}`} />
      <div className='page-header' style={{padding: 0, margin: 0}}>
        <h3 className='page-title' style={{padding: 0, margin: 0}}>Reciept</h3>
      </div>
      <br/>
      {feePaymentDetailsLoading ? <LoadingIndicator /> : (
      <PDFViewer style={{
        padding: 0,
        margin: 0,
        width: '100%',
        height: '85vh'
      }}>
        <Document>
          <Page>
            <View style={styles.recieptContainer}>
              <View style={styles.recieptHeader}>
                <View>
                  <Text style={styles.recieptHeaderTitle}>SIST Fee Management System </Text>
                </View>
                <Text style={styles.recieptHeaderDate}>Date: {moment().format("DD/MM/YYYY")}</Text>
              </View>

              <View>
                <Text style={{fontSize: 10, marginTop: 4, width: '54%'}}>
                    A comprehensive and fully digitized fee management system.
                </Text>
                <View style={{border: '1px solid #000', marginTop: 10}}></View>
                <Text style={{fontSize: 12, textAlign: 'center', padding: 5}}>Payment Reciept</Text>
                <View style={{border: '1px solid #000', marginBottom: 10}}></View>
              </View>

              <View style={{border: '1px solid #000', padding: '10', fontSize: 10, }}>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "50%", height: "100%", marginRight: 5, borderRight: '1px solid #000' }}>
                      {/* content for left View */}
                      <Text style={{textDecoration: 'underline'}}>Student Details</Text>
                      <Text style={styles.recieptField}>Name: {feePaymentDetails?.student_details?.name}</Text>
                      <Text style={styles.recieptField}>Department: </Text>
                      <Text style={styles.recieptField}>Batch: {feePaymentDetails?.student_details?.batch_name}</Text>
                      <Text style={styles.recieptField}>Roll No: {feePaymentDetails?.student_details?.roll_number}</Text>
                      <Text style={styles.recieptField}>Email: {feePaymentDetails?.student_details?.email}</Text>
                      <Text style={styles.recieptField}>Phone: {feePaymentDetails?.student_details?.phone}</Text>
                    </View>
                    <View style={{ width: "50%", paddingLeft: 5 }}>
                      {/* content for right View */}
                      <Text style={{textDecoration: 'underline'}}>Fee Details</Text>
                      <Text style={styles.recieptField}>Fee ID: {feePaymentDetails?.fee_details?.id}</Text>
                      <Text style={styles.recieptField}>Fee Name: {feePaymentDetails?.fee_details?.name}</Text>
                      <Text style={styles.recieptField}>Fee Amount: {feePaymentDetails?.fee_details?.amount}</Text>
                      <Text style={styles.recieptField}>Issued Date: {moment(feePaymentDetails?.fee_details?.created_at).format("DD/MM/YYYY")}</Text>
                      <Text style={styles.recieptField}>Due Date: {moment(feePaymentDetails?.fee_details?.due_date).format("DD/MM/YYYY")}</Text>
                    </View>
                  </View>
                   
                </View>
                
          
                
                <View style={{ padding: '10', fontSize: 10}}>
                  <Line style={{border: '1px solid #000'}}></Line>
                  <Text style={{fontSize: 10, textAlign: 'center'}}>Payment Details</Text>
                  <Line style={{border: '1px solid #000'}}></Line>
                  <View style={{margin: 1}}></View>
                  <View style={{display: 'flex'}}>
                  </View>
                  
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "30%", height: "120%", marginRight: 5, borderRight: '1px solid #000' }}>
                      {/* content for left View */}
                      <Text style={styles.recieptField}>Txn ID: {feePaymentDetails?.payment_details?.id}</Text>
                      <Text style={styles.recieptField}>Date: {moment(feePaymentDetails?.payment_details?.payment_date).format("DD/MM/YYYY")}</Text>
                      <Text style={styles.recieptField}>Mode: {feePaymentDetails?.payment_details?.payment_method}</Text>
                      <Text style={styles.recieptField}>Amount: Rs. {feePaymentDetails?.payment_details?.amount}</Text>
                      <Text style={styles.recieptField}>Status: Paid</Text>
                    </View>
                    <View style={{ width: "70%" }}>
                      {/* content for right View */}
                      <Text style={styles.recieptField}>Tracking ID: {feePaymentDetails?.payment_details?.razorpay_order_id}</Text>
                      <Text style={styles.recieptField}>Payment ID:  {feePaymentDetails?.payment_details?.razorpay_payment_id}</Text>
                      {acquirer_data && Object.keys(acquirer_data).map((key) => <>
                          <Text style={styles.recieptField}>{key.replace(/_/g, " ", "").toUpperCase()}: {acquirer_data[key]}</Text>
                        </>)}
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={{fontSize: 10, marginTop: 20,}}>This is a system generated reciept. No signature is required.</Text>
                </View>

            </View>
           
          </Page>
        </Document>
      </PDFViewer>
      )}
    </div>
  )
}

export default RecieptScreen;