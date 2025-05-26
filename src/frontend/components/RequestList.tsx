import { FC } from 'react';
import { CapturedRequest } from '../../server/types';

interface RequestListProps {
  requests: CapturedRequest[];
  selectedRequestId?: string;
  onSelectRequest: (request: CapturedRequest) => void;
}

const RequestList: FC<RequestListProps> = ({ requests, selectedRequestId, onSelectRequest }) => {
  // Format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="w-1/3 overflow-y-auto border-r border-gray-700">
      {requests.length === 0 ? (
        <div className="p-4 text-gray-500 italic">
          No requests captured yet
        </div>
      ) : (
        <ul>
          {requests.map((request) => (
            <li
              key={request.id}
              onClick={() => onSelectRequest(request)}
              className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-800 ${
                selectedRequestId === request.id ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded text-xs mr-2 font-mono 
                  ${request.method === 'GET' ? 'bg-green-800' : ''} 
                  ${request.method === 'POST' ? 'bg-blue-800' : ''}
                  ${request.method === 'PUT' ? 'bg-yellow-800' : ''}
                  ${request.method === 'DELETE' ? 'bg-red-800' : ''}
                  ${['GET', 'POST', 'PUT', 'DELETE'].includes(request.method) ? '' : 'bg-purple-800'}
                `}>
                  {request.method}
                </span>
                <span className="truncate font-mono flex-1">{request.url}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatTime(request.timestamp)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestList;