/* eslint-disable react-refresh/only-export-components */
import type { Dispatch, SetStateAction } from "react";
import type { ITaskResponse, TypeTaskFormState } from "../../../types/task.types";
import { useDebounceTask } from "../hook/useDebounceTask";
import { Controller, useForm } from 'react-hook-form';
import {   Button, Select, Checkbox, Row, Col, DatePicker } from "antd";
import useDeleteTask from "../hook/useDeleteTask";
import { DeleteOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import cn from 'clsx';
import { observer } from "mobx-react-lite";
import styles from './List.module.scss'
import dayjs from "dayjs";


interface IListRow {
  item: ITaskResponse;
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

function List({ item, setItems }: IListRow) {
  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      isCompleted: item.isCompleted,
      createdAt: item.createdAt,
      priority: item.priority,
    },
  });

  useDebounceTask({ watch, itemId: item.id });

  const { deleteTask } = useDeleteTask();

  
  return (
    <Row className={cn(styles.row, watch('isCompleted') ? styles.completed : '', 'animation-opacity')}>
      <Col span={6}>
        <span className={styles.inputRow}>
          <Button><VerticalAlignMiddleOutlined className={styles.grip} /></Button>
  
          <Controller
            control={control}
            name='isCompleted'
            render={({ field: { value, onChange } }) => (
              <Checkbox onChange={onChange} checked={value} />
            )}
          />
          <input
            className={styles.InputTask}
            placeholder="add new task"
            {...register('name')}
          />
        </span>
      </Col>
      <Col span={6}>
      <Controller
      control={control}
      name="createdAt"
      render={({ field: { value, onChange } }) => (
        <DatePicker
          onChange={(date, dateString) => onChange(dateString)} 
          value={value ? dayjs(value) : null} 
        />
      )}
    />
      </Col>
      <Col span={6}>
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <Select
              options={['high', 'medium', 'low'].map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={onChange}
              value={value || ''}
              style={{ height: 32,
                width: 100,
                padding: '4 11',
                fontSize: 14,
                lineHeight: 1.5715}}
            />
          )}
        />
      </Col>
      <Col span={6}>
        <Button
        style={{color: '#000000'}}
          className={styles.Btn}
          type='dashed'
          onClick={() => {
            item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
          }}
        >
            { <DeleteOutlined />}
        </Button>
      </Col>
    </Row>
  )}
  

export default observer(List);
