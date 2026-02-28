'use client'
import { Button, Modal } from '@mui/material';
import styles from './styles.module.css'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhotoUploadPreview from '@/components/PhotoUploadPreview';
import { zodResolver } from '@hookform/resolvers/zod';
import { profilePhoto, ProfilePhotoInput } from '@/types/photoSchema.zod';


import Image from 'next/image';


export default function UploadPhotoProfile() {

  const {user} = {
    user:{
      id:"s09sdnf8u0s",
      profilePhoto:{
        url: '/perfilDefault.svg',// URL após upload
        path: "PATH",             // caminho no storage
        alt: "PAHT",   
      }
    }
  }

      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const {
        control,
        handleSubmit
        
      } = useForm({
        resolver: zodResolver(profilePhoto),
      })

      async function onSubmit(data: ProfilePhotoInput){
        console.log(data)
      } 

  return (
    <>
        <Image
          alt="Foto de Perfil"
          src={user.profilePhoto.url}
          width={120}
          height={120}
          className={styles.img}
          onClick={handleOpen}
          priority
        />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalContent}>
        <form className={styles.divItens} onSubmit={handleSubmit(onSubmit)}>
            <Controller
               name="img.file" // campo auxiliar que não está no schema
                 control={control}
                 render={({ field }) => (
                   <PhotoUploadPreview
                     value={field.value as File | null}
                     onChange={(f) => field.onChange(f)}
                     
                   />
                 )}
               />
              <Button type='submit'>Salvar foto</Button>
        </form>
        <Button onClick={handleClose}>Voltar</Button>
      </div>
    </Modal>
    </>
  );
}
