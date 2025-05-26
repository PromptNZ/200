import { FC } from 'react';

interface HeaderProps {
  urlFilter: string;
  onFilterChange: (filter: string) => void;
  onClearRequests: () => void;
}

const Header: FC<HeaderProps> = ({ urlFilter, onFilterChange, onClearRequests }) => {
  return (
    <header className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Two-Hundred</h1>
        
        <div className="flex space-x-4 items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Filter by URL (supports * wildcard)"
              value={urlFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white w-64"
            />
          </div>
          
          <button
            onClick={onClearRequests}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
          >
            Clear Requests
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;