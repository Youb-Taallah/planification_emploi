package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Section;
import ISIMM.planification.Repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }


    public Optional<Section> getSectionById(String id) {
        return sectionRepository.findById(id);
    }


    public Section saveSection(Section section) {
        return sectionRepository.save(section);
    }


    public void deleteSection(String id) {
        sectionRepository.deleteById(id);
    }

    public boolean sectionExists(String id) {
        return sectionRepository.existsById(id);
    }
}
