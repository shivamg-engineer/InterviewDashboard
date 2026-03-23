import "./ErrorMessage.css";
type ErrormessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrormessageProps) => (
  <div className="error-box">
    <p>Error: {message}</p>
  </div>
);
