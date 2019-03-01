import axios from 'axios';

const getSession = async (sessionId) => {
  try {
    const res = await axios.get(`/session/${sessionId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export { getSession };
