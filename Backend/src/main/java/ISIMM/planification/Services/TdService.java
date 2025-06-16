package ISIMM.planification.Services;

import ISIMM.planification.Enteties.TD;
import ISIMM.planification.Repository.TDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TdService {

    @Autowired
    private TDRepository tdRepository;


    public List<TD> getAllTDs() {
        return tdRepository.findAll();
    }

    public Optional<TD> getTDById(String id) {
        return tdRepository.findById(id);
    }

    public TD saveTD(TD td) {
        return tdRepository.save(td);
    }

    public void deleteTD(String id) {
        tdRepository.deleteById(id);
    }

    public boolean tdExists(String id) {
        return tdRepository.existsById(id);
    }
}
