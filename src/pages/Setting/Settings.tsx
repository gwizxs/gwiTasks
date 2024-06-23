import { SubmitHandler, useForm } from "react-hook-form";
import { TypeUserForm } from "../../types/auth.types";
import { useInitDate } from "./hook/UseInitDate";
import { useUpdateSettings } from "./hook/useUpdateSettings";
import {  Form } from "antd";
import ButtonComponent from '../../components/UI/Btn'
import InputComponent from "../../components/UI/Input";

const Settings = () => {
    const { register, handleSubmit, reset } = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitDate(reset)

    const {isPending, mutate} = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest} = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }

    return (
        <Form onFinish={handleSubmit(onSubmit)}> 
            <Form.Item label="Email" name="email" >
                <InputComponent
                id="email"
                placeholder="Enter Email"
                {...register('email', {
                    required: 'Email is required'
                })} />
            </Form.Item>
            <Form.Item label="Name" name="name" >
                <InputComponent
                id="name"
                placeholder="Enter Name"
                {...register('name')} />
            </Form.Item>
            <Form.Item label="Password" name="password" >
                <InputComponent
                id="password"
                placeholder="Enter Password"
                {...register('password')} />
            </Form.Item>
            <Form.Item> 
                <ButtonComponent
                disabled={isPending}
                >Save</ButtonComponent>
            </Form.Item>
        </Form>
    )
}


export default Settings;
