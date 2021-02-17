import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    minWidth: 90,
  },
}));
const CountryOption = (props) => {
  const { value, countryNames, onChange, optionNo, label } = props;
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
    >
    { label && <InputLabel id={`${label}-optionNo-label`}>{label}</InputLabel> }
      <Select
        labelId={`${label}-optionNo-label`}
        id={label}
        label={label}
        value={value}
        onChange={(e) => onChange(e)}
      >
        {countryNames.map((country) => {
          return (
            <MenuItem key={country + optionNo} value={country}>
              {country}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CountryOption;
