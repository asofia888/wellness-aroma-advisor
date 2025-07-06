/**
 * アプリケーション用ロガー
 * 開発・本番環境での一貫したログ出力とエラー監視を提供
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
  stack?: string;
  userAgent?: string;
  url?: string;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private logLevel: LogLevel;
  private sessionId: string;

  constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG;
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private createLogEntry(
    level: LogLevel, 
    message: string, 
    metadata?: Record<string, any>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
      stack: error?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: this.sessionId,
      ...metadata
    };
  }

  private formatLogMessage(entry: LogEntry): string {
    const levelName = LogLevel[entry.level];
    const timestamp = entry.timestamp;
    return `[${timestamp}] ${levelName}: ${entry.message}`;
  }

  private outputLog(entry: LogEntry): void {
    const formattedMessage = this.formatLogMessage(entry);
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, entry.metadata);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, entry.metadata);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, entry.metadata);
        break;
      case LogLevel.ERROR:
      case LogLevel.CRITICAL:
        console.error(formattedMessage, entry.metadata);
        if (entry.stack) {
          console.error('Stack trace:', entry.stack);
        }
        break;
    }

    // 本番環境では外部サービスに送信
    if (process.env.NODE_ENV === 'production' && entry.level >= LogLevel.ERROR) {
      this.sendToExternalService(entry);
    }

    // ローカルストレージに重要なログを保存（デバッグ用）
    if (entry.level >= LogLevel.WARN) {
      this.saveToLocalStorage(entry);
    }
  }

  private sendToExternalService(entry: LogEntry): void {
    // 本番環境でのエラー監視サービス連携
    // 例: Sentry, LogRocket, DataDog, CloudWatch など
    try {
      // 実装例（実際のサービスに応じて変更）
      if (window.location.hostname !== 'localhost') {
        fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry)
        }).catch(err => {
          console.error('Failed to send log to external service:', err);
        });
      }
    } catch (error) {
      console.error('Logger: Failed to send to external service', error);
    }
  }

  private saveToLocalStorage(entry: LogEntry): void {
    try {
      const logs = this.getStoredLogs();
      logs.push(entry);
      
      // 最新100件のみ保持
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('app_error_logs', JSON.stringify(logs));
    } catch (error) {
      console.error('Logger: Failed to save to localStorage', error);
    }
  }

  private getStoredLogs(): LogEntry[] {
    try {
      const stored = localStorage.getItem('app_error_logs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // パブリックメソッド
  debug(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    const entry = this.createLogEntry(LogLevel.DEBUG, message, metadata);
    this.outputLog(entry);
  }

  info(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    const entry = this.createLogEntry(LogLevel.INFO, message, metadata);
    this.outputLog(entry);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    const entry = this.createLogEntry(LogLevel.WARN, message, metadata);
    this.outputLog(entry);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    const entry = this.createLogEntry(LogLevel.ERROR, message, metadata, error);
    this.outputLog(entry);
  }

  critical(message: string, error?: Error, metadata?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.CRITICAL, message, metadata, error);
    this.outputLog(entry);
  }

  // ユーザーアクション追跡
  trackUserAction(action: string, metadata?: Record<string, any>): void {
    this.info(`User Action: ${action}`, {
      type: 'user_action',
      action,
      ...metadata
    });
  }

  // パフォーマンス測定
  performance(operation: string, duration: number, metadata?: Record<string, any>): void {
    this.info(`Performance: ${operation} took ${duration}ms`, {
      type: 'performance',
      operation,
      duration,
      ...metadata
    });
  }

  // ログの取得（デバッグ用）
  getLogs(): LogEntry[] {
    return this.getStoredLogs();
  }

  // ログのクリア
  clearLogs(): void {
    localStorage.removeItem('app_error_logs');
  }

  // セッションIDの取得
  getSessionId(): string {
    return this.sessionId;
  }
}

// シングルトンインスタンス
export const logger = new Logger();

/**
 * パフォーマンス測定用デコレータ
 */
export function measurePerformance<T extends any[], R>(
  fn: (...args: T) => R,
  operationName: string
): (...args: T) => R {
  return (...args: T): R => {
    const startTime = performance.now();
    try {
      const result = fn(...args);
      const duration = performance.now() - startTime;
      logger.performance(operationName, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      logger.error(`${operationName} failed after ${duration}ms`, error as Error);
      throw error;
    }
  };
}

/**
 * 非同期パフォーマンス測定
 */
export function measureAsyncPerformance<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  operationName: string
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const startTime = performance.now();
    try {
      const result = await fn(...args);
      const duration = performance.now() - startTime;
      logger.performance(operationName, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      logger.error(`${operationName} failed after ${duration}ms`, error as Error);
      throw error;
    }
  };
}