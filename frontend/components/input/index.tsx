import { ErrorField, TextField } from "@taikai/rocket-kit";
import React from "react";
import { Controller } from "react-hook-form";
import { TextFieldType } from '@taikai/rocket-kit/dist/atoms/text-field/types';


interface InputProps {
    control: any;
    errors: any;
    name: string;
    type?: TextFieldType | undefined;
    placeholder: string;
}

const Input = ({ control, errors, name, type, placeholder }: InputProps) => {
    return (
        <div className="flex flex-col gap-[4px]">

            <Controller
                name={name}
                control={control}
                render={({ field }) => <TextField type={type} {...field} placeholder={placeholder} style={{ width: '100%', fontFamily: 'Roboto' }}
                />}
            />
            {errors[name] && <ErrorField color="red" error={errors[name].message!} />}
        </div>
    );
};

export default Input;
