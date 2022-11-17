//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useLevelOfConforts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [settingPreferenceOptions, setSettingPreferenceOptions] = useState();
  const [settingPreferenceId, setSettingPreferenceId] = useState();

  const [patientPopulationsPreferenceOptions, setPatientPopulationsPreferenceOptions] = useState();
  const [patientPopulationsPreferenceId, setPatientPopulationsPreferenceId] = useState();

  const getPreferences = async (type) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`v1/preferences?preference_name=${type}`);
      setstateForType(type, data)
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const setstateForType = (type, data) => {
    if (type == 'comfort_setting_preference'){
      setSettingPreferenceOptions(data?.data);
      setSettingPreferenceId(data?.preference_id);
    } else if (type == 'patient_populations_preference'){
      setPatientPopulationsPreferenceOptions(data?.data);
      setPatientPopulationsPreferenceId(data?.preference_id);
    }
  }

  const setPreference = async (type: any, preference_value_ids: any) => {
    setIsLoading(true);
    try {
      let preference_id;
      if(type == 'comfort_setting_preference'){
        preference_id = settingPreferenceId
      } else if (type == 'patient_populations_preference'){
        preference_id = patientPopulationsPreferenceId
      }

      const { data } = await api.post("v1/profile/user_preferences/", {
        preferences: {
          preference_id: preference_id,
          preference_value_ids: preference_value_ids
        },
      })

      // let educationFieldOptions = generateEducationFormFieldOptions(data?.data)
      // setSettingPreferenceOptions(educationFieldOptions);
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const getUser = () => {
    let user = localStorage.getItem("user")
    return JSON.parse(user || {})
  }

  return {
    getPreferences,
    setPreference,
    settingPreferenceOptions,
    settingPreferenceId,
    patientPopulationsPreferenceOptions,
    patientPopulationsPreferenceId,
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
