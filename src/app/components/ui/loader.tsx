import { Loader2Icon } from "lucide-react";

export default function SmallLoader() {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader2Icon className="animate-spin w-4 h-4" color="white" />
    </div>
  );
}
