/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from "react";
import { TypeTaskFormState } from "../../../types/task.types";
import { useUpdateTask } from "./useUpdateTask";
import { UseCreateTask } from "./useCreateTask";
import { UseFormWatch } from 'react-hook-form';

interface IUseDeb {
  watch: UseFormWatch<TypeTaskFormState>;
  itemsId: string | undefined; 
}

export function useDebounceTask({ watch, itemsId }: IUseDeb) {
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
      updateTask(itemsId, formData); 
    }, 500),
    []
  );

  useEffect(() => {
    const { unsubscribe } = watch(formData => {
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
  }, [watch(), debounceUpdateTask, debouncedCreateTask]); 
}
