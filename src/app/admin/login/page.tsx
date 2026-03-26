import { adminLogin } from "../../actions/admin";

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Admin Portal Login</h1>
          <p className="mt-2 text-sm text-zinc-500">Security checkpoint</p>
        </div>
        
        <form 
          action={async (formData: FormData) => {
            "use server";
            await adminLogin(formData);
          }} 
          className="space-y-6"
        >
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
            />
          </div>
          
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-zinc-900 text-zinc-50 rounded-lg font-medium hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
