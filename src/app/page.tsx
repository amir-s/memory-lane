import { CreateMemoryForm } from "@/components/ui/CreateMemoryForm";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-medium text-center">
            Create &amp; Share{" "}
            <span className="text-secondary font-bold">Your Memories</span>
          </h1>
          <p className="py-6">
            Get Started by creating your first memory and sharing it with your
            friends.
          </p>
          <CreateMemoryForm />
        </div>
      </div>
    </div>
  );
}
