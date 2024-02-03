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
import { updateStatus } from '../GetApi/GetApi';

const { Option } = Select;


const UpdateTask = ({ taskId }) => {
  const [inputValue, setInputValue] = useState(1);
  const [maxValue, setMaxValue] = useState();
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedPriorityId, setSelectedPriorityId] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [form] = Form.useForm();
  const [taskDetails, setTaskDetails] = useState(null);


  useEffect(() => {
    // Hardcoded taskId as 11548
    const taskId = 11548;

    // Gọi API để lấy thông tin của task cần chỉnh sửa
    https.get(`/api/Project/getTaskDetail?taskId=${taskId}`)
      .then((res) => {
        const taskDetailsData = res.data.content;
        console.log("taskDetailsData-------------", taskDetailsData)
        setTaskDetails(taskDetailsData); // Set the taskDetails here
        // Cập nhật maxValue khi originalEstimate thay đổi
        setMaxValue(taskDetailsData?.originalEstimate);

        // Lấy selectedProjectId từ projectId trong taskDetailsData
        const selectedProjectId = taskDetailsData?.projectId;
        setSelectedProjectId(selectedProjectId);

        // Cập nhật giá trị trong form
        // Inside the showEditDrawer function after setting other fields
        form.setFieldsValue({
          statusId: taskDetailsData?.statusId,
          priorityId: taskDetailsData?.priorityTask?.priorityId,
          listUserAsign: taskDetailsData?.assigness?.map((assign) => assign.id),
          originalEstimate: taskDetailsData?.originalEstimate,
          timeTrackingRemaining: taskDetailsData?.timeTrackingRemaining,
          timeTrackingSpent: taskDetailsData?.timeTrackingSpent,
          description: taskDetailsData?.description,
        });

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
  }, []);

  // Hàm gọi API để cập nhật trạng thái của task
  const handleUpdateStatus = () => {
    if (taskId && selectedStatusId) {
      console.log("🚀 ~ selectedStatusId12345:", selectedStatusId)
      console.log("🚀 ~ taskId12345:", taskId)
      updateStatus(taskId, selectedStatusId)
        .then((updatedTask) => {
          // Xử lý dữ liệu trả về khi cập nhật thành công nếu cần
          console.log("Task status updated successfully:", updatedTask);
        })
        .catch((error) => {
          // Xử lý lỗi khi cập nhật không thành công nếu cần
          console.error("Error updating task status:", error);
        });
    } else {
      // Xử lý khi thiếu taskId hoặc selectedStatusId
      console.error("Task ID or Selected Status ID is missing.");
    }
  };

const onChange = (newValue) => {
    if (newValue > maxValue) {
      newValue = maxValue;
    }

    const timeTrackingRemaining = maxValue - newValue;

    form.setFieldsValue({
      timeTrackingSpent: newValue,
      timeTrackingRemaining, // Cập nhật giá trị của "Time remaining" dựa trên "Time spent" mới
    });

    setInputValue(newValue);
  };



  const onValuesChange = (changedValues, allValues) => {
    if ('originalEstimate' in changedValues || 'timeTrackingSpent' in changedValues) {
      const originalEstimate = allValues['originalEstimate'] || 0;
      console.log("🚀 ~ originalEstimate1111:", originalEstimate)
      const timeTrackingSpent = allValues['timeTrackingSpent'] || 0;
      console.log("🚀 ~ timeTrackingSpent222:", timeTrackingSpent)

      // Kiểm tra nếu originalEstimate là NaN hoặc không hợp lệ
      if (isNaN(originalEstimate)) {
        // Xử lý lỗi hoặc hiển thị thông báo cần thiết
        return;
      }

      const timeTrackingRemaining = originalEstimate - timeTrackingSpent;
      console.log('bama111111111', timeTrackingRemaining)

      form.setFieldsValue({
        timeTrackingRemaining,
        timeTrackingSpent,
      });

      // Cập nhật maxValue khi originalEstimate thay đổi
      setMaxValue(originalEstimate);

      if (inputValue > originalEstimate) {
        setInputValue(originalEstimate);
      }
    }
  };
  console.log('chame', taskDetails?.originalEstimate)
  console.log('bama', taskDetails?.timeTrackingSpent)


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

  const handleStatusSelect = (selectedStatusId) => {
    setSelectedStatusId(selectedStatusId);

    form.setFieldsValue({
      statusId: selectedStatusId,
    });
  };

  const handlePrioritySelect = (selectedPriorityId) => {
    setSelectedPriorityId(selectedPriorityId);

    form.setFieldsValue({
      priorityId: selectedPriorityId,
    });
  };

  const handleAssignSelect = (value) => {
    setSelectedAssign(value);
    form.setFieldsValue({
      listUserAsign: value,
    });
  };

  // Thêm hàm để cập nhật selectedProjectId khi một dự án được chọn
  const handleProjectSelect = (selectedProjectId) => {
    setSelectedProjectId(selectedProjectId);
  };

  return (
    <>
      <Form
        layout="vertical"
        hideRequiredMark
        form={form}
        onValuesChange={onValuesChange}
        initialValues={{
          timeTrackingSpent: 0,
          timeTrackingRemaining: 0,
          originalEstimate: taskDetails?.originalEstimate || 0, // Thêm giá trị mặc định cho originalEstimate
        }}
      >

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="statusId"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Status</p>}
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
          <Col span={24}>
            <Form.Item
              name="listUserAsign"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Assigness</p>}
              rules={[
                {
                  required: true,
                  message: 'Please choose the approver',
                },
              ]}
            >
              {/* Thêm onSelect và selectedProjectId vào prop của ListAssign */}
              <ListAssign
                projectId={selectedProjectId}
                onSelect={handleAssignSelect}
                selectedAssign={selectedAssign}
                defaultAssigness={taskDetails ? taskDetails.assigness.map((assign) => assign.name) : undefined}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="priorityId"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Priority</p>}
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
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="originalEstimate"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Original Estimate (Hours)</p>}
              rules={[
                {
                  required: true,
                  message: 'Please choose the original estimate',
                },
              ]}
              initialValue={taskDetails?.originalEstimate}
            >
              <Input placeholder="Please fill task name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="timeTrackingSpent"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Time Tracking</p>}
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
          <Col span={12}>
            <Form.Item
              name="timeTrackingSpent"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Time spent</p>}
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
          <Col span={12}>
            <Form.Item
              name="timeTrackingRemaining"
              label={<p className='text-base font-medium' style={{ margin: 0, whiteSpace: 'nowrap' }}>Time remaining</p>}
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
      </Form>
    </>
  );
};

export default UpdateTask;
