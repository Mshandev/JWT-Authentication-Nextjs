import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();

  console.log(currentUser);
  if (!currentUser?.success) redirect("/sign-in");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Next JS Authentication
        </h1>
        {currentUser ? (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {currentUser.data.userName}
            </h2>
            <p className="text-gray-600 mb-4">{currentUser.data.email}</p>
            <Logout /> {/* Logout button */}
          </>
        ) : (
          <p className="text-gray-600">No user is currently logged in.</p>
        )}
      </div>
    </div>
  );
}
