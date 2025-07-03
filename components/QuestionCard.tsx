
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string;
  onAnswerChange: (questionId: string, value: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentAnswer, onAnswerChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200 transition-shadow hover:shadow-md">
      <p className="text-lg font-medium text-gray-700 mb-3" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{question.text}</p>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        {question.options.map(option => (
          <label
            key={option.value}
            className={`flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-all duration-150 ease-in-out
                        ${currentAnswer === option.value 
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-md ring-2 ring-emerald-300' 
                          : 'bg-gray-50 border-gray-300 hover:bg-emerald-100 hover:border-emerald-300 text-gray-700'}`}
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={currentAnswer === option.value}
              onChange={() => onAnswerChange(question.id, option.value)}
              className="form-radio h-5 w-5 text-emerald-600 focus:ring-emerald-500 sr-only" // Hidden, label is clickable
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
