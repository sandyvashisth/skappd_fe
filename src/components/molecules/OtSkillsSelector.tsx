import {
  Grid,
  Typography,
  FormHelperText,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { ComboButtonWithInput } from "@components/atoms/ComboButtonWithInput";
import { useController } from "react-hook-form";

export const OtSkillsSelector = ({
  field,
  formInstance,
}: {
  field: any;
  formInstance: any;
}) => {
  const {
    control,
    formState: { errors },
  } = formInstance;

  const { options = [] } = field;

  const { field: controlledField } = useController({
    name: field.name,
    control,
    defaultValue: field?.defaultValue || [],
  });

  const { value, onChange } = controlledField;

  const updateSkill = (
    skillId: string,
    actionType: string,
    experience: number = 0
  ) => {
    let selectedSkills = value || [];
    const idx = selectedSkills.findIndex(
      ({ key }: { key: string }) => key === skillId
    );
    switch (actionType) {
      case "addSkill":
        selectedSkills.push({ key: skillId, value: experience }); // add skill
        onChange(selectedSkills);
        break;
      case "removeSkill":
        selectedSkills.splice(idx, 1); // remove from array
        onChange(selectedSkills);
        break;
      case "updateSkill":
        selectedSkills[idx].value = experience; // update experience of pre selected skill
        onChange(selectedSkills);
        break;
      default:
        break;
    }
  };
  const isSmallDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <Grid
      container
      sx={{
        p: isSmallDevice ? 2 : 4,
        bgcolor: isSmallDevice ? "#DAE7E2" : "white",
        pr: isSmallDevice ? 2 : 10,
      }}
    >
      <Grid item xs={12} md={1.5} sx={{ lineHeight: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          OT Skills
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: "5px" }}>
          and Experience
        </Typography>
        <Typography variant="caption">Relevent in the past 10 years</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={10.5}
        sx={{
          p: `0 ${isSmallDevice ? "0" : "50px"}`,
          mt: isSmallDevice ? 2 : 0,
        }}
      >
        {options.map(({ key, title }: { key: string; title: string }) => (
          <ComboButtonWithInput
            skillId={key}
            title={title}
            key={key}
            updateSkill={updateSkill}
          />
        ))}
      </Grid>
      {errors[field?.name] && (
        <FormHelperText sx={{ mt: 2 }} error>
          {errors[field?.name]?.message as string}
        </FormHelperText>
      )}
    </Grid>
  );
};
