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
