package ISIMM.planification.Controllers;

import ISIMM.planification.Enteties.TD;
import ISIMM.planification.Services.TdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tds")
public class TdController {

    @Autowired
    private TdService tdService;

    @GetMapping
    public List<TD> getTds() {
        return tdService.getAllTDs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTd(@PathVariable String id) {
        Optional<TD> td = tdService.getTDById(id);
        if (td.isPresent()) {
            return new ResponseEntity<>(td.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}
