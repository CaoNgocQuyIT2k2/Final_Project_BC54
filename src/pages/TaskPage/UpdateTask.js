import React, { useEffect, useState } from 'react';
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

const UpdateTask = ({ taskId }) => {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(1);
  const [maxValue, setMaxValue] = useState();
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedPriorityId, setSelectedPriorityId] = useState(null);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [form] = Form.useForm();
  const [taskDetails, setTaskDetails] = useState(null);

  const showEditDrawer = () => {
    setOpen(true);

    // Hardcoded taskId as 11290
    const taskId = 11290;

    // Gọi API để lấy thông tin của task cần chỉnh sửa
    https.get(`/api/Project/getTaskDetail?taskId=${taskId}`)
      .then((res) => {
        const taskDetailsData = res.data.content;
        console.log("taskDetailsData-------------", taskDetailsData)
        setTaskDetails(taskDetailsData); // Set the taskDetails here

        // Cập nhật giá trị trong form
        // Inside the showEditDrawer function after setting other fields
        form.setFieldsValue({
          projectId: taskDetailsData?.projectId,
          taskName: taskDetailsData?.taskName,
          statusId: taskDetailsData?.statusId,
          priorityId: taskDetailsData?.priorityTask?.priorityId,
          typeId: taskDetailsData?.typeId,
          listUserAsign: taskDetailsData?.assigness?.map((assign) => assign.id),
          originalEstimate: taskDetailsData?.originalEstimate,
          timeTrackingRemaining: taskDetailsData?.timeTrackingRemaining,
          timeTrackingSpent: taskDetailsData?.timeTrackingSpent,
          description: taskDetailsData?.description,
        });

        // console.log("🚀 ~ statusId:", statusId)
        // console.log("🚀 ~ typeId:", typeId)
        console.log("🚀 ~ taskDetailsData?.projectId:", taskDetailsData?.projectId)

      })
      .catch((err) => {
        console.log("Error fetching task data:", err);

        // Log the status code and response data for further debugging
        if (err.response) {
          console.log("Status Code:", err.response.status);
          console.log("Response Data:", err.response.data);
        }
      });
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

  const handleProjectSelect = (selectedProjectId) => {
    setSelectedProjectId(selectedProjectId);

    // Update the form and state with the selected project details
    form.setFieldsValue({
      projectId: selectedProjectId,
    });
  };



  const handleStatusSelect = (selectedStatusId) => {
    setSelectedStatusId(selectedStatusId);

    // Update the form and state with the selected status details
    form.setFieldsValue({
      statusId: selectedStatusId,
    });
  };
  console.log("🚀 ~ statusId:", selectedStatusId)


  const handlePrioritySelect = (selectedPriorityId) => {
    setSelectedPriorityId(selectedPriorityId);

    form.setFieldsValue({
      priorityId: selectedPriorityId,
    });
  };
  console.log("🚀 ~ priorityId:", selectedPriorityId)

  const handleTaskTypeSelect = (value) => {
    setSelectedTaskType(value);

    form.setFieldsValue({
      taskId: value,
      task: selectedTaskType ? selectedTaskType.taskType : "", // 
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

    // Bổ sung kiểm tra giá trị undefined và xem liệu có giá trị nào bị thiếu hay không
    Object.keys(formData).forEach((key) => {
      if (formData[key] === undefined) {
        console.log(`Value for ${key} is undefined!`);
      }
    });

    // Cập nhật task sử dụng API updateTask
    https.post('/api/Project/updateTask', formData)
      .then((res) => {
        message.success("Task updated successfully");
        console.log("🚀 ~ Task updated successfully:", res.data.content);
        // Đóng Drawer sau khi cập nhật thành công
        onClose();
      })
      .catch((err) => {
        message.error("Task updated failed");
        console.log("🚀 ~ err:", err);
      });
  };
  return (
    <>
      <button type="text" onClick={() => { console.log("Button clicked!"); showEditDrawer(); }}>
        Edit Task
      </button>

      <Drawer
        title="Edit Task"
        width={720}
        onClose={onClose}
        visible={open} // Ensure that 'open' state controls the visibility of the Drawer
        styles={{
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
          form={form} // Ensure that the 'form' prop is correctly connected
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
                <ListProjects
                  onSelect={handleProjectSelect}
                  selectedProjectId={selectedProjectId}
                  defaultProjectId={taskDetails?.projectId}
                />
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
                name="statusId"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please select status',
                  },
                ]}
              >
                <ListStatus
                  onSelect={handleStatusSelect}
                  selectedStatusId={selectedStatusId}
                  defaultStatusId={taskDetails?.statusId}
                />
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
                <ListPriority
                  onSelect={handlePrioritySelect}
                  selectedPriorityId={selectedPriorityId}
                  defaultPriorityId={taskDetails?.priorityTask?.priorityId}
                />
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
                <ListTaskType
                  onSelect={handleTaskTypeSelect}
                  selectedTaskType={selectedTaskType}
                  defaultTaskTypeId={taskDetails?.taskTypeDetail.id}
                />
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
                <ListAssign
                 projectId={selectedProjectId} onSelect={handleAssignSelect} selectedAssign={selectedAssign}
                  defaultAssigness={taskDetails ? taskDetails.assigness.map((assign) => assign.name) : undefined}
                />
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
                <Input value={inputValue} onChange={(e) => onChange(e.target.value)} />
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

export default UpdateTask;
