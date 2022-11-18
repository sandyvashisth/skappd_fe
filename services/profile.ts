//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>();
  const [profile, setProfile] = useState<any>();

  // upload resume service
  const uploadResume = async (resumeData: any) => {
    setIsLoading(true);
    try {
      const { resume, summary } = resumeData;
      // will do below changes for file upload once body structure finalized
      // var payload = new FormData();
      // payload.append("resume", resume[0]);
      // payload.append("summary", summary);
      await api.put("v1/profile", {
        user: { summary },
      });
      setStatus("success");
      setIsLoading(false);
    } catch (e) {
      setStatus("error");
      setIsLoading(false);
      return Promise.reject(e);
    }
  };
  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await api.get("v1/profile");
      setProfile(data);
      setIsLoading(false);
      console.log(data);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };
  return {
    status,
    isLoading,
    profile,
    uploadResume,
    getProfile,
  };
};
