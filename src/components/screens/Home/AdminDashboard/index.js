import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Row, Col, Statistic } from 'antd'
import { PieChart, Pie, Cell } from 'recharts';
import LoadingIndicator from '../../../LoadingIndicator'
import axios from 'axios'



const AdminDashboard = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [stats , setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (userInfo.role !== 'ADMIN') {
      navigate('/')
    }
  }, [userInfo])

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get('/api/stats')
        setStats(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <div className="page-header" style={{
        justifyContent: 'center',
        marginBottom: '2em'
      }}>
        <h2 className="page-title"> Dashboard </h2>
       </div>
       {loading ? <LoadingIndicator /> : <>
       <div style={{
        textAlign: 'center',
       }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="Active Students" value={stats?.active_students}  />
            </Col>
            <Col span={8}>
              <Statistic title="Total Departments" value={stats?.total_departments} />
            </Col>
            <Col span={8}>
              <Statistic title="Total Batches" value={stats?.total_batches}  />
            </Col>
          </Row>
          <Row style={{marginTop: '2em'}}>
          <Col span={8}>
              <Statistic title="Total Fee Collection" value={stats?.total_payment} precision={2}  />
            </Col>
            <Col span={8}>
              <Statistic title="Cash Payments" value={stats?.total_cash_payment} precision={2}  />
            </Col>
            <Col span={8}>
              <Statistic title="Online Payments" value={stats?.total_online_payment} precision={2}  />
            </Col>
          </Row>
       </div>
       <div style={{
          display: 'flex',
          justifyContent: 'space-around'
       }}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={[
              { name: 'Cash Payments', value: stats?.total_cash_payment && stats.total_cash_payment ? stats.total_cash_payment : 0 },
              { name: 'Online Payments', value: stats?.total_online_payment && stats.total_online_payment ? stats.total_online_payment : 0 },
            ]}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#2196f3"
            
            label = {({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          />
        </PieChart>

        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={[
              { name: 'Active Students', value: stats?.active_students ? stats.active_students : 0 },
              { name: 'Incative Students', value: stats?.inactive_students ? stats.inactive_students : 0 },
            ]}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            
            label = {({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          />
        </PieChart>
       </div>
       </>}
       
    </div>
  )
}

export default AdminDashboard