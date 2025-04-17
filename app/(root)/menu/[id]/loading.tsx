import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
        <div className="container px-4 py-12 mt-[40px] md:px-6 md:py-16">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-800">Loading...</h1>
          </div>
          <div className="w-full h-[200px] flex items-center justify-center">
            <Loader className="animate-spin lg:w-[100px] lg:h-[100px] w-[60px] h-[60px] text-green-800" />
          </div>
        </div>
      </div>
    );
  }
