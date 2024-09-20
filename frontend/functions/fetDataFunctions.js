
import axios from "axios"
export const selectedSection = async () => {
    try {
        
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`)
    //    console.log(data)
    //    console.log(1234)
        return (data[0])
      } catch (error) {
        return []
        console.log(error.message)
      }
  };

  export const recomendedSection = async () => {
    try {
        
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended`)
  
        return (data)
      } catch (error) {
        return []
        console.log(error.message)
      }
  };
  export const suggestedSection = async () => {
    try {
        
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`)
  
        return (data)
      } catch (error) {
        return []
        console.log(error.message)
      }
  };

  export const getBookById = async (bookId) => {
    try {
      
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`)
  
        return (data)
      } catch (error) {
        return []
        console.log(error.message)
      }
  };
