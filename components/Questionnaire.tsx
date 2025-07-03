
import React, { useState, useCallback } from 'react';
import { Question, QuestionCategory } from '../types';
import { QuestionCard } from './QuestionCard';
import { Button } from './Button';
import { getQuestionsData, uiStrings } from '../i18n';


interface QuestionnaireProps {
  onSubmit: (answers: Record<string, string>) => void;
  language: 'ja' | 'en';
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit, language }) => {
  const questions = getQuestionsData(language);
  const strings = uiStrings[language].questionnaire;

  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
  const [physicalDiscomfortsText, setPhysicalDiscomfortsText] = useState('');
  const [mentalEmotionalStateText, setMentalEmotionalStateText] = useState('');

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(currentAnswers).length < questions.length) {
      alert(strings.validationAlert);
      return;
    }
    onSubmit({
      ...currentAnswers,
      physicalDiscomfortsText,
      mentalEmotionalStateText,
    });
  };

  const groupedQuestions = questions.reduce((acc, q) => {
    const category = q.category;
    (acc[category] = acc[category] || []).push(q);
    return acc;
  }, {} as Record<string, Question[]>);


  return (
    <form onSubmit={handleSubmit} className="space-y-10 p-6 bg-white shadow-xl rounded-lg border border-emerald-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">{strings.title}</h2>
        <p className="text-gray-600" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          {strings.subtitle}
        </p>
      </div>

      {Object.entries(groupedQuestions).map(([category, qs]) => (
        <section key={category} className="space-y-6 p-6 bg-emerald-50 rounded-md shadow-sm">
          <h3 className="text-xl font-medium text-emerald-600 border-b-2 border-emerald-200 pb-2">
            {category}
          </h3>
          {qs.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              currentAnswer={currentAnswers[question.id]}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </section>
      ))}

      <section className="space-y-6 p-6 bg-sky-50 rounded-md shadow-sm">
        <h3 className="text-xl font-medium text-sky-600 border-b-2 border-sky-200 pb-2">
          {strings.concernsTitle}
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="physicalDiscomforts" className="block text-lg font-medium text-gray-700 mb-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
              {strings.physicalDiscomfortsLabel}
            </label>
            <textarea
              id="physicalDiscomforts"
              value={physicalDiscomfortsText}
              onChange={(e) => setPhysicalDiscomfortsText(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-gray-700"
              placeholder={strings.physicalDiscomfortsPlaceholder}
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            />
          </div>
          <div>
            <label htmlFor="mentalEmotionalState" className="block text-lg font-medium text-gray-700 mb-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
              {strings.mentalEmotionalStateLabel}
            </label>
            <textarea
              id="mentalEmotionalState"
              value={mentalEmotionalStateText}
              onChange={(e) => setMentalEmotionalStateText(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-gray-700"
              placeholder={strings.mentalEmotionalStatePlaceholder}
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            />
          </div>
        </div>
      </section>

      <div className="text-center mt-10">
        <Button type="submit" variant="primary" size="large">
          {strings.submitButton}
        </Button>
      </div>
    </form>
  );
};
