import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('DeepDox Portal Runtime Caught Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    try {
      const url = new URL(window.location.href);
      url.search = '';
      window.location.href = url.pathname;
    } catch {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07080d] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-[#101426] border border-white/10 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-500/30 text-2xl font-black">
              !
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">Review Room Encountered an Issue</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A transient state error was prevented from crashing the workspace. Click below to reload cleanly or return to the project showcase.
              </p>
            </div>
            {this.state.error && (
              <div className="text-left bg-black/40 border border-white/5 rounded-xl p-3.5 text-[11px] font-mono text-rose-300 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs shadow-md shadow-orange-500/25 hover:opacity-95 transition-all"
              >
                Reload Review Room
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-all"
              >
                Go to Showcase
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
