import { useState } from "react";
import { FileSpreadsheet, AlertCircle, Info, CheckCircle2, Upload, FileText } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useSeanceStore } from "../../../../stores/seanceStore";
import 'react-toastify/dist/ReactToastify.css';
import readExcelFile from "../../../../utils/ExcelParser";
import SeanceService from "../../../../services/SeanceService";
import ExtractedSeance from "../../../../types/extractedSeance";

export default function FileUploader() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<ExtractedSeance[] | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const confirmUpload = async (): Promise<void> => {

    try {

      const seances = useSeanceStore.getState().seances;
      await SeanceService.updateSchedule(seances);
      const successMessage = `Schedule updated successfully`;
      setSuccess(successMessage);
      toast.success(successMessage);

    } catch (err: unknown) {
      console.log(err);
      const errorMessage = `Error updating schedule: ${err instanceof Error ? err.message : "Unknown error"}`;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!file.name.endsWith('.xlsx')) {
      setError('Only Excel (.xlsx) files are allowed');
      toast.error('Only Excel (.xlsx) files are allowed');
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      toast.error('File size exceeds 10MB limit');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFile = async (file: File | undefined): Promise<void> => {
    
    try {

    if (!file) throw new Error("File is required");
    
      if (validateFile(file)) {
        setFile(file);
        setIsUploading(true);
        
          await readExcelFile(file, setFileContent);

          console.log(fileContent);
          
          
          if (fileContent) {

            const verifiedSeances = await SeanceService.verifySeance(fileContent as ExtractedSeance[]);

            
            if (verifiedSeances) {

              console.log(verifiedSeances);
              
              const successMessage = `File "${file.name}" imported successfully`;
              toast.success(successMessage);
              
              // Update the store with verified seances
              useSeanceStore.getState().setSeances(verifiedSeances);
            } else {
              throw new Error("Data verification failed");
            }
          }
          else {
            throw new Error("File is not valid");
          }
        }
      } catch (err: unknown) {
        console.log(err);
        const errorMessage = `Error processing file: ${err instanceof Error ? err.message : "Unknown error"}`;
        setError(errorMessage);
        toast.error(errorMessage);
        setFile(null);
      } finally {
        setIsUploading(false);
      }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    resetFileUpload();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
    else {
      toast.error("No file dropped");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    resetFileUpload();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
    else {
      toast.error("No file dropped");
    }
  };

  const resetFileUpload = (): void => {
    setFile(null);
    setError(null);
    setSuccess(null);
    setFileContent(null);
  };

  return (
    <div className="bg-black-900/70 rounded-xl shadow-md ">
      {/* React Toastify Container */}
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

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-6 border-r border-gray-700">
          <h3 className="text-xl font-semibold text-white flex items-center mb-6">
            <FileSpreadsheet className="w-5 h-5 mr-2 text-indigo-600" />
            Télécharger le fichier Excel de l'emploi du temps
          </h3>
          
          <div 
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
              ${isDragging ? 'border-indigo-500 bg-indigo-900/10' : 'border-gray-700'}
              ${file && !error ? 'bg-green-900/10 border-green-500' : ''}
              ${error ? 'border-red-500 bg-red-900/10' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file && !error ? (
              <div className="flex flex-col items-center py-12">
                <FileText className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-white font-medium mb-1">{file.name}</p>
                <p className="text-gray-400 text-sm mb-6">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-indigo-600">Traitement du fichier...</p>
                  </div>
                ) : success ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="w-6 h-6 m-2" />
                    <p>{success}</p>
                  </div>
                ) : (
                  <div className="space-x-4">
                    <button 
                      onClick={() => confirmUpload()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-lg transition-colors duration-200 font-medium flex items-center"
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Confirmer la mise à jour
                    </button>
                    <button
                      onClick={resetFileUpload}
                      className="text-gray-600 hover:text-gray-700 py-2.5 px-5 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="">
                <FileSpreadsheet className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2 text-lg">
                  Glissez et déposez votre fichier Excel ici
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  ou cliquez pour parcourir vos fichiers
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-lg cursor-pointer transition-colors duration-200 font-medium inline-block"
                >
                  Parcourir les fichiers
                </label>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-4 text-red-600 flex items-center text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>


        <div className="p-6 ">

          <h4 className="font-medium text-white mb-4 flex items-center">
            <Info className="w-4 h-4 mr-2 text-indigo-600" />
            Exigences du fichier
          </h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Format du fichier</h5>
              <ul className="space-y-2">
                {[
                  'Fichier Excel (.xlsx)',
                  'Taille maximale : 10 Mo',
                  'Encodage UTF-8'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium text-white mb-2">Colonnes requises</h5>
              <ul className="space-y-2">
                {[
                  'Matière, Enseignant, Salle, Durée, Section, Nature, Type',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center justify-center py-2 px-4 rounded-lg border border-indigo-800 hover:bg-indigo-900/20 transition-colors duration-200">
              <FileText className="w-4 h-4 mr-2" />
              Télécharger le modèle
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}