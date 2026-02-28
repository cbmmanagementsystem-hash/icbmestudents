'use client';

import * as React from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from 'next/image';

type PhotoUploadPreviewProps = {
  value?: File | string | null;                  // File (novo) ou URL (existente)
  onChange: (file: File | null) => void;         // devolve o File selecionado (ou null ao limpar)
  label?: string;
  maxSizeMB?: number;                             // padrão: 5MB
  width?: number;                                 // tamanho do preview
  height?: number;
};

export default function PhotoUploadPreview({
  value,
  onChange,
  label = 'Selecionar foto',
  maxSizeMB = 5,
  width = 220,
  height = 220,
}: PhotoUploadPreviewProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // cria URL quando value é File; quando é string, usa direto
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setBlobUrl(null);
  }, [value]);

  const previewSrc =
    typeof value === 'string' ? value : blobUrl ? blobUrl : '';

  function pickFile() {
    inputRef.current?.click();
  }

  function handleFile(file: File | null) {
    if (!file) {
      onChange(null);
      setError(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Envie uma imagem (jpg, png, webp…).');
      onChange(null);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Tamanho máximo: ${maxSizeMB}MB.`);
      onChange(null);
      return;
    }
    setError(null);
    onChange(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
    // permite selecionar o mesmo arquivo novamente
    e.currentTarget.value = '';
  }

  // drag & drop
  const [isOver, setIsOver] = React.useState(false);
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  }

  return (
    <Stack spacing={1.25} alignItems="center" marginBottom={3}>
      <Box
        onClick={pickFile}
        onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
        onDragLeave={() => setIsOver(false)}
        onDrop={onDrop}
        sx={{
          width,
          height,
          border: '2px dashed',
          borderColor: isOver ? 'success.main' : 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          bgcolor: '#fff',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {previewSrc ? (
          // use <img> para preview local (blob:); next/image não é necessário aqui
          <Image
            src={previewSrc}
            alt="Pré-visualização da foto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            width={360}
            height={360}
          />
        ) : (
          <Stack alignItems="center" spacing={0.5} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Arraste a foto aqui
            </Typography>
            <Typography variant="caption" color="text.disabled">
              ou clique para enviar
            </Typography>
          </Stack>
        )}

        {previewSrc && (
          <IconButton
            aria-label="remover"
            size="small"
            onClick={(e) => { e.stopPropagation(); handleFile(null); }}
            sx={{
              position: 'absolute',
              top: 6,
              right: 6,
              bgcolor: 'rgba(0,0,0,0.45)',
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="contained" color="success" onClick={pickFile}>
          {previewSrc ? 'Trocar foto' : label}
        </Button>
        <Typography variant="caption" color="text.secondary">
          Formatos: JPG, PNG, WEBP · até {maxSizeMB}MB
        </Typography>
      </Stack>

      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onInputChange}
      />
    </Stack>
  );
}



// how to use this component in form

//  <Controller
//             name="profilePhoto.img.file" // campo auxiliar que não está no schema
//             control={control}
//             render={({ field }) => (
//               <PhotoUploadPreview
//                 value={field.value as File | null}
//                 onChange={(f) => field.onChange(f)}
//               />
//             )}
//           />