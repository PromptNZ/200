import { FC } from 'react';
import { CapturedRequest } from '../../server/types';

interface RequestDetailsProps {
  request: CapturedRequest | null;
}

const RequestDetails: FC<RequestDetailsProps> = ({ request }) => {
  if (!request) {
    return (
      <div className="flex-1 p-6 text-gray-500 flex items-center justify-center">
        <p>Select a request to view details</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Request Details</h2>
        <div className="mb-2">
          <span className="text-gray-500">Method:</span>{' '}
          <span className="font-mono">{request.method}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">URL:</span>{' '}
          <span className="font-mono">{request.url}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">Time:</span>{' '}
          <span className="font-mono">{new Date(request.timestamp).toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Headers</h3>
        <div className="bg-gray-800 p-3 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(request.headers).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-700">
                  <td className="py-1 pr-4 font-mono text-gray-400">{key}</td>
                  <td className="py-1 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {request.body && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Body</h3>
          <pre className="bg-gray-800 p-3 rounded overflow-x-auto font-mono text-sm whitespace-pre-wrap">
            {request.body}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;