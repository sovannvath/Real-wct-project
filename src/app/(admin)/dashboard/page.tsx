"use client";

import { Globe } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/services/firebase";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const router = useRouter();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/auth/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  // Bar chart data and options
  const barChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Total Pending Posts",
        data: [12, 19, 10, 17, 28, 24, 15], 
        backgroundColor: "#105b69",
        borderColor: "#105b69",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Performance Overview: Total Pending Posts",
      },
    },
  };

  return (
    <div className="h-[100vh] w-full p-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Card Section */}
      <div className="flex flex-wrap gap-6 h-[30%]">
        {/* Card for New Users */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <div className="flex items-center gap-4">
            <Globe className="text-blue-500 w-6 h-6" />
            <h3 className="text-gray-800 font-semibold">New Users</h3>
          </div>
          <p className="text-xl font-bold">120</p>
          <p className="text-sm text-gray-500">2.5% Since last week</p>
        </div>

        {/* Card for Total Posts */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <div className="flex items-center gap-4">
            <Globe className="text-green-500 w-6 h-6" />
            <h3 className="text-gray-800 font-semibold">Total Posts</h3>
          </div>
          <p className="text-xl font-bold">181,035</p>
          <p className="text-sm text-gray-500">1.28% Since last month</p>
        </div>

        {/* Card for Comments */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <div className="flex items-center gap-4">
            <Globe className="text-red-500 w-6 h-6" />
            <h3 className="text-gray-800 font-semibold">Total Comments</h3>
          </div>
          <p className="text-xl font-bold">89,120</p>
          <p className="text-sm text-gray-500">3.6% Since last quarter</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 bg-white p-6 rounded shadow-md">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">Performance Overview</h2>
        <div className="h-[300px] sm:h-[400px] lg:h-[500px]">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
