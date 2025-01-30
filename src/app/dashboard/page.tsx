"use client";

import { LogOut, Music, Plus, Video } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddSubscriptionModal from "@/components/AddSubscriptionModal";
import StatsCard from "@/components/StatsCard";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "react-day-picker";
import SubscriptionCard from "@/components/SubscriptionCard";
import axios from "axios";
import { FaCirclePlus } from "react-icons/fa6";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-select";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [montlyExpense, setMontlyExpense] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMonthlyExpense();
  }, []);
  const fetchMonthlyExpense = async () => {
    try {
      const response = await axios.get("/api/get-monthly-expense");
      if (response) {
        setMontlyExpense(response.data.data);
      }
    } catch (err) {
      console.error("Error occured while loading user's montly expense:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-1 ${
          isCollapsed ? "pl-16" : "pl-60"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Hi, {session?.user?.username || ""}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your subscription overview
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex w-full p-4 gap-4">
          <StatsCard title="Monthly Expense" amount={montlyExpense} />
          <StatsCard title="Active Subscription" amount={12} />
          <StatsCard title="Next Payment" amount={29.99} />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Recent Subscriptions
          </h2>
        </div>

        {/* <button
          onClick={() => {
            console.log("button clicked");
            setModalOpen(true);
          }}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>

        <AddSubscriptionModal open={modalOpen} onOpenChange={setModalOpen} /> */}
      </div>
    </div>
  );
}
