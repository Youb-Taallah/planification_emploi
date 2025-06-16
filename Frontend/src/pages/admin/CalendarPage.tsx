import { useLocation, useParams } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import { Clock, MapPin, Users, GraduationCap } from 'lucide-react';
import { useSeanceStore } from '../../stores/seanceStore';
import { useEffect, useState } from 'react';
import { SeanceWithTds } from '../../types/tdo';

export default function CalendarPage() {

    const [todaySeances, settodaySeances] = useState<SeanceWithTds[]>();

    // Get URL parameters
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    
    // Determine if we're filtering by professor or class
    const isProfessorView = location.pathname.includes('/emploi-du-temps/professeur/');
    const isClassView = location.pathname.includes('/emploi-du-temps/classe/');
    
    // Get access to seances
    const seances = useSeanceStore(state => state.seances);
    const getSeancesByProfesseur = useSeanceStore(state => state.getSeancesByProfesseur);
    const getSeancesByTD = useSeanceStore(state => state.getSeancesByTD);

    const [filteredSeances, setFilteredSeances] = useState<SeanceWithTds[]>([]);
    const [displayName, setDisplayName] = useState<string>("");
    
    
    useEffect( () => {
        if (!id) return;
        
        let filtered: SeanceWithTds[] = [];
        let name = "";
        
        if (isProfessorView && id) {
        // Filter by professor ID
        const professorId = parseInt(id, 10);
        filtered = getSeancesByProfesseur(professorId);
        
        // Try to get professor name from a seance if available
        const professorSeance = seances.find(s => s.seance.professeur?.id === professorId);
        name = `Emploi du temps : ${professorSeance?.seance.professeur.nom}` 

        } 
        else if (isClassView && id) {
        // Filter by class/section ID
        filtered =  getSeancesByTD(id);
        
        // Try to get a more user-friendly section name
        name = id.replace('_', ' ').toUpperCase();
        name = `Class Schedule: ${name}`;
        }
        
        setFilteredSeances(filtered);
        setDisplayName(name);
    }, [id, isProfessorView, isClassView, getSeancesByProfesseur, getSeancesByTD, seances]);


    useEffect( () => {

        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();


        const upcoming = filteredSeances.filter(swtd => swtd.seance.jour === today);
        settodaySeances(upcoming);

    }, [filteredSeances, todaySeances])

    return (
        <div className="min-h-screen ">
        {/* Header */}
        <header className="text-center">
            <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Visualisation de <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200">l’Emploi du Temps</span>
                </h1>
            </div>
            </div>
        </header>

        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col xl:flex-row lg:grid-cols-3 gap-6">
            {/* Main Calendar */}
            <div className=" bg-black-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                <Calendar seances={filteredSeances} tittle={displayName} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Today's Overview */}
                <div className="bg-black-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Today's Classes</h2>
                <div className="space-y-4">
                    {todaySeances?.map((class_) => (
                    
                    <div
                        key={class_.seance.id}
                        className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="text-white font-medium">{class_.seance.matiere.nom}</h3>
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300 mt-1">
                            {class_.seance.type}
                            </span>
                        </div>
                        </div>
                        <div className="space-y-2 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{class_.seance.duree}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{class_.seance.salle.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            <span>{class_.seance.professeur.nom}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {class_.seance.section && <span>{class_.seance.section?.nom}</span>}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary-500/20">
                        <Clock className="h-5 w-5 text-primary-300" />
                    </div>
                    <div>
                        <p className="text-sm text-white/60"> Heures d'aujourdhui</p>
                        <p className="pt-2 text-xl font-semibold text-white">{todaySeances ? todaySeances.reduce((sum, swtd) => sum + swtd.seance.duree, 0) : 0} heures</p>
                    </div>
                    </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary-500/20">
                        <Users className="h-5 w-5 text-primary-300" />
                    </div>
                    <div>
                        <p className="text-sm text-white/60">Seances d'aujourdhui</p>
                        <p className="pt-2 text-xl font-semibold text-white">{todaySeances ? todaySeances?.length : 0} {todaySeances?.length == 1 ? "seance" : "seances"}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }