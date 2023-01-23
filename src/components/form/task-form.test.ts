import { onSubmit, TaskFormProps } from './task-form'

test('first of onSubmit in <TaskForm/> component', () => {
    const res = onSubmit(
        'CREATE',
        { assign: 'doe', name: 'T-1', order: 1 },
        5,
        (value: Pick<TaskFormProps, 'defaultValue' | 'index' | 'formType'>) => { }
    )
    expect(res.index).toEqual(5);
    expect(res.formType).toEqual('CREATE');
    expect(res.defaultValue.order).toEqual(1);
})