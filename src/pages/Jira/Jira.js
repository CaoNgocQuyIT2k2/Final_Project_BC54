import React, { useEffect, useState } from 'react';
import { useDrag, useDrop, DndProvider, useDragLayer } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Jira.css';
import { https } from '../../service/config';
import { fetchTaskDetail } from '../GetApi/GetApi';

const Task = ({ id, title, status, moveTask, style, taskName, priority, taskType }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id, status },
  });

  return (
    <div ref={drag} className={`task-card ${status}`} style={style}>
      <div className="task-info">
        <span className="task-details">{taskType}</span>
        <br />
        <span className="task-title">{title}</span>
        <span className="task-details">Task Name: {taskName}</span>
        <span className="task-details">Priority: {priority}</span>
      </div>
    </div>
  );
};

const useDropColumn = (status, moveTask) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getDropStyle = () => {
    if (!isOver || !canDrop) return {}; // No task is being dragged into the column or it cannot drop here

    return {
      marginTop: '40px', // Adjust the space at the top of the column
      height: '40px', // Adjust the space created when dragging a task
      backgroundColor: '#f0f0f0', // Background color of the space
    };
  };

  return [drop, getDropStyle];
};

const Jira = () => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    fetchTaskDetail(setTasks);
  }, []);

  const statusOrder = ['BACKLOG', 'SELECTED FOR DEVELOPMENT', 'IN PROGRESS', 'DONE'];

  const moveTask = (taskId, newStatus) => {
    const movedTaskIndex = tasks.findIndex(task => task.taskId === taskId);

    if (movedTaskIndex === -1) return;

    const movedTask = tasks[movedTaskIndex];
    const updatedTasks = [...tasks];
    updatedTasks.splice(movedTaskIndex, 1);
    movedTask.statusId = newStatus;
    const newStatusIndex = statusOrder.indexOf(newStatus);
    updatedTasks.splice(newStatusIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        {statusOrder.map((status) => (
          <RenderColumn key={status} status={status} moveTask={moveTask} tasks={tasks} />
        ))}
      </div>
    </DndProvider>
  );
};

const RenderColumn = ({ status, moveTask, tasks }) => {
  const [drop, getDropStyle] = useDropColumn(status, moveTask);

  const { itemType, isDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  const isDraggingTask = isDragging && itemType === 'TASK';

  const tasksInColumn = Array.isArray(tasks) ? tasks.filter((task) => task.statusId === status) : [];

  return (
    <div ref={drop} className={`column card ${status}`} key={status}>
      <h2>{status}</h2>
      {isDraggingTask && getDropStyle().height && <div style={getDropStyle()}></div>}
      {tasksInColumn.map((task, taskIndex) => (
        <Task
          key={task.taskId}
          id={task.taskId}
          title={task.taskName}
          status={task.statusId}
          moveTask={moveTask}
          style={isDraggingTask && taskIndex > 0 ? { marginBottom: '40px' } : {}}
          taskName={task.taskName}
          priority={task.priorityTask.priority}
          taskType={task.taskTypeDetail.taskType}
        />
      ))}
    </div>
  );
};

export default Jira;
