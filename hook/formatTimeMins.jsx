const formatTimeMins = () => {
    const formatTimeMinData = (time) => {
      // Calculate minutes and seconds
      const mins = Math.floor(time / 60);
      const secs = Math.floor(time % 60);
  
      // Return time in the format "3 mins 23 secs"
      return `${mins} min${mins !== 1 ? 's' : ''} ${secs} sec${secs !== 1 ? 's' : ''}`;
    };
  
    return { formatTimeMinData };
  };
  
  export default formatTimeMins;