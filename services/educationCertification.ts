//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useEducationCertification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [educationOptions, setEducationOptions] = useState();
  const [otCertificationOptions, setOtCertificationOptions] = useState();
  const [bonusOptions, setBonusOptions] = useState();

  const getEducation = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("v1/educations");
      let educationFieldOptions = generateEducationFormFieldOptions(data?.data)
      setEducationOptions(educationFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const getOtCertification = async () => {
    setIsLoading(true);
    try {
      const user = getUser();
      const { data } = await api.get(`v1/disciplines/${user.discipline_id}/certifications`);
      let otCertificationFieldOptions = generateOtCertificationFormFieldOptions(data?.data)
      setOtCertificationOptions(otCertificationFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const getBonus = async () => {
    setIsLoading(true);
    try {
      const user = getUser();
      const { data } = await api.get(`v1/disciplines/${user.discipline_id}/special_certifications`);
      let bonusFieldOptions = generateBonusFormFieldOptions(data?.data)
      setBonusOptions(bonusFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const setEducation = async (education_ids: any) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("v1/profile/educations",
        {
          educations: {education_ids: education_ids}
        }
      );
      let educationFieldOptions = generateEducationFormFieldOptions(data?.data)
      setEducationOptions(educationFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const setOtCertification = async (certification_ids: any) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("v1/profile/certifications",
        {
          certifications: {certification_ids: certification_ids}
        }
      );
      let educationFieldOptions = generateEducationFormFieldOptions(data?.data)
      setEducationOptions(educationFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const setBonus = async (special_certification_ids: any) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("v1/profile/special_certifications",
        {
          special_certifications: {special_certification_ids: special_certification_ids}
        }
      );
      let educationFieldOptions = generateEducationFormFieldOptions(data?.data)
      setEducationOptions(educationFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const getUser = () => {
    let user = localStorage.getItem("user")
    return JSON.parse(user || '{}')
  }

  return {
    getEducation,
    educationOptions,
    getOtCertification,
    otCertificationOptions,
    getBonus,
    bonusOptions,
    setEducation,
    setOtCertification,
    setBonus,
    isLoading,
  };
};


// helpers

const generateEducationFormFieldOptions = (apiResponse: any) => {
  // const { response } = apiResponse;
  return apiResponse.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};

const generateOtCertificationFormFieldOptions = (apiResponse: any) => {
  // const { response } = apiResponse;
  return apiResponse.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};

const generateBonusFormFieldOptions = (apiResponse: any) => {
  // const { response } = apiResponse;
  return apiResponse.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};
