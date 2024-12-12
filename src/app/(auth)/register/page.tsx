"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputFields";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import { auth } from "@/services/firebase";
import { registerValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = registerValidation();

    const submitForm = async (values: any) => {
        console.log("Registering user with:", values);
    
        if (values.password !== values.cnfPassword) {
            alert("Passwords do not match");
            return;
        }
    
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                alert("User Registered Successfully");
                router.push("/feed"); // Redirect to feed
            })
            .catch((e) => {
                console.error("Registration Error:", e.code, e.message);
    
                if (e.code === "auth/email-already-in-use") {
                    alert("This email is already in use. Please use a different email.");
                } else if (e.code === "auth/weak-password") {
                    alert("Password is too weak. Please use a stronger password.");
                } else {
                    alert("Something went wrong. Please try again.");
                }
            });
    };
    

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60">
            <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Welcome To Register</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    <InputField
                        register={register}
                        error={errors.cnfPassword}
                        type="password"
                        placeholder="Enter Your Confirm Password Here..."
                        name="cnfPassword"
                        label="Confirm Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Already have an account?  
                        <Link href={LOGIN_ROUTE}><span className="text-blue-500 font-semibold text-md"> Login Here</span></Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
