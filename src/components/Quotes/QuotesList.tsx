import React from 'react';
import { useGetQuotesQuery } from '../../api/quotesApi';

const QuotesList: React.FC = () => {
  const { data, error, isLoading } = useGetQuotesQuery();

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading quotes</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Quotes</h2>
      <ul className="space-y-4">
        {data.quotes.map((quote: any) => (
          <li key={quote.id} className="p-4 border-l-4 border-blue-500 bg-gray-50 hover:bg-gray-100 transition duration-200">
            <p className="text-lg italic text-gray-800">{quote.quote}</p>
            <span className="block text-sm text-gray-600 mt-1">{quote.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuotesList;