export default function EmailWarningAlert({}) {
  return (
    <div
      className="flex items-center p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg"
      role="alert"
    >
      <div className="flex-1 text-sm font-medium">
        Your email is not confirmed. Please{" "}
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-yellow-900"
        >
          check your inbox
        </a>
      </div>
      <button className="ml-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 active:bg-yellow-300 transition-colors">
        Resend confirmation
      </button>
    </div>
  );
}
