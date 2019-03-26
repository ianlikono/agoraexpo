import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const Form = (props) => {
  return (
   <form onSubmit={() => {}}>
     <TextField
       id="name"
       name="name"
       label="Shop Name"
       fullWidth
     />
     <TextField
       id="category"
       name="category"
       label="Category"
       fullWidth
     />
     <TextField
       id="description"
       name="description"
       label="Description"
       fullWidth
     />
     <Button
       type="submit"
       fullWidth
       variant="raised"
       color="primary"
     >
       Create
     </Button>
   </form>
 );
};
