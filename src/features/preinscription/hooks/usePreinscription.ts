import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePreinscription } from './useCreatePreinscription';
import type { PreinscriptionData } from '../types/preinscription.types';

export function usePreinscription() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [matricule, setMatricule] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [numeroPiece, setNumeroPiece] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mutation = useCreatePreinscription();

  const error = validationError ?? (mutation.isError
    ? mutation.error instanceof Error
      ? mutation.error.message
      : 'Une erreur est survenue.'
    : null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setValidationError('Veuillez sélectionner un fichier image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setValidationError('La photo ne doit pas dépasser 5 Mo.');
      return;
    }
    setValidationError(null);
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function resetForm() {
    setMatricule('');
    setDateNaissance('');
    setNumeroPiece('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    removePhoto();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setValidationError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setValidationError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    const payload: PreinscriptionData & { photo?: File | null } = {
      matricule,
      date_naissance: dateNaissance,
      numero_piece: numeroPiece,
      email,
      mot_de_passe: password,
      photo_url: null,
      photo,
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        setSuccess('Votre demande de préinscription a été envoyée avec succès. Elle sera traitée par l\'administration.');
        resetForm();
      },
    });
  }

  return {
    navigate, fileInputRef,
    matricule, setMatricule,
    dateNaissance, setDateNaissance,
    numeroPiece, setNumeroPiece,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    photo, photoPreview,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    loading: mutation.isPending,
    error,
    success,
    handlePhotoChange, removePhoto, handleSubmit,
  };
}
