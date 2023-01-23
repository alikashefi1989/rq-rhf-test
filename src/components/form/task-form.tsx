import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styled from '@emotion/styled'
import { TaskModel } from "../../models/task";
import { FormType } from "../../models/form";

export interface TaskFormProps {
    formType: FormType;
    defaultValue: TaskModel;
    index: number;
    onSubmit: (value: Pick<TaskFormProps, 'defaultValue' | 'index' | 'formType'>) => void
}

const TaskForm: React.FC<TaskFormProps> = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskModel>({ resolver: yupResolver(schema) })

    return <Form onSubmit={handleSubmit((data: TaskModel) => {
            reset()
            onSubmit(props.formType, data, props.index, props.onSubmit)
        })}>
        {
            Object.keys(props.defaultValue).map((key: string, i: number) => {
                return <>
                    <Label key={i.toString() + '*'}>{key}</Label>
                    <Input
                        key={i.toString() + '#'}
                        defaultValue={props.defaultValue[key as keyof TaskModel]}
                        error={typeof errors[key as keyof TaskModel] !== 'undefined'}
                        {...register(key as keyof TaskModel)}
                    />
                    <Label key={i.toString() + '@'} isError={true}>{errors[key as keyof TaskModel]?.message}</Label>
                </>
            })
        }
        <Input error={false} type="submit" />
    </Form>
}

export default TaskForm

const schema = yup.object({
    name: yup.string().required('field required'),
    order: yup.number().required('field required'),
    assign: yup.string().required('field required'),
}).required();

export const onSubmit = (
    formType: FormType,
    defaultValue: TaskModel,
    index: number,
    callBack: (value: Pick<TaskFormProps, 'defaultValue' | 'index' | 'formType'>) => void
): Pick<TaskFormProps, 'defaultValue' | 'index' | 'formType'> => {
    callBack({ formType, index, defaultValue });
    return { formType, index, defaultValue }
};

interface InputProps {
    error: boolean
}

const Form = styled.form(() => ({
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '50px',
}))

interface LabelProps {
    isError?: boolean
}

const Label = styled.label((props: LabelProps) => ({
    width: '50%',
    height: '15px',
    marginBottom: props.isError ? '10px' : '15px',
    textAlign: 'left',
    fontWeight: props.isError ? 200 : 600,
    fontSize: props.isError ? '12px' : '25px',
    color: props.isError ? 'red' : 'black'
}))

const Input = styled.input((props: InputProps) => ({
    width: '50%',
    height: '50px',
    border: `1px solid ${props.error ? 'red' : 'black'}`,
    borderRadius: '8px',
    fontSize: '20px',
    padding: '5px'
}))