"use client";

import SubmitButton from "@/components/Button";
import InputField from "@/components/InputFields";
import { REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { auth } from "@/services/firebase";
import { loginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = loginValidation();
    const router = useRouter();

    const submitForm = async (values: any) => {
        try {
            // Log submitted values for debugging
            console.log("Logging in user with values: ", values);

            // Attempt to sign in the user with email and password
            const response = await signInWithEmailAndPassword(auth, values.email, values.password);

            // Store the token in localStorage for authentication purposes
            localStorage.setItem("auth-token", response.user.refreshToken);

            // Redirect the user to the feed page upon successful login
            router.push("/feed");
            console.log("Redirecting to feed page...");
        } catch (error: any) {
            // Handle errors and provide user feedback
            console.error("Login Error:", error);

            // Display error messages based on Firebase error codes
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password. Please try again.");
                    break;
                case "auth/user-not-found":
                    alert("No user found with this email. Please check your email or register.");
                    break;
                case "auth/invalid-email":
                    alert("Invalid email format. Please enter a valid email.");
                    break;
                case "auth/too-many-requests":
                    alert("Too many failed login attempts. Please try again later.");
                    break;
                default:
                    alert("Login failed. Please check your credentials and try again.");
                    break;
            }
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-white to-lightskyblue">
            <div className="w-full max-w-md rounded-md bg-white/10 shadow-lg flex flex-col p-6 md:p-10">
                {/* Title */}
                <div className="mb-6 text-center">
                    <span className="text-2xl md:text-3xl text-white bg-[lightskyblue] font-mono font-semibold px-4 py-2 rounded-lg shadow">
                        Welcome To TogetherTech
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
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>} {/* Display validation error */}

                    <InputField
                        register={register}
                        error={errors.password} 
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>} {/* Display validation error */}

                    <SubmitButton label="Log In" />
                </form>
                {/* Register Link */}
                <div className="text-center mt-4">
                    <span className="text-sm text-gray-300">
                        Don't have an account?{" "}
                        <Link href={REGISTER_ROUTE}>
                            <span className="text-blue-400 font-semibold hover:underline">
                                Register Here
                            </span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
