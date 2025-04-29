import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  Users,
  Receipt,
  PieChart,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Split Expenses,{" "}
              <span className="text-yellow-300">Not Friendships</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              The easiest way to track, split, and settle expenses with your
              roommates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RoomSplit?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes expense sharing simple, fair, and drama-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-indigo-600 text-white p-3 rounded-lg inline-block mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easy Expense Tracking
              </h3>
              <p className="text-gray-600">
                Add expenses on the go and let our app handle the math. No more
                spreadsheets or calculators needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-purple-600 text-white p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Multiple Roommates
              </h3>
              <p className="text-gray-600">
                Whether you have 2 roommates or 10, our app scales to handle all
                your shared expenses fairly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-600 text-white p-3 rounded-lg inline-block mb-4">
                <Receipt className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Bill Splitting
              </h3>
              <p className="text-gray-600">
                Split rent, utilities, groceries, and other shared expenses with
                just a few taps.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-green-600 text-white p-3 rounded-lg inline-block mb-4">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Debt Calculation
              </h3>
              <p className="text-gray-600">
                Our smart algorithm calculates who owes what to whom, minimizing
                the number of transactions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-yellow-600 text-white p-3 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your financial data stays private and secure. We use
                industry-standard encryption.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-pink-600 text-white p-3 rounded-lg inline-block mb-4">
                <ArrowRight className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instant Settlements
              </h3>
              <p className="text-gray-600">
                Mark expenses as settled once they're paid back, keeping your
                financial history clean.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy roommates who use RoomSplit every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Jessica T.</h4>
                  <p className="text-gray-500 text-sm">Student, NYC</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "RoomSplit saved my friendships! No more awkward money
                conversations with my roommates. We just check the app and know
                exactly who owes what."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Michael R.</h4>
                  <p className="text-gray-500 text-sm">Professional, Chicago</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As the one who always paid for everything, I was tired of
                chasing people for money. Now with RoomSplit, everyone can see
                what they owe in real-time."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah L.</h4>
                  <p className="text-gray-500 text-sm">Grad Student, Boston</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The debt calculation feature is genius! Instead of everyone
                paying everyone back, the app figures out the minimum
                transactions needed. So simple!"
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to simplify your shared expenses?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Join thousands of roommates who have made expense splitting
            stress-free.
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium text-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started for Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
