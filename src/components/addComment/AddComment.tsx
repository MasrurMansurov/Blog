import { Button, IconButton, TextField } from "@mui/material"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../store/useStore";
import { useParams } from "react-router-dom";
import { apiComments } from "../../api/path";
import "./style.css"
import { axiosInstance } from "../../api/axios";

// Yup
import {schema} from './Schema'
import { yupResolver } from "@hookform/resolvers/yup";

// Icons
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#fff',
    boxShadow: 30,
    borderRadius: '7px',
    p: 3,
  };

  interface IForm {
    'name': string,
    'email': string,
    'body': string,
  }


const AddComment = () => {
  const {id: postId} = useParams() as { id: string }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const profile = useStore((state) => state.profile)

    const methods = useForm<IForm>({
      resolver: yupResolver(schema)
    })
    
    const {control, handleSubmit, formState: {errors}} = methods
    const {addComment} = useStore()


    const onSubmit: SubmitHandler<IForm> = async (data) => {
        try {
            const newComment = await axiosInstance.post(`${apiComments}`, {
                postId,
                name: data.name,
                email: data.email,
                body: data.body,
            })
            addComment(
                +postId,
                newComment.data.name, 
                newComment.data.email, 
                newComment.data.body
            )
        } catch (error) {
            console.error(error)
        }
        handleClose()
    }
    

  return (
    <Box>
      {
        profile ? (
          <Button onClick={handleOpen} variant="outlined">Add comment</Button>
        ) : (
          <Button variant="outlined" color="success">Log In</Button>
        )
      }
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <Typography id="modal-modal-title" variant="h6">
                  Add Comment
                 </Typography>
                 <IconButton onClick={handleClose}> 
                  <CloseIcon/> 
               </IconButton>
            </Box>
            <Box>

              <FormProvider {...methods}>
                <Controller
                name="name" 
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField 
                       sx={{width: '100%', mt: '10px'}}
                       value={value}
                       onChange={onChange}
                       label="Name" 
                       id="outlined-basic" 
                       variant="outlined" 
                       />
                      )}
                    />
                  <p className="error">{errors.name?.message}</p> 
                       
                    
                  <Controller
                  name="email" 
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField 
                       sx={{width: '100%'}}
                       value={value}
                       onChange={onChange}
                       label="Email" 
                       id="outlined-basic" 
                       variant="outlined" 
                       />
                      )}
                    />
                  <p className="error">{errors.email?.message}</p>

                  <Controller
                  name="body" 
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField 
                       sx={{width: '100%'}}
                       value={value}
                       onChange={onChange}
                       label="Message" 
                       variant="outlined"
                       id="filled-multiline-static" 
                       multiline
                       rows={4}
                       />
                      )}
                    />
                  <p className="error">{errors.body?.message}</p>

                    <Button
                    onClick={handleSubmit(onSubmit)} 
                    className="btn" 
                    type="submit" 
                    variant="outlined" 
                    color="success"
                    >
                       Add
                    </Button>
               </FormProvider>

          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default AddComment
