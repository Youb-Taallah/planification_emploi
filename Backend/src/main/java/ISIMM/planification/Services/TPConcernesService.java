package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Seance;
import ISIMM.planification.Enteties.TPConcernes;
import ISIMM.planification.Repository.TPConcernesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TPConcernesService {

    @Autowired
    private TPConcernesRepository tpConcernesRepository;

    public List<TPConcernes> getAllTPConcernes() {
        return tpConcernesRepository.findAll();
    }

    public Optional<TPConcernes> getTPConcernesById(Long id) {
        return tpConcernesRepository.findById(id);
    }

    public TPConcernes saveTPConcernes(TPConcernes tpConcernes) {
        return tpConcernesRepository.save(tpConcernes);
    }

    public List<TPConcernes> saveMultipleTPConcernes(List<TPConcernes> tpConcernesList) {
        return tpConcernesRepository.saveAll(tpConcernesList);
    }

    public void deleteTPConcernes(Long id) {
        tpConcernesRepository.deleteById(id);
    }

    public List<TPConcernes> findBySeance(Seance seance) {
        return tpConcernesRepository.findBySeance(seance);
    }



}
