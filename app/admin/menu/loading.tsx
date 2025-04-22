import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100">
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="flex flex-col items-center gap-6">
            <h3>Loading...</h3>
            <Loader className="w-[50px] h-[50px] animate-spin" />
          </div>
        </div>
      </Card>
    </div>
  )
}
