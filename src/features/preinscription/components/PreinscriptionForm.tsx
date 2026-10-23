import { Eye, EyeOff } from 'lucide-react';
import {
  UserPlus,
  User,
  Calendar,
  IdCard,
  Mail,
  Lock,
  Camera,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { usePreinscription } from '../hooks/usePreinscription';

export default function PreinscriptionForm() {
  const {
    navigate, fileInputRef,
    matricule, setMatricule,
    dateNaissance, setDateNaissance,
    numeroPiece, setNumeroPiece,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    photoPreview,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    loading, error, success,
    handlePhotoChange, removePhoto, handleSubmit,
  } = usePreinscription();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mt-8 bg-white">
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-8">

        <div className="bg-white rounded-3xl overflow-hidden">
          <div className=" p-8 text-center">
            <h1 className="text-3xl font-bold text-[#0a1317]  mb-1">Inscription</h1>
            <p className="text-[#5d6c7b] text-sm mb-6">Inscrivez-vous au concours de recrutement des enseignants du supérieur session complementaire 2026</p>
            <ol className="lister-etapes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left" aria-label="Étapes de préinscription">
              {[
                'Informations personnelles',
                'Choix du concours',
                'Réception du code de validation',
                'Paiement des frais du concours',
              ].map((step, index) => (
                <li
                  key={step}
                  aria-current={index === 0 ? 'step' : undefined}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                    index === 0
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 bg-white text-gray-500'
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-semibold ${
                    index === 0 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="pt-1 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matricule
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                    placeholder="Ex : AG-2024-0012"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date de naissance
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Numéro de la pièce d'identité
                </label>
                <div className="relative">
                  <IdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={numeroPiece}
                    onChange={(e) => setNumeroPiece(e.target.value)}
                    placeholder="Ex : CI012345678"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@mesrs.gouv.ci"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmer mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo
                </label>
                {photoPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={photoPreview}
                      alt="Aperçu photo"
                      className="w-28 h-28 rounded-2xl object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                      aria-label="Supprimer la photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-gray-500 hover:text-orange-600"
                  >
                    <Camera className="w-8 h-8" />
                    <span className="text-sm font-medium">Cliquez pour ajouter votre photo</span>
                    <span className="text-xs text-gray-400">JPG, PNG — 5 Mo max</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <div className="flex flex-row justify-start gap-3 border-t border-gray-100 pt-5 ">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-200 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                  Étape suivante
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
