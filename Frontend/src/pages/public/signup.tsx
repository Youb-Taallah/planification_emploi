import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle, AlertCircle, ArrowRight, GraduationCap, BookOpen } from 'lucide-react';
import { cn } from '../../components/utils';
import { registerStudent, registerProfessor } from '../../Auth/AuthService';
import { ToastContainer, toast } from "react-toastify";

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'professor' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Password validation
  const passwordStrength = password.length >= 8 ? 'strong' : 'weak';
  const passwordsMatch = password === confirmPassword;

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const nextStep = () => {
    if (currentStep === 1 && name && email && role) {
      // Validate email format before proceeding
      if (!isValidEmail(email)) {
        toast.error('Veuillez entrer une adresse e-mail valide');
        return;
      }
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      if (role === 'student') {
        await registerStudent(name, email, password);
      } else if (role === 'professor') {
        await registerProfessor(name, email, password);
      }
      toast.success('Compte créé avec succès !');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      setError('L\'inscription a échoué. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-900/90 via-black-900 to-primary-800/70">
      <div className="w-full min-h-[650px] max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden">
        {/* Left side - Illustration area (visible on md+ screens) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-primary-900 to-primary-800 p-8 flex-col items-center justify-center text-white">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 w-20 h-20 mx-auto rounded-full bg-primary-700/50 flex items-center justify-center">
              <User size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Rejoignez notre application</h2>
            <p className="text-white/70 mb-8">Créez un compte pour accéder à ton emploi du temps personnalisé.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-primary-300 mr-2" />
                <span className="text-white/90">Suivi de ton emploi du temps</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={20} className="text-primary-300 mr-2" />
                <span className="text-white/90">Notifications pour tes mises à jour</span>
              </div>
            </div>
            
            <div className="text-white/50 text-sm italic">
              "Le voyage de mille lieues commence par une simple inscription."
            </div>
          </div>
        </div>

        {/* Right side - Form area */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg p-8 flex flex-col justify-between">
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
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
              Créer un Compte
            </h1>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep === 1 ? 'bg-primary-500 text-white' : 'bg-white/20 text-white/60'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 transition-all duration-300 ${
                currentStep === 2 ? 'bg-primary-500' : 'bg-white/20'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep === 2 ? 'bg-primary-500 text-white' : 'bg-white/20 text-white/60'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-white text-sm">
              {error}
            </div>
          )}

          <div className='flex-1' ></div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <>
                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Je suis un(e)...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-200",
                        "flex items-center justify-center gap-2",
                        "hover:bg-white/10",
                        role === 'student'
                          ? "bg-white/15 border-primary-500 text-white"
                          : "border-white/10 text-white/70"
                      )}
                    >
                      <GraduationCap size={24} />
                      <span>Étudiant</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('professor')}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-200",
                        "flex items-center justify-center gap-2",
                        "hover:bg-white/10",
                        role === 'professor'
                          ? "bg-white/15 border-primary-500 text-white"
                          : "border-white/10 text-white/70"
                      )}
                    >
                      <BookOpen size={24} />
                      <span>Professeur</span>
                    </button>
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Nom Complet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={20} className="text-white/40" />
                    </div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={cn(
                        "block w-full pl-10 pr-4 py-3 border bg-white/5 border-white/10 rounded-xl",
                        "text-white placeholder-white/30",
                        "focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50",
                        "transition duration-200 ease-in-out transform",
                        "hover:bg-white/10 focus:translate-y-[-2px]"
                      )}
                      placeholder="Saisissez votre nom complet"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={20} className="text-white/40" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "block w-full pl-10 pr-4 py-3 border bg-white/5 border-white/10 rounded-xl",
                        "text-white placeholder-white/30",
                        "focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50",
                        "transition duration-200 ease-in-out transform",
                        "hover:bg-white/10 focus:translate-y-[-2px]"
                      )}
                      placeholder="Saisissez votre email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                {/* Next Step Button */}
                <button
                  type="button"
                  onClick={nextStep}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
                    "bg-gradient-to-r from-primary-600 to-primary-500",
                    "text-white font-medium",
                    "transform transition-all duration-200",
                    "hover:from-primary-500 hover:to-primary-400 hover:shadow-lg hover:shadow-primary-500/30 hover:translate-y-[-2px]",
                    "focus:ring-2 focus:ring-primary-500/30 focus:outline-none",
                    "active:scale-[0.98]",
                    (!name || !email || !role) && "opacity-70 cursor-not-allowed"
                  )}
                  disabled={!name || !email || !role || isLoading}
                >
                  <span>Continuer</span>
                  <ArrowRight size={20} className="animate-pulse-subtle" />
                </button>
              </>
            ) : (
              <>
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
                        "transition duration-200 ease-in-out transform",
                        "hover:bg-white/10 focus:translate-y-[-2px]",
                        password && passwordStrength === 'weak' ? "border-orange-500/50" : 
                        password && passwordStrength === 'strong' ? "border-green-500/50" : ""
                      )}
                      placeholder="Créez un mot de passe"
                      required
                      disabled={isLoading}
                    />
                    {password && (
                      <div className="mt-1 flex items-center">
                        <div className={`h-1 flex-1 rounded-full ${passwordStrength === 'weak' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        <span className={`ml-2 text-xs ${passwordStrength === 'weak' ? 'text-orange-300' : 'text-green-300'}`}>
                          {passwordStrength === 'weak' ? 'Faible' : 'Fort'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1">Le mot de passe doit contenir au moins 8 caractères</p>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={20} className="text-white/40" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn(
                        "block w-full pl-10 pr-4 py-3 border bg-white/5 border-white/10 rounded-xl",
                        "text-white placeholder-white/30",
                        "focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50",
                        "transition duration-200 ease-in-out transform",
                        "hover:bg-white/10 focus:translate-y-[-2px]",
                        confirmPassword && !passwordsMatch ? "border-red-500/50" : 
                        confirmPassword && passwordsMatch ? "border-green-500/50" : ""
                      )}
                      placeholder="Confirmez votre mot de passe"
                      required
                      disabled={isLoading}
                    />
                    {confirmPassword && (
                      <div className="mt-1 flex items-center">
                        {passwordsMatch ? (
                          <div className="flex items-center text-green-300 text-xs">
                            <CheckCircle size={12} className="mr-1" />
                            <span>Les mots de passe correspondent</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-300 text-xs">
                            <AlertCircle size={12} className="mr-1" />
                            <span>Les mots de passe ne correspondent pas</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 py-3 px-4 rounded-xl bg-white/10 text-white font-medium
                      transition-all duration-200 hover:bg-white/20"
                    disabled={isLoading}
                  >
                    Retour
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={cn(
                      "w-2/3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
                      "bg-gradient-to-r from-primary-600 to-primary-500",
                      "text-white font-medium",
                      "transform transition-all duration-200",
                      "hover:from-primary-500 hover:to-primary-400 hover:shadow-lg hover:shadow-primary-500/30 hover:translate-y-[-2px]",
                      "focus:ring-2 focus:ring-primary-500/30 focus:outline-none",
                      "active:scale-[0.98]",
                      (!passwordsMatch || password.length < 8 || isLoading) && "opacity-70 cursor-not-allowed"
                    )}
                    disabled={!passwordsMatch || password.length < 8 || isLoading}
                  >
                    {isLoading ? (
                      <span>Création du compte...</span>
                    ) : (
                      <>
                        <span>Créer le Compte</span>
                        <ArrowRight size={20} className="animate-pulse-subtle" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className='flex-1'  > </div>

          {/* Terms of Service */}
          <p className="mt-4 text-center text-white/40 text-xs">
            En créant un compte, vous acceptez nos{' '}
            <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
              Conditions d'Utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
              Politique de Confidentialité
            </a>
          </p>

          {/* Footer */}
          <p className="mt-8 text-center text-white/40">
            Vous avez déjà un compte?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}