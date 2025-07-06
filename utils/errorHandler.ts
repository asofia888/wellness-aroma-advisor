/**
 * エラーハンドリングユーティリティ
 * アプリケーション全体で一貫したエラー処理を提供
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN',
  PDF_GENERATION = 'PDF_GENERATION',
  USER_INPUT = 'USER_INPUT'
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  context?: Record<string, any>;
  timestamp: string;
  retryable: boolean;
}

export class ErrorHandler {
  private static errorMessages = {
    ja: {
      [ErrorType.NETWORK]: 'インターネット接続を確認してください。',
      [ErrorType.API]: 'サーバーとの通信でエラーが発生しました。しばらく時間をおいてから再度お試しください。',
      [ErrorType.VALIDATION]: '入力内容を確認してください。',
      [ErrorType.PDF_GENERATION]: 'PDFの生成に失敗しました。ブラウザを更新してから再度お試しください。',
      [ErrorType.USER_INPUT]: '入力内容に問題があります。',
      [ErrorType.UNKNOWN]: '予期しないエラーが発生しました。'
    },
    en: {
      [ErrorType.NETWORK]: 'Please check your internet connection.',
      [ErrorType.API]: 'A server communication error occurred. Please try again later.',
      [ErrorType.VALIDATION]: 'Please check your input.',
      [ErrorType.PDF_GENERATION]: 'PDF generation failed. Please refresh the browser and try again.',
      [ErrorType.USER_INPUT]: 'There is an issue with your input.',
      [ErrorType.UNKNOWN]: 'An unexpected error occurred.'
    }
  };

  /**
   * エラーを分類し、AppErrorオブジェクトを作成
   */
  static createError(
    error: Error | string,
    type: ErrorType = ErrorType.UNKNOWN,
    context?: Record<string, any>
  ): AppError {
    const message = typeof error === 'string' ? error : error.message;
    const originalError = typeof error === 'string' ? undefined : error;

    return {
      type,
      message,
      originalError,
      context,
      timestamp: new Date().toISOString(),
      retryable: this.isRetryable(type)
    };
  }

  /**
   * エラーの重要度に基づいてログレベルを決定
   */
  static logError(appError: AppError): void {
    const logData = {
      type: appError.type,
      message: appError.message,
      timestamp: appError.timestamp,
      context: appError.context,
      stack: appError.originalError?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    if (appError.type === ErrorType.NETWORK || appError.type === ErrorType.API) {
      console.error('Critical Error:', logData);
    } else if (appError.type === ErrorType.VALIDATION || appError.type === ErrorType.USER_INPUT) {
      console.warn('Validation Error:', logData);
    } else {
      console.error('Application Error:', logData);
    }

    // 本番環境では外部監視サービスに送信
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(logData);
    }
  }

  /**
   * ユーザーフレンドリーなエラーメッセージを取得
   */
  static getErrorMessage(appError: AppError, language: 'ja' | 'en' = 'ja'): string {
    return this.errorMessages[language][appError.type] || this.errorMessages[language][ErrorType.UNKNOWN];
  }

  /**
   * エラーが再試行可能かどうかを判定
   */
  private static isRetryable(type: ErrorType): boolean {
    return [ErrorType.NETWORK, ErrorType.API].includes(type);
  }

  /**
   * 外部監視サービスにエラーを送信（本番環境用）
   */
  private static sendToMonitoringService(errorData: any): void {
    // 本番環境では Sentry, LogRocket, DataDog などに送信
    // 今は console.log でシミュレート
    console.log('Would send to monitoring service:', errorData);
  }

  /**
   * ネットワークエラーの検出
   */
  static isNetworkError(error: Error): boolean {
    return error.message.toLowerCase().includes('network') ||
           error.message.toLowerCase().includes('fetch') ||
           error.name === 'TypeError';
  }

  /**
   * APIエラーの検出とレスポンス解析
   */
  static async handleAPIError(response: Response): Promise<AppError> {
    let errorMessage = 'API Error';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || `HTTP ${response.status}`;
    } catch {
      errorMessage = `HTTP ${response.status} ${response.statusText}`;
    }

    return this.createError(
      new Error(errorMessage),
      ErrorType.API,
      { 
        status: response.status, 
        statusText: response.statusText,
        url: response.url 
      }
    );
  }
}

/**
 * リトライ機能付きのAPI呼び出し
 */
export class RetryableRequest {
  private maxRetries: number;
  private retryDelay: number;

  constructor(maxRetries: number = 3, retryDelay: number = 1000) {
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
  }

  async execute<T>(
    requestFn: () => Promise<T>,
    shouldRetry: (error: Error) => boolean = ErrorHandler.isNetworkError
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === this.maxRetries || !shouldRetry(lastError)) {
          throw lastError;
        }

        // 指数バックオフでリトライ間隔を増加
        const delay = this.retryDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`Retrying request (attempt ${attempt + 1}/${this.maxRetries})...`);
      }
    }

    throw lastError!;
  }
}

/**
 * 非同期操作のエラーハンドリング用デコレータ
 */
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  errorType: ErrorType = ErrorType.UNKNOWN
) {
  return async (...args: T): Promise<R | AppError> => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = ErrorHandler.createError(error as Error, errorType);
      ErrorHandler.logError(appError);
      return appError;
    }
  };
}