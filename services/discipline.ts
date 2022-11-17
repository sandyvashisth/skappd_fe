//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useDiscipline = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [disciplineOptions, setDisciplineOptions] = useState();
  const [otSkillsOption, setOtSkillsOption] = useState();
  const getDiscipline = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("v1/disciplines");
      setDisciplineOptions(genrateDisciplineformFieldOptions(data));
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };
  const getOtSkills = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("v1/skills");
      setOtSkillsOption(genrateOtSkillsformFieldOptions(data));
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };
  return {
    getDiscipline,
    getOtSkills,
    disciplineOptions,
    otSkillsOption,
    isLoading,
  };
};


// helpers

const genrateDisciplineformFieldOptions = (apiResponse: any) => {
  const { response } = apiResponse;
  return response.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};

const genrateOtSkillsformFieldOptions = (apiResponse: any) => {
  const { response } = apiResponse;
  return response.map(({ title, id }: { title: string; id: string }) => ({
    key: id,
    title,
  }));
};