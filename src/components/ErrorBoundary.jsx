import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary поймал ошибку:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", background: "#fee", color: "#900" }}>
          <h2>Что-то пошло не так</h2>
          <p>Обновите страницу или обратитесь к разработчику.</p>
        </div>
      );
    }
    return this.props.children;
  }
}