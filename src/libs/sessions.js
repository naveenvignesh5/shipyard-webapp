import axios from 'axios';

const getSession = async (sessionId) => {
  try {
    const res = await axios.get(`/session/${sessionId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

const endSession = async (sessionId) => {
  try {
    const res = await axios.post(`/session/end`, { sessionId });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export { getSession, endSession };
