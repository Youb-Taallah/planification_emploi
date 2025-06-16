import React, { useState } from 'react';
import { Send, ArrowLeft, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card2';
import Button from '../../components/ui/Button2';

interface ReclamationFormData {
  subject: string;
  course: string;
  type: string;
  description: string;
  attachments: FileList | null;
}

const ReclamationPage: React.FC = () => {
  const [formData, setFormData] = useState<ReclamationFormData>({
    subject: '',
    course: '',
    type: '',
    description: '',
    attachments: null,
  });

  const reclamationTypes = [
    'Appel de Note',
    'Contenu du Cours',
    'Problème Technique',
    'Administratif',
    'Autre'
  ];

  const courses = [
    'Mathématiques 101',
    'Physique 202',
    'Informatique 303',
    'Chimie 104',
    'Biologie 205'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-900 to-primary-900/30 py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button 
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-6"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Retour au Tableau de Bord</span>
          </button>
          
          <h1 className="text-3xl font-bold text-primary-100 mb-3">Soumettre une Réclamation</h1>
          <p className="text-primary-200/80">
            Veuillez fournir des informations détaillées sur votre préoccupation pour nous aider à la traiter efficacement.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Field */}
              <div>
                <label className="block text-primary-100 text-sm font-medium mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-black-800/40 border border-primary-500/10 
                           text-primary-100 placeholder-primary-400/50 focus:outline-none 
                           focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30
                           transition-colors"
                  placeholder="Bref sujet de votre réclamation"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-primary-100 text-sm font-medium mb-2">
                  Cours Concerné
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-black-800/40 border border-primary-500/10 
                           text-primary-100 focus:outline-none focus:ring-2 
                           focus:ring-primary-500/20 focus:border-primary-500/30
                           transition-colors"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  <option value="" className="bg-black-800">Sélectionner un cours</option>
                  {courses.map((course) => (
                    <option key={course} value={course} className="bg-black-800">
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reclamation Type */}
            <div>
              <label className="block text-primary-100 text-sm font-medium mb-3">
                Type de Réclamation
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {reclamationTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                              ${formData.type === type 
                                ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' 
                                : 'bg-black-800/40 text-primary-200/80 hover:bg-primary-500/10 border-transparent'
                              } border`}
                    onClick={() => setFormData({...formData, type})}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-primary-100 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-black-800/40 border border-primary-500/10 
                         text-primary-100 placeholder-primary-400/50 focus:outline-none 
                         focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30
                         transition-colors min-h-[150px]"
                placeholder="Fournissez des informations détaillées concernant votre réclamation..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-primary-100 text-sm font-medium mb-2">
                Pièces Jointes (Facultatif)
              </label>
              <div className="border-2 border-dashed border-primary-500/10 rounded-lg p-4 text-center">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => setFormData({...formData, attachments: e.target.files})}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <span>Déposez les fichiers ici ou cliquez pour télécharger</span>
                    <span className="text-xs text-primary-200/60 mt-1">
                      (PDF, DOC, DOCX, JPG, PNG - Max 10Mo chacun)
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Send className="w-4 h-4" />}
                className="min-w-[200px]"
              >
                Soumettre la Réclamation
              </Button>
            </div>
          </form>
        </Card>

        {/* Help Text */}
        <div className="text-center text-primary-200/60 text-sm">
          Besoin d'aide ? Contactez le support académique à <a href="mailto:support@university.edu" className="text-primary-400 hover:text-primary-300">support@university.edu</a>
        </div>
      </div>
    </div>
  );
};

export default ReclamationPage;