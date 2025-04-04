import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  InputNumber, 
  Popconfirm, 
  message, 
  Typography, 
  Space, 
  Tag, 
  Spin, 
  Card, 
  Row, 
  Col, 
  Tooltip, 
  Badge, 
  Drawer, 
  Divider,
  Alert
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined, 
  FilterOutlined,
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import moment from 'moment';
import debounce from 'lodash/debounce';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const BookingManager = () => {
  // State variables
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    status: null,
    paymentStatus: null,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      if (response.data.success) {
        setBookings(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.data.length,
        }));
      } else {
        message.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      message.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch packages for the form
  const fetchPackages = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/discover');
      if (response.data.success) {
        setPackages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    fetchPackages();
  }, [fetchBookings, fetchPackages]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        travelDate: values.travelDate ? values.travelDate.format('YYYY-MM-DD') : null,
      };

      let response;
      if (editMode) {
        response = await axios.put(`http://localhost:5000/api/bookings/${currentBooking._id}`, formattedValues);
        if (response.data.success) {
          message.success('Booking updated successfully');
          fetchBookings();
        }
      } else {
        response = await axios.post('http://localhost:5000/api/bookings', formattedValues);
        if (response.data.success) {
          message.success('Booking created successfully');
          fetchBookings();
        }
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to process booking');
    } finally {
      setLoading(false);
    }
  };

  // Handle booking deletion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      if (response.data.success) {
        message.success('Booking deleted successfully');
        fetchBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      message.error('Failed to delete booking');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (record) => {
    setCurrentBooking(record);
    setEditMode(true);
    form.setFieldsValue({
      ...record,
      travelDate: record.travelDate ? moment(record.travelDate) : null,
    });
    setModalVisible(true);
  };

  // Handle view details
  const handleViewDetails = (record) => {
    setDetailBooking(record);
    setDrawerVisible(true);
  };

  // Reset form and states when modal closes
  const handleModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
    setEditMode(false);
    setCurrentBooking(null);
  };

  // Create new booking
  const handleAddNew = () => {
    setEditMode(false);
    setCurrentBooking(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Handle search
  const handleSearch = debounce((value) => {
    setSearchText(value);
  }, 500);

  // Handle filters
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      status: null,
      paymentStatus: null,
    });
    setSearchText('');
  };

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchText === '' ||
      booking.customerName?.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.phone?.includes(searchText) ||
      booking._id?.includes(searchText);

    const matchesStatusFilter = !filters.status || booking.status === filters.status;
    const matchesPaymentFilter = !filters.paymentStatus || booking.paymentStatus === filters.paymentStatus;

    return matchesSearch && matchesStatusFilter && matchesPaymentFilter;
  });

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: id => <Text copyable ellipsis style={{ maxWidth: 120 }}>{id}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <MailOutlined style={{ marginRight: 5 }} />
            {record.email}
          </Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <PhoneOutlined style={{ marginRight: 5 }} />
            {record.phone}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Travel Details',
      dataIndex: 'travelDate',
      key: 'travelDate',
      render: (date, record) => (
        <Space direction="vertical" size="small">
          <Text>
            <CalendarOutlined style={{ marginRight: 5 }} />
            {moment(date).format('MMM DD, YYYY')}
          </Text>
          <Text type="secondary">
            <UserOutlined style={{ marginRight: 5 }} />
            {record.travelers} travelers
          </Text>
        </Space>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'finalAmount',
      key: 'finalAmount',
      render: (amount, record) => (
        <Space direction="vertical" size="small">
          <Text strong>
            <DollarOutlined style={{ marginRight: 5 }} />
            ${amount?.toFixed(2)}
          </Text>
          {record.discountAmount > 0 && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Discount: ${record.discountAmount?.toFixed(2)}
            </Text>
          )}
          {record.promoCode && (
            <Tag color="gold">Promo: {record.promoCode}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'confirmed') color = 'green';
        if (status === 'cancelled') color = 'red';
        if (status === 'pending') color = 'gold';
        
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (paymentStatus) => {
        let color = 'default';
        if (paymentStatus === 'paid') color = 'green';
        if (paymentStatus === 'failed') color = 'red';
        if (paymentStatus === 'pending') color = 'gold';
        
        return <Tag color={color}>{paymentStatus?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
              type="primary"
              ghost
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              type="default"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this booking?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="booking-manager">
      <Card bordered={false} className="header-card">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3}>Booking Management</Title>
            <Text type="secondary">Manage all travel package bookings</Text>
          </Col>
          <Col>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddNew}
              >
                New Booking
              </Button>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={fetchBookings}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ marginTop: 16 }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col xs={24} md={8}>
            <Input
              placeholder="Search by name, email, phone or ID"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={12} md={4}>
            <Select
              placeholder="Booking Status"
              style={{ width: '100%' }}
              allowClear
              onChange={(value) => handleFilterChange('status', value)}
              value={filters.status}
            >
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Col>
          <Col xs={12} md={4}>
            <Select
              placeholder="Payment Status"
              style={{ width: '100%' }}
              allowClear
              onChange={(value) => handleFilterChange('paymentStatus', value)}
              value={filters.paymentStatus}
            >
              <Option value="pending">Pending</Option>
              <Option value="paid">Paid</Option>
              <Option value="failed">Failed</Option>
            </Select>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Badge count={filteredBookings.length}>
                <Button icon={<FilterOutlined />}>
                  Filtered Results
                </Button>
              </Badge>
              <Button onClick={handleResetFilters}>
                Clear Filters
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={(newPagination) => setPagination(newPagination)}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {/* Create/Edit Booking Modal */}
      <Modal
        title={editMode ? 'Edit Booking' : 'Create New Booking'}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'pending',
            paymentStatus: 'pending',
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="packageId"
                label="Travel Package"
                rules={[{ required: true, message: 'Please select a package' }]}
              >
                <Select placeholder="Select a package">
                  {packages.map(pkg => (
                    <Option key={pkg._id} value={pkg._id}>{pkg.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="customerName"
                label="Customer Name"
                rules={[{ required: true, message: 'Please enter customer name' }]}
              >
                <Input placeholder="Full name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="travelers"
                label="Number of Travelers"
                rules={[{ required: true, message: 'Please enter number of travelers' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="travelDate"
                label="Travel Date"
                rules={[{ required: true, message: 'Please select travel date' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="promoCode" label="Promo Code">
                <Input placeholder="Promo code (if any)" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="status"
                label="Booking Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select>
                  <Option value="pending">Pending</Option>
                  <Option value="confirmed">Confirmed</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="paymentStatus"
                label="Payment Status"
                rules={[{ required: true, message: 'Please select payment status' }]}
              >
                <Select>
                  <Option value="pending">Pending</Option>
                  <Option value="paid">Paid</Option>
                  <Option value="failed">Failed</Option>
                </Select>
              </Form.Item>
            </Col>
            {editMode && (
              <Col xs={24} md={12}>
                <Form.Item name="finalAmount" label="Final Amount">
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item name="specialRequests" label="Special Requests">
            <TextArea rows={4} placeholder="Any special requirements or notes" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editMode ? 'Update Booking' : 'Create Booking'}
              </Button>
              <Button onClick={handleModalCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Booking Details Drawer */}
      <Drawer
        title="Booking Details"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={500}
        footer={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>Close</Button>
            {detailBooking && (
              <Button type="primary" onClick={() => {
                setDrawerVisible(false);
                handleEdit(detailBooking);
              }}>
                Edit Booking
              </Button>
            )}
          </Space>
        }
      >
        {detailBooking && (
          <>
            <div className="booking-detail-header">
              <Row gutter={16} align="middle">
                <Col span={24}>
                  <Alert
                    message={`Booking Status: ${detailBooking.status.toUpperCase()}`}
                    description={`Payment Status: ${detailBooking.paymentStatus.toUpperCase()}`}
                    type={
                      detailBooking.status === 'confirmed' ? 'success' :
                      detailBooking.status === 'cancelled' ? 'error' : 'warning'
                    }
                    showIcon
                  />
                </Col>
              </Row>
            </div>

            <Divider orientation="left">Customer Information</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Name:</Text> {detailBooking.customerName}
              </Col>
              <Col span={24}>
                <Text strong>Email:</Text> {detailBooking.email}
              </Col>
              <Col span={24}>
                <Text strong>Phone:</Text> {detailBooking.phone}
              </Col>
            </Row>

            <Divider orientation="left">Travel Details</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Travel Date:</Text> {moment(detailBooking.travelDate).format('MMMM DD, YYYY')}
              </Col>
              <Col span={24}>
                <Text strong>Number of Travelers:</Text> {detailBooking.travelers}
              </Col>
              {detailBooking.specialRequests && (
                <Col span={24}>
                  <Text strong>Special Requests:</Text>
                  <p>{detailBooking.specialRequests}</p>
                </Col>
              )}
            </Row>

            <Divider orientation="left">Pricing</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Original Amount:</Text> ${detailBooking.originalAmount?.toFixed(2)}
              </Col>
              <Col span={24}>
                <Text strong>Discount Amount:</Text> ${detailBooking.discountAmount?.toFixed(2)}
                {detailBooking.promoCode && ` (Promo: ${detailBooking.promoCode})`}
              </Col>
              <Col span={24}>
                <Text strong type="success">Final Amount:</Text> <Text type="success" strong>${detailBooking.finalAmount?.toFixed(2)}</Text>
              </Col>
            </Row>

            <Divider orientation="left">Booking Information</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Booking ID:</Text> <Text copyable>{detailBooking._id}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Created At:</Text> {moment(detailBooking.createdAt).format('MMMM DD, YYYY, h:mm a')}
              </Col>
            </Row>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default BookingManager;