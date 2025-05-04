"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import StateInitializer from "@/components/StateInitializer";

export default function HomeClient() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen">
      <StateInitializer />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Split expenses with roommates, hassle-free
              </h1>
              <p className="text-xl mb-8">
                Track bills, groceries, and rent. See who owes what at a glance.
                Settle up with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <button className="px-4 py-2 rounded-md font-medium transition-colors bg-white text-teal-600 hover:bg-gray-100">
                    Get Started
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-4 py-2 rounded-md font-medium transition-colors bg-transparent border border-white hover:bg-white/10">
                    Log In
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80">
                <Image
                  src="https://media.istockphoto.com/id/1473389876/photo/coins-saved-in-two-separate-glass-jars-income-sharing-concept-for-spending-and-savings.jpg?s=2048x2048&w=is&k=20&c=cTYDbHRSlUZc6TphT-BeaQm4wDo1oEkElPWYhkjpFcg="
                  alt="Expense Splitting"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Expense Splitter?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              title="Fair Splitting"
              text="Split expenses equally or by custom amounts. Our smart algorithm calculates the most efficient way to settle debts."
              iconPath="M12 8c-1.657..."
            />
            {/* Feature 2 */}
            <FeatureCard
              title="Manage Roommates"
              text="Add roommates, track who paid what, and see a clear breakdown of who owes whom."
              iconPath="M17 20h5v-2a3..."
            />
            {/* Feature 3 */}
            <FeatureCard
              title="Expense History"
              text="Keep track of all expenses with detailed history. Filter by date, category, or person."
              iconPath="M9 5H7a2..."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Create an Account",
              "Add Roommates",
              "Log Expenses",
              "Settle Up",
            ].map((step, i) => (
              <div className="text-center" key={i}>
                <div className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">
                  {
                    [
                      "Sign up and set up your profile in seconds.",
                      "Invite your roommates to join your expense group.",
                      "Add expenses as they happen and assign splits.",
                      "See who owes what and mark debts as settled.",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to simplify expense splitting?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of roommates who have made expense management
            stress-free.
          </p>
          <Link href="/register">
            <button className="px-4 py-2 rounded-md font-medium transition-colors bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started for Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, text, iconPath }) {
  return (
    <div className="card text-center">
      <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
