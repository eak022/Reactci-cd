import axios from "axios";


const getAllCategorie = async () => {
      const response = await axios.get("/Service/categories.json"); 
      return response.data; 
  };



const CategorieService = {
    getAllCategorie,
  };

export default CategorieService;