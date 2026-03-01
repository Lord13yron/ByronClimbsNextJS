export default function ConfirmSigninPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white px-8 py-10 rounded-xl shadow-lg max-w-sm w-full text-center">
        <svg
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          className="mx-auto mb-4"
        >
          <rect width="24" height="24" rx="12" fill="#3B82F6" />
          <path
            d="M7 8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5v7A2.5 2.5 0 0 1 14.5 18h-5A2.5 2.5 0 0 1 7 15.5v-7Z"
            fill="#fff"
          />
          <path
            d="M7.5 8.75l4.5 3.25 4.5-3.25"
            stroke="#3B82F6"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Check your email
        </h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a confirmation link to your email address.
          <br />
          Please check your inbox and follow the instructions to complete your
          sign in.
        </p>
        <div className="text-sm text-gray-400">
          Didn’t receive the email? Check your spam folder or try again.
        </div>
      </div>
    </div>
  );
}
