import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-100 relative"  >
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-800 opacity-0 z-10"></div> */}
            <main className="flex-1 relative z-20">
                <section className="w-full py-32" >
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter text-green-600 sm:text-4xl md:text-5xl" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>
                                    Bizning Menyularimiz
                                </h1>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10 mt-12">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div
                                    key={i}
                                    className="group relative overflow-hidden rounded-2xl border-2 border-green-400 bg-white  shadow-lg transition-all hover:border-green-500 hover:shadow-lg"
                                >
                                    <div className="relative p-6 sm:p-8">
                                        <Skeleton className="bg-green-300 w-[70%] h-6" />
                                        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                                            <Skeleton className="bg-green-300 w-[22%] h-6" />
                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

