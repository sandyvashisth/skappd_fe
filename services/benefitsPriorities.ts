//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useBenefitsPriorities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [benefitsPreferencesOptions, setBenefitsPreferencesOptions] =
    useState();
  const getPreferences = async (preference_name: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(
        `v1/preferences?preference_name=${preference_name}`
      );
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };
  const getBenefitsPreferencesOptions = async () => {
    setIsLoading(true);
    const response = await getPreferences("priorities_preference");
    setBenefitsPreferencesOptions(genrateformFieldOptions(response));
    setIsLoading(false);
  };
  return {
    getBenefitsPreferencesOptions,
    benefitsPreferencesOptions,
    isLoading,
  };
};

// helpers

const genrateformFieldOptions = (apiResponse: any) => {
  const { response = [] } = apiResponse;
  return response.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};
