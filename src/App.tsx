import styled from '@emotion/styled'
import { useState } from 'react';
import TaskForm, { TaskFormProps } from './components/form/task-form';
import { BsPlusSquareFill, BsArrowReturnLeft } from "react-icons/bs";
import Grid from './components/grid/grid';
import { TaskModel } from './models/task';
import { FormType } from './models/form';

const formInitialValue: Pick<TaskFormProps, 'formType' | 'defaultValue' | 'index'> = {
  formType: 'CREATE',
  index: -1,
  defaultValue: {
    assign: '',
    name: '',
    order: ''
  }
}

function App() {
  const [taskForm, SetTaskForm] = useState<Pick<TaskFormProps, 'formType' | 'defaultValue' | 'index'> | undefined>(undefined)
  const [tasks, setTasks] = useState<Array<TaskModel>>(
    [
      { assign: 'JOE', name: 'TODO-1', order: 20 },
      { assign: 'MIKE', name: 'TODO-52', order: 18 },
      { assign: 'JOHNSON', name: 'TODO-88', order: 44 },
    ]
  )

  return (
    <Wrapper>
      <Grid<TaskModel>
        data={tasks}
        columns={['assign', 'name', 'order']}
        onDelete={(index: number) => stateItemRemover(tasks, index, setTasks, SetTaskForm)}
        onEdit={(index: number) => setFormToEdit(tasks, taskForm, index, SetTaskForm)}
      />
      <GeneralButtonsWrapper>
        {
          typeof taskForm === 'undefined'
            ? <BsPlusSquareFill style={{ cursor: 'pointer' }} onClick={() => SetTaskForm(formInitialValue)} />
            : <BsArrowReturnLeft style={{ cursor: 'pointer' }} onClick={() => SetTaskForm(undefined)} />
        }
      </GeneralButtonsWrapper>
      {
        typeof taskForm !== 'undefined' && <TaskForm
          {...taskForm}
          onSubmit={(value: Pick<TaskFormProps, "defaultValue" | "index" | "formType">) => addNewTaskOrUpdateByIndex(tasks, value, setTasks, SetTaskForm)}
        />
      }
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
}))

const GeneralButtonsWrapper = styled.div(() => ({
  width: '100%',
  height: '100px',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
}))

export const stateItemRemover = (
  preState: Array<TaskModel>,
  index: number,
  seter: (value: Array<TaskModel>) => void,
  formReseter: (value: Pick<TaskFormProps, 'formType' | 'defaultValue' | 'index'> | undefined) => void
): Array<TaskModel> => {
  let preStateCopied = [...preState];
  preStateCopied.splice(index, 1);
  formReseter(undefined)
  seter(preStateCopied);
  return preStateCopied
}

export const setFormToEdit = (
  preState: Array<TaskModel>,
  taskForm: Pick<TaskFormProps, 'formType' | 'defaultValue' | 'index'> | undefined,
  index: number,
  formReseter: (value: Pick<TaskFormProps, 'formType' | 'defaultValue' | 'index'> | undefined) => void
): { defaultValue: TaskModel | undefined, index: number, formType: FormType } => {
  if (typeof taskForm !== 'undefined' || index < 0) return { defaultValue: undefined, index, formType: 'UPDATE' };
  formReseter({ defaultValue: { ...preState[index] }, index, formType: 'UPDATE' })
  return { defaultValue: { ...preState[index] }, index, formType: 'UPDATE' }
}

export const addNewTaskOrUpdateByIndex = (
  preState: Array<TaskModel>,
  value: Pick<TaskFormProps, "defaultValue" | "index" | "formType">,
  seter: (value: Array<TaskModel>) => void,
  formReseter: (value: Pick<TaskFormProps, 'formType' | 'defaultValue' | 'index'> | undefined) => void
): Array<TaskModel> => {
  formReseter(undefined)
  if (value.formType === 'CREATE') {
    seter([...preState, { ...value.defaultValue }]);
    return [...preState, { ...value.defaultValue }];
  } else {
    if (value.index < 0) {
      return preState;
    } else {
      let copiedPreState: Array<TaskModel> = [...preState];
      copiedPreState.splice(value.index, 1, { ...value.defaultValue });
      seter(copiedPreState);
      return copiedPreState
    }
  }
}