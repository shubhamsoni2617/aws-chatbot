import React from 'react';
import { Select, Badge } from 'antd';
import type { SelectProps } from 'antd';

interface TaskStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TaskStatusSelect: React.FC<TaskStatusSelectProps> = ({ value, onChange }) => {
  const options: SelectProps['options'] = [
    {
      value: 'Completed',
      label: (
        <div className="flex items-center gap-2">
          <Badge status="success" />
          <span>Completed</span>
        </div>
      ),
    },
    {
      value: 'In Progress',
      label: (
        <div className="flex items-center gap-2">
          <Badge status="warning" />
          <span>In Progress</span>
        </div>
      ),
    },
    {
      value: 'Pending',
      label: (
        <div className="flex items-center gap-2">
          <Badge status="error" />
          <span>Pending</span>
        </div>
      ),
    },
  ];

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      style={{ width: '100%' }}
      bordered={false}
      className="task-status-select"
    />
  );
};

export default TaskStatusSelect;