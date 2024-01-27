import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, InputNumber, Slider, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ListProjects from '../GetApi/ListProjects';
import ListStatus from '../GetApi/ListStatus';
import ListPriority from '../GetApi/ListPriority';
import ListTaskType from '../GetApi/ListTaskType';
import ListAssign from '../GetApi/ListAssign';
import { https } from '../../service/config';

const { Option } = Select;
const CreateTask = () => {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState(1);
  const [maxValue, setMaxValue] = useState();
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Updated state name
  const [selectedPriorityId, setSelectedPriorityId] = useState(null);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (newValue) => {
    // Kiểm tra xem newValue có vượt quá giá trị maxValue không
    if (newValue > maxValue) {
      newValue = maxValue;
    }

    // Tính giá trị cho timeTrackingRemaining
    const timeTrackingRemaining = maxValue - newValue;

    // Cập nhật giá trị của timeTrackingSpent và timeTrackingRemaining trong form
    form.setFieldsValue({
      timeTrackingSpent: newValue,
      timeTrackingRemaining,
    });

    setInputValue(newValue);
  };

  const onValuesChange = (changedValues, allValues) => {
    if ('originalEstimate' in changedValues || 'timeTrackingSpent' in changedValues) {
      const originalEstimate = allValues['originalEstimate'] || 0;
      const timeTrackingSpent = allValues['timeTrackingSpent'] || 0;

      // Tính giá trị cho timeTrackingRemaining
      const timeTrackingRemaining = originalEstimate - timeTrackingSpent;

      // Đặt giá trị cho timeTrackingRemaining và timeTrackingSpent
      form.setFieldsValue({
        timeTrackingRemaining,
        timeTrackingSpent,
      });

      // Cập nhật maxValue cho Slider và InputNumber
      setMaxValue(originalEstimate);

      // Cập nhật inputValue để không vượt quá giá trị maxValue
      if (inputValue > originalEstimate) {
        setInputValue(originalEstimate);
      }
    }
  };

  const IntegerStep = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={maxValue * 1 || 20}
              onChange={onChange}
              value={typeof inputValue === 'number' ? inputValue : 0}
            />
          </Col>
        </Row>
      </>
    );
  };

  const handleProjectSelect = (value) => {

    setSelectedProjectId(value);
    form.setFieldsValue({
      projectId: value,
    });
  };




  const handleStatusSelect = (value) => {
    setSelectedStatusId(value);
    form.setFieldsValue({
      statusId: value,
    });
  };

  const handlePrioritySelect = (value) => {
    setSelectedPriorityId(value);
    form.setFieldsValue({
      priorityId: value,
    });
  };

  const handleTaskTypeSelect = (value) => {
    setSelectedTaskType(value);
    form.setFieldsValue({
      typeId: value,
    });
  };

  const handleAssignSelect = (value) => {
    setSelectedAssign(value);
    form.setFieldsValue({
      listUserAsign: value,
    });
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFormSubmit = () => {
    const formData = form.getFieldsValue();
    // Kiểm tra tên trường projectId và giá trị tương ứng
    console.log("projectId", formData.projectId);
    console.log(formData.statusId);
    console.log(formData.typeId);
    console.log(formData.priorityId);
    console.log(formData.listUserAsign);
    console.log(formData.originalEstimate);
    console.log(formData.description);
    console.log(formData.timeTrackingRemaining);
    console.log(formData.timeTrackingSpent);
    console.log(formData);

    // Bổ sung kiểm tra giá trị undefined và xem liệu có giá trị nào bị thiếu hay không
    Object.keys(formData).forEach(key => {
      if (formData[key] === undefined) {
        console.log(`Value for ${key} is undefined!`);
      }
    });

    https.post('/api/Project/createTask', formData)
      .then((res) => {
        message.success("Task created successfully")
        console.log("🚀 ~Task created successfully:", res.data.content)
        // Reset the form after successful submission
        form.resetFields();

        // Close the drawer if needed
        onClose();
      })
      .catch((err) => {
        message.error("Task created failed")
        console.log("🚀 ~ err:", err);
      });
  };


  return (
    <>
      <span type="text" onClick={showDrawer}>
        Create Task
      </span>
      <Drawer
        title="Create a task"
        width={720}
        onClose={onClose}
        visible={open} // Change 'visible' to 'open'
        styles={{
          zIndex: 1000,
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleFormSubmit} type="default">
              Submit
            </Button>
          </Space>
        }
      >

        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onValuesChange={onValuesChange}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="projectId"
                label="Project"
                rules={[
                  {
                    required: true,
                    message: 'Please select project',
                  },
                ]}
              >
                <ListProjects onSelect={handleProjectSelect} selectedProjectId={selectedProjectId} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="taskName"
                label="Task Name"
                rules={[
                  {
                    required: true,
                    message: 'Please fill task name',
                  },
                ]}
              >
                <Input placeholder="Please fill task name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>

              <Form.Item
                name="statusId"  // Ensure the name attribute matches this key
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please select project',
                  },
                ]}
              >
                <ListStatus onSelect={handleStatusSelect} selectedStatusId={selectedStatusId} />

              </Form.Item>


            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priorityId"
                label="Priority"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <ListPriority onSelect={handlePrioritySelect} selectedPriorityId={selectedPriorityId} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="typeId"
                label="Task Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <ListTaskType onSelect={handleTaskTypeSelect} selectedTaskType={selectedTaskType} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="listUserAsign"
                label="Assigness"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <ListAssign projectId={selectedProjectId} onSelect={handleAssignSelect} selectedAssign={selectedAssign} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeTrackingSpent"
                label="Time Tracking"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the time tracking',
                  },
                ]}
              >
                <Space style={{ width: '200%' }} direction="vertical">
                  <IntegerStep inputValue={inputValue} onChange={onChange} />
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="originalEstimate"
                label="Original Estimate"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the original estimate',
                  },
                ]}
              >
                <Input placeholder="Please fill task name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="timeTrackingSpent"
                label="Time spent"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={maxValue * 1 || 20}
                  value={inputValue}
                  onChange={(value) => {
                    // Kiểm tra xem giá trị mới có vượt quá giá trị maxValue không
                    if (value > maxValue) {
                      value = maxValue;
                    }

                    setInputValue(value);
                    form.setFieldsValue({
                      timeTrackingSpent: value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="timeTrackingRemaining"
                label="Time remaining"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => onChange(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please fill description" }]}
              >
                <ReactQuill
                  style={{ height: '200px' }}
                  value={content}
                  onChange={handleContentChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateTask;

