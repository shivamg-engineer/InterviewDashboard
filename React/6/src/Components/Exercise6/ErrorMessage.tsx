const ErrorMessage = ({ message }: { message: string }) => (
  <div style={{ color: "red" }}>
    <p>Error: {message}</p>
  </div>
);

export default ErrorMessage;

