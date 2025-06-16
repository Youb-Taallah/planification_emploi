import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircle, XCircle, Clock, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

interface StatusModalProps {
  isOpen: boolean;
  closeModal: () => void;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
  seanceInfo: {
    matiere: string;
    date: Date;
    temps: string;
  };
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  closeModal,
  currentStatus,
  onStatusChange,
  seanceInfo,
}) => {
  
  const statuses = [
    { id: 'present', label: 'Présent', icon: CheckCircle, color: 'text-green-500' },
    { id: 'absent', label: 'Absent', icon: XCircle, color: 'text-red-500' },
    { id: 'pending', label: 'En attente', icon: Clock, color: 'text-yellow-500' },
  ];

  const handleStatusChange = (newStatus: string) => {
    // Prevent changing from present/absent to pending
    if (newStatus === 'pending' && (currentStatus === 'present' || currentStatus === 'absent')) {
      toast.error("Impossible de mettre l'état en attente.");
      return;
    }
    
    // If status change is allowed, proceed
    onStatusChange(newStatus);
    closeModal();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
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
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
              <div className="flex justify-between items-start">
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                  Modifier le statut
                </Dialog.Title>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4">
                <div className="mb-4 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm font-medium text-primary-900">{seanceInfo.matiere}</p>
                  <p className="text-sm text-primary-600">
                    {new Date(seanceInfo.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-primary-600">{seanceInfo.temps}</p>
                </div>

                <div className="space-y-2">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusChange(status.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all ${
                        currentStatus === status.id
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : 'bg-white border-2 border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <status.icon className={`${status.color} w-5 h-5 mr-3`} />
                      <span className="font-medium">{status.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StatusModal;