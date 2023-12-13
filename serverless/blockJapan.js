export default async (req, res) => {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
      const response = await fetch(`https://ipinfo.io/${ip}/json`);
      const data = await response.json();
      const { country } = data;
  
      if (country === 'VN') {
        return res.status(403).json({ error: 'Access denied. Not available in your region.' });
      }
  
      return res.status(200).json({ message: 'Allowed' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };