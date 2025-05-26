import { useState, useEffect } from 'react';
import RequestList from './components/RequestList';
import RequestDetails from './components/RequestDetails';
import Header from './components/Header';
import { CapturedRequest } from '../server/types';

function App() {
  const [requests, setRequests] = useState<CapturedRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<CapturedRequest | null>(null);
  const [urlFilter, setUrlFilter] = useState('');
  
  // Fetch requests with optional filter
  const fetchRequests = async () => {
    try {
      let url = 'http://localhost:4201/requests';
      
      if (urlFilter) {
        // Determine if it's a pattern (contains *)
        if (urlFilter.includes('*')) {
          url += `?url_pattern=${encodeURIComponent(urlFilter)}`;
        } else {
          url += `?url=${encodeURIComponent(urlFilter)}`;
        }
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setRequests(data);
      
      // If there's a selected request, update it with fresh data
      if (selectedRequest) {
        const updatedRequest = data.find((r: CapturedRequest) => r.id === selectedRequest.id);
        setSelectedRequest(updatedRequest || null);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
  
  // Clear all requests
  const clearRequests = async () => {
    try {
      await fetch('http://localhost:4201/requests/clear');
      setRequests([]);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error clearing requests:', error);
    }
  };
  
  // Select a request to view details
  const handleSelectRequest = (request: CapturedRequest) => {
    setSelectedRequest(request);
  };
  
  // Initial load and polling for updates
  useEffect(() => {
    fetchRequests();
    
    // Poll for new requests every second
    const interval = setInterval(fetchRequests, 1000);
    
    return () => clearInterval(interval);
  }, [urlFilter]); // Re-run when filter changes
  
  return (
    <div className="flex flex-col h-screen">
      <Header 
        urlFilter={urlFilter}
        onFilterChange={setUrlFilter} 
        onClearRequests={clearRequests}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <RequestList 
          requests={requests} 
          selectedRequestId={selectedRequest?.id} 
          onSelectRequest={handleSelectRequest}
        />
        
        <RequestDetails request={selectedRequest} />
      </div>
    </div>
  );
}

export default App;