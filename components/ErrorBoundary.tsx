import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';
import { logger } from '../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // エラーログの記録
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    logger.critical('Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // 本番環境では外部エラー監視サービスに送信
    if (process.env.NODE_ENV === 'production') {
      // 例: Sentry, LogRocket, Bugsnag などのサービスに送信
      // errorTrackingService.captureException(error, errorDetails);
    }
  };

  private handleReload = () => {
    logger.trackUserAction('error_boundary_reload');
    window.location.reload();
  };

  private handleRetry = () => {
    logger.trackUserAction('error_boundary_retry');
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    logger.trackUserAction('error_boundary_go_home');
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 text-center">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-gray-900 mb-2">
                申し訳ございません
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                予期しないエラーが発生しました。<br />
                ページを再読み込みするか、しばらく時間をおいてから再度お試しください。
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry} 
                variant="primary" 
                size="large"
                className="w-full"
              >
                もう一度試す
              </Button>
              <Button 
                onClick={this.handleReload} 
                variant="secondary" 
                size="large"
                className="w-full"
              >
                ページを再読み込み
              </Button>
              <Button 
                onClick={this.handleGoHome} 
                variant="secondary" 
                size="large"
                className="w-full"
              >
                ホームに戻る
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                  開発用：エラー詳細
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-800 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}