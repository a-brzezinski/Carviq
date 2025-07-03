import { CreateListingForm } from "@/components/forms/CreateListingForm";

export default function CreateListingPage() {
  return (
    <div className="flex min-h-screen flex-col pt-24">
      <h1 className="text-2xl font-bold">Create listing</h1>
      <p className="text-sm text-gray-500">Add your car to the list</p>
      <CreateListingForm />
    </div>
  );
}
