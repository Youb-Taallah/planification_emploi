import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { cn } from '../../components/utils';
import { login } from '../../Auth/AuthService';
import { ToastContainer, toast } from "react-toastify";

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch {
      toast.error('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-t from-primary-900/90 to-black-900">
      <div className="w-full max-w-md p-8 mx-4">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
              Bon retour
            </h1>
            <p className="mt-2 text-white/60">
            Connectez-vous pour accéder à votre emploi du temps personnalisé.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-white text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-white/40" />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "block w-full pl-10 pr-4 py-3 border bg-white/5 border-white/10 rounded-xl",
                    "text-white placeholder-white/30",
                    "focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50",
                    "transition duration-200 ease-in-out",
                    "hover:bg-white/10"
                  )}
                  placeholder="Entrez votre adresse e-mail"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-white/40" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "block w-full pl-10 pr-4 py-3 border bg-white/5 border-white/10 rounded-xl",
                    "text-white placeholder-white/30",
                    "focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50",
                    "transition duration-200 ease-in-out",
                    "hover:bg-white/10"
                  )}
                  placeholder="Entrez votre mot de passe"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-center text-sm">
              <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
                "bg-gradient-to-r from-primary-600 to-primary-500",
                "text-white font-medium",
                "transform transition-all duration-200",
                "hover:from-primary-500 hover:to-primary-400 hover:shadow-lg hover:shadow-primary-500/30",
                "focus:ring-2 focus:ring-primary-500/30 focus:outline-none",
                "active:scale-[0.98]",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight size={20} className="animate-pulse-subtle" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-white/40">
          Vous n'avez pas de compte ?{' '}
          <Link to="/signup" className="text-primary-400 hover:text-primary-300 transition-colors">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
