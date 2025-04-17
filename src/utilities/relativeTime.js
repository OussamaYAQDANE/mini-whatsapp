function getTimeAgo(timestamp) {
  const now = new Date(new Date().getTime() + 3600*1000)
  // TODO const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date
  const date = new Date(timestamp)

  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
};

for (let key in intervals) {
  const value = Math.floor(seconds / intervals[key]);
  if (value >= 1) {
    return value === 1 ? `1 ${key} ago` : `${value} ${key}s ago`;
  }
}

return 'just now';
}


export default getTimeAgo;
