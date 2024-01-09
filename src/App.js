import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('json');
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [displayedData, setDisplayedData] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please choose a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    console.log('file',file,format);
    try {
      
      const response = await axios.post('http://localhost:1212/upload', formData);
      console.log("This is the data", response.data); 

      if (response.data.fields) {
        setFields(response.data.fields);
        console.log("File Content:", response.data.fileContent);

      } else {
        alert('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFieldsChange = (event) => {
    const field = event.target.value;
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((selectedField) => selectedField !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleDisplayData = async () => {
    if (selectedFields.length === 0) {
      alert('Please select at least one field.');
      return;
    }

    try {
      const response = await axios.post('/display', { selectedFields });

      if (response.data) {
        setDisplayedData(response.data);
      } else {
        alert('Failed to display data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Data Display App</h1>

      <div>
        <label>
          Choose a file:
          <input type="file" onChange={handleFileChange} accept=".json, .csv" />
        </label>

        <label>
          Select file format:
          <select value={format} onChange={handleFormatChange}>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </label>

        <button onClick={handleUpload}>Upload and Display</button>
      </div>

      {fields.length > 0 && (
        <div>
          <h2>Select Fields:</h2>
          <form>
            {fields.map((field) => (
              <label key={field}>
                <input
                  type="checkbox"
                  value={field}
                  checked={selectedFields.includes(field)}
                  onChange={handleFieldsChange}
                />
                {field}
              </label>
            ))}
          </form>

          <button onClick={handleDisplayData}>Display Data</button>
        </div>
      )}

      {displayedData && (
        <div>
          <h2>Displaying Data:</h2>
          <pre>{displayedData}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
