
'use client';  

import { useState } from 'react';  
import axios from 'axios';  
  
export default function Deploy() {  
  const [repoUrl, setRepoUrl] = useState('');  
  const [loading, setLoading] = useState(false);  
  const [deploymentId, setDeploymentId] = useState('');  
  const [status, setStatus] = useState('');  
  const [error, setError] = useState('');  
  
  const deployRepo = async () => {  
    if (!repoUrl) {  
      setError('Please enter a GitHub repository URL');  
      return;  
    }  
  
    setLoading(true);  
    setError('');  
      
    try {  
      const response = await axios.post('http://localhost:3000/upload', {  
        repoUrl  
      });  
        
      const { id } = response.data;  
      setDeploymentId(id);  
      setStatus('uploaded');  
        
      const pollStatus = async () => {  
        try {  
          const statusResponse = await axios.get(`http://localhost:3000/status?id=${id}`);  
          const deploymentStatus = statusResponse.data.status;  
          setStatus(deploymentStatus);  
            
          if (deploymentStatus === 'deployed') {  
            setLoading(false);  
          } else {  
            setTimeout(pollStatus, 2000); // done afteerrrrrr poll basically every 2 seconds  
          }  
        } catch (err) {  
          console.error('Error polling status:', err);  
          setTimeout(pollStatus, 2000);  
        }  
      };  
        
      pollStatus();  
        
    } catch (err: any) {  
      setError(err.response?.data?.message || 'Deployment failed');  
      setLoading(false);  
    }  
  };  
  
  return (  
    <main className=" h-150 w-[500px] md:w-[1152px] flex justify-center items-center  mx-auto p-1 border border-white-200 rounded-md mt-25 mb-10">
      <div className= " ">
      <div className="max-w-2xl mx-auto">  
        <h1 className="text-4xl font-bold text-center font-mono  mb-8">Deploy Your GitHub Repo 
          </h1>  
          
        <div>  
          <div className="mb-4">  
            <label htmlFor="repoUrl" className="block text-sm font-medium font-roboto text-gray-700 mb-2">  
              GitHub Repository URL  
            </label>  
            <input  
              id="repoUrl"  
              type="url"  
              value={repoUrl}  
              onChange={(e) => setRepoUrl(e.target.value)}  
              placeholder="https://github.com/nikhil008-git/react-Zellr"  
              className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"  
              disabled={loading}  
            />  
          </div>  
            
          <button  
            onClick={deployRepo}  
            disabled={loading}  
            className="w-full font-roboto bg-gray-900 dark:bg-gray-100 dark:text-black text-white py-2 px-4 rounded-md  disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"  
          >  
            {loading ? 'Deploying...' : 'Deploy Repository'}  
          </button>  
            
          {error && (  
            <div className="mt-4 p-3 bg-black-100 border border-red-400 text-black-700 rounded">  
              {error}  
            </div>  
          )}  
            
          {deploymentId && (  
            <div className="mt-6 p-4  rounded">  
              <h3 className="font-semibold mb-2">Deployment Status: {status}</h3>  
              <p className="text-sm text-gray-600 mb-2">Deployment ID: {deploymentId}</p>  
                
              {status === 'deployed' && (  
                <div className="mt-4 p-3 bg-gray-100 border border-gray-400 text-gray-700 rounded">  
                  <p className="font-semibold">Deployment Complete!</p>  
                  <p className="text-sm mt-1">  
                    Your app is now live at:{' '}  
                    <a   
                      href={`http://${deploymentId}.zellr.app`}  
                      target="_blank"  
                      rel="noopener noreferrer"  
                      className="text-blue-600 hover:underline font-mono"  
                    >  
                      {deploymentId}.zellr.app  
                    </a>  
                  </p>  
                </div>  
              )}  
            </div>  
          )}  
        </div>  
      </div>  </div>
    </main>  
  );  
}