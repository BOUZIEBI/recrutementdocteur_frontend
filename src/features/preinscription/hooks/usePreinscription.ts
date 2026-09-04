import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPhoto, submitPreinscription } from '../api/preinscription.api';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La photo ne doit pas dépasser 5 Mo.');
      return;
    }
    setError(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    try {
      let photoUrl: string | null = null;
      if (photo) {
        photoUrl = await uploadPhoto(photo);
      }

      await submitPreinscription({
        matricule,
        date_naissance: dateNaissance,
        numero_piece: numeroPiece,
        email,
        mot_de_passe: password,
        photo_url: photoUrl,
      });

      setSuccess('Votre demande de préinscription a été envoyée avec succès. Elle sera traitée par l\'administration.');
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      setError(msg);
    } finally {
      setLoading(false);
    }
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
    loading, error, success,
    handlePhotoChange, removePhoto, handleSubmit,
  };
}
