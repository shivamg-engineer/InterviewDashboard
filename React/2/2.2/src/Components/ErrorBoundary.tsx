import React from "react";

type Props = { children?: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can log the error to an external service here
    // e.g. console.error("ErrorBoundary caught:", error, info);
    void error;
    void info;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 16,
            background: "#fee",
            color: "#600",
            borderRadius: 8,
          }}
        >
          <h3>Something went wrong rendering this component.</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children as React.ReactNode;
  }
}
