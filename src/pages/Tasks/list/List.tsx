/* eslint-disable react-refresh/only-export-components */
import type { Dispatch, SetStateAction } from "react";
import type { ITaskResponse, TypeTaskFormState } from "../../../types/task.types";
import { useDebounceTask } from "../hook/useDebounceTask";
import { Controller, useForm } from 'react-hook-form';
import {   Button, Input, Select, Checkbox, DatePicker } from "antd";
import useDeleteTask from "../hook/useDeleteTask";
import { DeleteOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import cn from 'clsx';
import { observer } from "mobx-react-lite";
import styles from './List.module.scss'


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

  useDebounceTask({ watch, itemsId: item.id });

  const { deleteTask } = useDeleteTask();

  return (
    <div className={cn(styles.row, watch('isCompleted') ? styles.completed : '', 'animation-opacity')}>
      <div className={styles.column}>
        <span className={styles.inputRow}>
          <Button>
            <VerticalAlignMiddleOutlined className={styles.grip} />
          </Button>

          <Controller
            control={control}
            name='isCompleted'
            render={({ field: { value, onChange } }) => (
              <Checkbox onChange={onChange} checked={value} />
            )}
          />
          <Input
          variant="borderless"
          className={styles.InputTask}
           placeholder="add new task"
          {...register('name')}>
          </Input>
        </span>
      </div>
      <div className={styles.column}>
        <Controller
          control={control}
          name='createdAt'
          render={({ field: { value, onChange } }) => (
            <DatePicker onChange={onChange}
            value={value || ''}  />
          )}
        />
      </div>
      <div className={styles.column}>
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
            />
          )}
        />
      </div>
      <div className={styles.column}>
        <Button
        className={styles.Btn}
          onClick={() => {
            item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
          }}
        >
          { <DeleteOutlined />}
        </Button>
      </div>
    </div>
  );
}

export default observer(List);
