// api.js
import { https } from '../../service/config.js';


export const fetchAllProjects = (setUserArr) => {
  https.get("/api/Project/getAllProject")
    .then((res) => {
      setUserArr(res.data.content);
      console.log("🚀 ~ res.data.content:", res.data.content)
    })
    .catch((err) => {
      console.log("🚀 ~ err:", err);
    });
};

export const fetchAllStatus = (setStatus) => {
  https.get("/api/Status/getAll")
    .then((res) => {
      setStatus(res.data.content);
      console.log("🚀 ~ res.data.content:", res.data.content)
    })
    .catch((err) => {
      console.log("🚀 ~ err:", err);
    });
};


export const fetchAllPriority = (setPriority) => {
  https.get("/api/Priority/getAll?id=0")
    .then((res) => {
      setPriority(res.data.content);
      console.log("🚀 ~ res.data.content:", res.data.content)
    })
    .catch((err) => {
      console.log("🚀 ~ err:", err);
    });
};

export const fetchAllTaskType = (setTaskType) => {
  https.get("/api/TaskType/getAll")
    .then((res) => {
      setTaskType(res.data.content);
      console.log("🚀 ~ res.data.content:", res.data.content)
    })
    .catch((err) => {
      console.log("🚀 ~ err:", err);
    });
};

export const fetchAllAssigness = (projectId, setAssign) => {
  console.log("🚀 ~ projectIdin assign get api:", projectId);
  https.get(`/api/Users/getUserByProjectId?idProject=${projectId}`)
    .then((res) => {
      setAssign(res.data.content);
      console.log("🚀 ~ user in project:", res.data.content);
    })
    .catch((err) => {
      console.log("🚀 ~ err:", err);
    });
};

export const fetchTaskDetail = async (setTasks) => {
  try {
    const taskId = 11526;
    const response = await https.get(`/api/Project/getTaskDetail?taskId=${taskId}`);
    setTasks(response.data.content || []);
    console.log("🚀 ~ user in project:", response.data.content);
  } catch (error) {
    console.log("🚀 ~ err:", error);
  }
};


export const updateStatus = async (taskId, statusId) => {
  try {
    const response = await https.put(`/api/Project/updateStatus`, {
      taskId: taskId,
      statusId: statusId,
    });
    return response.data.content;
  } catch (error) {
    console.log("Error updating task status:", error);
    throw error; // Ném ra lỗi để xử lý ở component gọi hàm này
  }
};


