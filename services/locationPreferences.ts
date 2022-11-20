//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useLocationPreferences = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [relocationOptions, setRelocationOptions] = useState();
  const [relocationPreferenceId, setRelocationPreferenceId] = useState();

  const getRelocation = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("v1/preferences?preference_name=relocation_preference");
      let relocationFieldOptions = generateRelocationFormFieldOptions(data?.data)
      setRelocationOptions(relocationFieldOptions);
      setRelocationPreferenceId(data?.preference_id);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const setPreference = async (type: any, preference_value_ids: any) => {
    setIsLoading(true);
    try {
      let preference_id;
      if(type == 'relocation_preference'){
        preference_id = relocationPreferenceId
      }

      const { data } = await api.post("v1/profile/user_preferences/", {
        preferences: {
          preference_id: preference_id,
          preference_value_ids: preference_value_ids
        },
      })

      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  return {
    getRelocation,
    relocationOptions,
    relocationPreferenceId,
    setPreference,
    isLoading,
  };
};


// helpers

const generateRelocationFormFieldOptions = (apiResponse: any) => {
  return apiResponse.map(({ label, value }: { label: string; value: string }) => ({
    label: label === 't' ? 'True' : 'False',
    value: value,
  }));
};
