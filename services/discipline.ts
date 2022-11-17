//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useDiscipline = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [disciplineOptions, setDisciplineOptions] = useState();
  const [otSkillsOption, setOtSkillsOption] = useState();

  // 
  const getDiscipline = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("v1/disciplines");
      let disciplineFieldOptions = genrateDisciplineformFieldOptions(data?.data)
      setDisciplineOptions(disciplineFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const getSkills = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("v1/skills");
      let skillsFieldOPtion = genrateSkillsformFieldOptions(data?.data)
      setOtSkillsOption(skillsFieldOPtion);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const updateProfile = async (obj) => {
    setIsLoading(true);
    try {
      const { data } = await api.put("v1/profile", {
        user: {
          discipline_id: obj.discipline
        },
      });
      // let disciplineFieldOptions = genrateDisciplineformFieldOptions(data?.data)
      // setDisciplineOptions(disciplineFieldOptions);
      localStorage.setItem("user", JSON.stringify(data?.data))
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  }

  const userSkills = async () => {

  }

  return {
    getDiscipline,
    getSkills,
    updateProfile,
    disciplineOptions,
    otSkillsOption,
    isLoading,
  };
};


// helpers

const genrateDisciplineformFieldOptions = (apiResponse: any) => {
  // const { response } = apiResponse;
  return apiResponse.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};

const genrateSkillsformFieldOptions = (apiResponse: any) => {
  const { response } = apiResponse;

  return apiResponse.map(({ title, id }: { title: string; id: string }) => ({
    key: id,
    title,
  }));
};