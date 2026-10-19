import { useNavigate } from 'react-router-dom';
import {
  LogIn,
  Mail,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {

  const navigate = useNavigate();
  
  const {
    mode, setMode,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    loading, error, success,
    handleSubmit,
  } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 py-16">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </button>

        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-br from-green-700 to-green-800 p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/15 rounded-2xl mb-4">
              {mode === 'signin' ? (
                <LogIn className="w-7 h-7 text-white" />
              ) : (
                <UserPlus className="w-7 h-7 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {mode === 'signin' ? 'Connexion' : 'Créer un compte'}
            </h1>
            <p className="text-white/80 text-sm">
              Mon Espace Candidat
            </p>
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
                <label htmlFor="auth-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="auth-email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@mesrs.gouv.ci"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="auth-password"
                    name="password"
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : mode === 'signin' ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    Se connecter
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Créer mon compte
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {mode === 'signin' ? (
                <>
                  Vous n'avez pas encore d'espace Candidat ?{' '}
                  <button
                    onClick={() => navigate('/preinscription')}
                    className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                  >
                    S'inscrire
                  </button>
                </>
              ) : (
                <>
                  Déjà inscrit ?{' '}
                  <button
                    onClick={() => { setMode('signin'); }}
                    className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
