import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadResumeSchema } from "src/schema/onboardingSchema";
import { useController } from "react-hook-form";
import { useMediaQuery, Theme } from "@mui/material";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { DragEvent, FormEvent, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useProfile } from "services/profile";
import { checkFileType } from "@/src/helpers/file.helper";

export const UploadDocuments = ({
  showFooter = true,
}: {
  showFooter: Boolean;
}) => {
  const formInstance = useForm({
    resolver: yupResolver(uploadResumeSchema),
  });
  const { uploadResume } = useProfile();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formInstance;
  const [fileError, setFileError] = useState<string>("");
  const { field: controlledFieldResume } = useController({
    name: "resume",
    control,
  });

  const { field: controlledFieldSummary } = useController({
    name: "summary",
    control,
  });

  const { value: selectedResume, onChange: onResumeFileChange } =
    controlledFieldResume;

  const { value: summaryValue, onChange: onSummaryChange } =
    controlledFieldSummary;

  const [activeStep, setStepComplete] = useAtom(set_step_completed);

  const onSubmit = async (formData: any) => {
    console.log("Form Data ===> ", formData);
    await uploadResume(formData);
    setStepComplete({ id: activeStep?.id, router });
    router.push("/dashboard");
  };

  const onDropFile = (e: DragEvent) => {
    e.preventDefault();
    const resume = e.dataTransfer.files[0];
    const isFileValid = checkFileType(resume.name);
    if (isFileValid) {
      setFileError("");
      onResumeFileChange(resume);
    } else {
      setFileError("Please select a valid file, (pdf, Docx, RTF, txt)");
    }
  };

  const onFileInput = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const files = target.files || [];
    const resume = files[0] || {};
    const isFileValid = checkFileType(resume.name);
    if (isFileValid) {
      setFileError("");
      onResumeFileChange(resume);
    } else {
      setFileError("Please select a valid file, (pdf, Docx, RTF, txt)");
    }
  };

  const handleResumeSummaryChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    onSummaryChange(target.value);
  };

  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            mt: isDesktop ? 16 : 8,
            width: isDesktop ? "400px" : "100%",
            color: "white",
            padding: "16px",
            minWidth: "350px",
          }}
        >
          <label
            htmlFor="Picture"
            id="AAFileUpload"
            onDrop={onDropFile}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <DriveFolderUploadIcon
                sx={{ color: "#bdbdbd", fontSize: "56px" }}
              />
              <Typography sx={{ color: "#bdbdbd", fontSize: "34px" }}>
                Upload File
              </Typography>
            </Box>
            <Typography
              style={{
                color: selectedResume ? "#1EC271" : "grey",
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              {selectedResume
                ? selectedResume.name
                : "Drag and Drop Your resume here"}
            </Typography>
          </label>
          <FormHelperText
            sx={{ paddingTop: 2, textAlign: "center" }}
            error={!!fileError}
          >
            {fileError as string}
          </FormHelperText>
          <Box sx={{ mt: "40px", background: "#fff" }}>
            <TextField
              aria-label="Resume summary textarea"
              placeholder="Please enter a short summary"
              multiline
              minRows="3"
              value={summaryValue}
              sx={{ width: "100%", border: "none", padding: "8px" }}
              onChange={handleResumeSummaryChange}
            />
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{ color: "#fff", width: "100%", mt: "8px" }}
          >
            Select Resume
            <input
              hidden
              accept=".txt,.RTF,.Docx,.doc,.DOC,.pdf,.PDF"
              type="file"
              onInput={onFileInput}
            />
          </Button>
          {errors.resume && (
            <FormHelperText
              error
              sx={{ my: 2, fontSize: "14px", textAlign: "center" }}
            >
              {errors.resume?.message as string}
            </FormHelperText>
          )}
        </Box>
        {showFooter ? <FormFooter /> : ""}
      </form>
    </Grid>
  );
};
