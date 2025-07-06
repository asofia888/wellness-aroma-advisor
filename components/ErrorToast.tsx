import React, { useState, useEffect } from 'react';
import { AppError, ErrorHandler } from '../utils/errorHandler';

interface ToastProps {
  error: AppError | null;
  language: 'ja' | 'en';
  onDismiss: () => void;
  onRetry?: () => void;
}

export const ErrorToast: React.FC<ToastProps> = ({ error, language, onDismiss, onRetry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      // 自動で10秒後に消す（重要でないエラーの場合）
      if (!error.retryable) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, 10000);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // アニメーション後にクリア
  };

  const handleRetry = () => {
    handleDismiss();
    if (onRetry) {
      onRetry();
    }
  };

  if (!error || !isVisible) {
    return null;
  }

  const errorMessage = ErrorHandler.getErrorMessage(error, language);
  const isRetryable = error.retryable;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-white rounded-lg shadow-lg border-l-4 border-red-500 p-4
      `}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              {language === 'ja' ? 'エラーが発生しました' : 'An error occurred'}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {errorMessage}
            </p>
            {error.context && process.env.NODE_ENV === 'development' && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">
                  {language === 'ja' ? '詳細情報' : 'Details'}
                </summary>
                <pre className="mt-1 text-xs text-gray-500 bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(error.context, null, 2)}
                </pre>
              </details>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label={language === 'ja' ? '閉じる' : 'Close'}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {isRetryable && onRetry && (
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {language === 'ja' ? '再試行' : 'Retry'}
            </button>
            <button
              onClick={handleDismiss}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {language === 'ja' ? '後で' : 'Later'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface LoadingToastProps {
  isLoading: boolean;
  message: string;
  language: 'ja' | 'en';
}

export const LoadingToast: React.FC<LoadingToastProps> = ({ isLoading, message, language }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span className="text-sm font-medium text-gray-900">{message}</span>
      </div>
    </div>
  );
};

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
  onDismiss: () => void;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({ isVisible, message, onDismiss }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className="transform transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onDismiss}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};