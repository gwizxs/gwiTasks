/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from "react";
import { TypeTaskFormState } from "../../../types/task.types";
import { useUpdateTask } from "./useUpdateTask";
import { UseCreateTask } from "./useCreateTask";
import { UseFormWatch } from 'react-hook-form';

interface IUseDeb {
  watch: UseFormWatch<TypeTaskFormState>;
  itemsId: string; 
}

export function useDebounceTask({ watch, itemsId }: IUseDeb) {
  const { updateTask } = useUpdateTask();
  const { createTask } = UseCreateTask()

  const debouncedCreateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      createTask(formData);
    }, 5000), 
    []
  );

  const debounceUpdateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      updateTask(itemsId, formData); 
    }, 500),
    [itemsId]
  );

  useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      if (itemsId) { 
        debounceUpdateTask({
          ...formData,
          priority: formData.priority || undefined
        })
      } else { 
        debouncedCreateTask(formData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [watch, debounceUpdateTask, debouncedCreateTask]); 
}
