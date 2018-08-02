import axios from 'axios'
export const getCompanyList = (selectedCompanies) => {
  return  axios.post('/api/companies', {selectedCompanies});
}


export const updateCompanyCourses = ({ company }) => {
  return axios.post(`/api/companies/${company._id}/courses`, { courses : company.courses });
}

export const getCoursesFromCompany = ({ company }) => {
  return axios.get(`/api/companies/${company._id}`);
}