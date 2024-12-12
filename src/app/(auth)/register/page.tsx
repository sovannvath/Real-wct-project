"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputFields";
import { LOGIN_ROUTE } from "@/constants/routes";
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
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#1d2531] to-[#183c45]">
            <div className="w-full max-w-md rounded-md bg-white/10 shadow-lg flex flex-col p-6 md:p-10">
                {/* Title */}
                <div className="mb-6 text-center">
                    <span className="text-2xl md:text-3xl text-white font-mono font-semibold bg-blue-500 px-4 py-2 rounded-lg shadow">
                        Welcome To Register
                    </span>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>} {/* Validation error */}

                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>} {/* Validation error */}

                    <InputField
                        register={register}
                        error={errors.cnfPassword}
                        type="password"
                        placeholder="Confirm Your Password..."
                        name="cnfPassword"
                        label="Confirm Password"
                    />
                    {errors.cnfPassword && <p className="text-sm text-red-500">{errors.cnfPassword.message}</p>} {/* Validation error */}

                    <SubmitButton label="Register" />
                </form>
                {/* Login Link */}
                <div className="text-center mt-4">
                    <span className="text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link href={LOGIN_ROUTE}>
                            <span className="text-blue-400 font-semibold hover:underline">
                                Login Here
                            </span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
