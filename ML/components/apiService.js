import axios from 'axios'

const api = axios.create({
    baseURL : 'http://192.168.1.106:3000/'
})

export const getUni = async () => {
    try {
        const uniData = await api.get('/uni')
        return uniData.data
    }
    catch (error){
        console.log(error)
    }
}

export const getDep = async () => {
    try {
        const depData = await api.get('/uni/dep')
        return depData.data
    }
    catch (error) {
        console.log(error)
    }
}
export const sendSelectedValue = async (value) => {
    try {
      const response = await api.get('/uni/dep', { params: { selectedValue: value }});
      return response.data;
    } catch (error) {
      console.log('Error sending data to backend:', error);
      throw error;
    }
  };
  export const getMerit = async (value , year) => {
    try {
        const merit = await api.get('/uni/dep/merit' , {params: {selectedValue: value, selectedYear: year}})
        return merit.data
    }
    catch (error) {
        console.log("Error" , error)
        throw error
    }
  }