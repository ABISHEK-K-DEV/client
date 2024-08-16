
// import React, { useEffect, useState } from 'react';

// const SomeComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     fetch(`${backendUrl}/api/your-endpoint`)
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error('Error:', error));
//   }, []);

//   return (
//     <div>
//       {/* Render your data */}
//       {data.map(item => (
//         <div key={item.id}>{item.name}</div>
//       ))}
//     </div>
//   );
// };

// export default SomeComponent;



import React, { useEffect, useState } from 'react';

const SomeComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    fetch(`${backendUrl}/api/your-endpoint`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default SomeComponent;

