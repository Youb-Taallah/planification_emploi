package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Seance;
import ISIMM.planification.Enteties.TDConcernes;
import ISIMM.planification.Repository.TDConcernesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TDConcernesService {

    @Autowired
    private TDConcernesRepository tdConcernesRepository;

    public List<TDConcernes> getAllTDConcernes() {
        return tdConcernesRepository.findAll();
    }

    public Optional<TDConcernes> getTDConcernesById(Long id) {
        return tdConcernesRepository.findById(id);
    }

    public TDConcernes saveTDConcernes(TDConcernes tdConcernes) {
        return tdConcernesRepository.save(tdConcernes);
    }

    public List<TDConcernes> saveMultipleTDConcernes(List<TDConcernes> tdConcernesList) {
        return tdConcernesRepository.saveAll(tdConcernesList);
    }

    public void deleteTDConcernes(Long id) {
        tdConcernesRepository.deleteById(id);
    }

    public List<TDConcernes> findBySeance(Seance seance) {
        return tdConcernesRepository.findBySeance(seance);
    }



}
