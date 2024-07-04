/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from "react";
import { TypeTaskFormState } from "../../../types/task.types";
import { useUpdateTask } from "./useUpdateTask";
import { UseCreateTask } from "./useCreateTask";
import { UseFormWatch } from 'react-hook-form';

interface IUseDeb {
  watch: UseFormWatch<TypeTaskFormState>;
  itemId: string; 
}

export function useDebounceTask({ watch, itemId }: IUseDeb) {
  const { createTask } = UseCreateTask()
  const { updateTask } = useUpdateTask();

  const debouncedCreateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      createTask(formData);
    }, 500), 
    []
  );

  const debounceUpdateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      updateTask(itemId, formData); 
    }, 500),
    []
  );

  useEffect(() => {
    const { unsubscribe } = watch(formData => {
      if (itemId) { 
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
  }, [watch(), debounceUpdateTask, debouncedCreateTask]); 
}
