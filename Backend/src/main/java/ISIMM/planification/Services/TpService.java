package ISIMM.planification.Services;

import ISIMM.planification.Enteties.TP;
import ISIMM.planification.Repository.TPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TpService {

    @Autowired
    private TPRepository tpRepository;


    public List<TP> getAllTPs() {
        return tpRepository.findAll();
    }

    public Optional<TP> getTPById(String id) {
        return tpRepository.findById(id);
    }

    public TP saveTP(TP tp) {
        return tpRepository.save(tp);
    }

    public void deleteTP(String id) {
        tpRepository.deleteById(id);
    }

    public boolean tpExists(String id) {
        return tpRepository.existsById(id);
    }
}
