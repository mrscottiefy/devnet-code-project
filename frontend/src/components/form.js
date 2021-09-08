import React from 'react';
import '../App.css';
import './form.css';
import { useForm } from "react-hook-form";
import { uploadFile, makeFileName, insertDelivery } from '../components/utilities'

function Form() {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        const { email, payment, image } = values;
       
        insertDelivery({
            email: email,
            payment: payment,
            image: image[0].name
        });
    }
    return (
        <div className="App">
            <h1>Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                />
                <input 
                    type="number"
                    name="payment"
                    {...register("payment",{
                        required: "Required",
                        min: 0,
                        message: "invalid amount"
                    })}
                />
                <input
                    type="file"
                    name="picture"
                    {...register("image",{  
                        required: "Required",
                        message: "please upload a photo"
                    })}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;
